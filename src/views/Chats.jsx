import { useContext, useState } from "react";
import { Context } from "../store/AppContext";
import useMessages from "../common/hooks/useMessage";
import useConversations from "../common/hooks/useConversations";


export const Chats = () => {
  const { store, actions } = useContext(Context);
  const id = 2;
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const conversations = useConversations(id);
  const messages = useMessages(id, selectedChatId);
  
  const handleSendMessage = async () => {
    if (newMessage && selectedChatId) {
      await actions.sendMessage(id, selectedChatId, newMessage);
      setNewMessage("");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "30%", borderRight: "1px solid #ccc", overflowY: "auto" }}>
        <h4>Conversations</h4>
        <ul>
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              style={{
                padding: "10px",
                cursor: "pointer",
                background: conversation.id === selectedChatId ? "#eee" : "transparent",
              }}
              onClick={() => setSelectedChatId(conversation.id)}
            >
              <strong>{conversation.id}</strong>
              <p>{conversation.lastMessage}</p>
              <small>
                {new Date(conversation.timestamp?.seconds * 1000).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1, padding: "10px", display: "flex", flexDirection: "column" }}>
        {selectedChatId ? (
          <>
            <div style={{ flex: 1, overflowY: "auto" }}>
              <h4>Chat with {selectedChatId}</h4>
              <ul>
                {messages.map((msg) => (
                  <li
                    key={msg.id}
                    style={{
                      textAlign: msg.senderId === id ? "right" : "left",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "10px",
                        borderRadius: "10px",
                        background: msg.senderId === id ? "#d1f7c4" : "#f1f1f1",
                      }}
                    >
                      {msg.content}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{ width: "80%", padding: "10px" }}
                placeholder="Type a message..."
              />
              <button onClick={handleSendMessage} style={{ padding: "10px" }}>
                Send
              </button>
            </div>
          </>
        ) : (
          <h4>Select a conversation to start chatting</h4>
        )}
      </div>
    </div>
  )
}
