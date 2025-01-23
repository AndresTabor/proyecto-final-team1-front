import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase-config";

const useMessages = (userId, selectedChatId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!selectedChatId) return;

    
    const q1 = query(
      collection(db, "messages"),
      where("senderId", "==", userId),
      where("receiverId", "==", selectedChatId),
      orderBy("timestamp", "asc")
    );

    
    const q2 = query(
      collection(db, "messages"),
      where("senderId", "==", selectedChatId),
      where("receiverId", "==", userId),
      orderBy("timestamp", "asc")
    );

    
    const handleSnapshot2 = (snapshot2, messages1) => {
      const messages2 = snapshot2.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Combinar resultados y ordenar por timestamp
      const allMessages = [...messages1, ...messages2].sort(
        (a, b) => a.timestamp - b.timestamp
      );

      setMessages(allMessages);
    };

    const handleSnapshot1 = (snapshot1) => {
      const messages1 = snapshot1.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const unsubscribe2 = onSnapshot(q2, (snapshot2) => handleSnapshot2(snapshot2, messages1));

      return () => unsubscribe2();
    };

    const unsubscribe1 = onSnapshot(q1, handleSnapshot1);

    return () => unsubscribe1();
  }, [userId, selectedChatId]);

  return messages;
};

export default useMessages;
