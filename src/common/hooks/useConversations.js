import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase-config";

const useConversations = (userId) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("receiverId", "==", userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const conversationMap = {};
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const otherUser =
          data.senderId === userId ? data.receiverId : data.senderId;

        if (!conversationMap[otherUser]) {
          conversationMap[otherUser] = {
            userId: otherUser,
            lastMessage: data.content,
            timestamp: data.timestamp,
          };
        } else if (data.timestamp > conversationMap[otherUser].timestamp) {
          conversationMap[otherUser].lastMessage = data.content;
          conversationMap[otherUser].timestamp = data.timestamp;
        }
      });

      setConversations(Object.values(conversationMap));
    });

    return () => unsubscribe();
  }, [userId]);

  return conversations;
};

export default useConversations;
