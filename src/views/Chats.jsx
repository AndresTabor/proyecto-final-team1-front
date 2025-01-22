import { useContext, useMemo, useState } from "react";
import { Context } from "../store/AppContext";
import useMessages from "../common/hooks/useMessage";
import useConversations from "../common/hooks/useConversations";

import ConversationsList from "../components/ConversationsList";
import MessagesList from "../components/MessagesList";
import { BsFillSendFill } from "react-icons/bs";

import "./styles/chat.css";
import { useParams } from "react-router-dom";

export const Chats = () => {
  const { store, actions } = useContext(Context);
  const [newMessage, setNewMessage] = useState("");
  const { id } = store.user
  const { chatSelected } = useParams()
 
  
  
  const [selectedChatId, setSelectedChatId] = useState(Number(chatSelected));
  const conversations = useConversations(id);
  const messages = useMessages(id, selectedChatId);
  const [filterConversations, setfilterConversations] = useState("");
  
  
  

  const handleSelectedChat = (chatId) => {
    setSelectedChatId(chatId);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage && selectedChatId) {
      await actions.sendMessage(id, selectedChatId, newMessage);
      setNewMessage("");
    }
  };

  const filteredConversations = useMemo(() => {
    return filterConversations && filterConversations.length > 0 ? 
    conversations.filter((conversation) =>
      conversation?.fullname.toLowerCase().includes(filterConversations)
    ) : conversations
  }, [conversations, filterConversations]);
  
  const handleSearchConversation = (e) => {
    setfilterConversations(e.target.value.toLowerCase());
    
  };

  return (
    <div className="d-flex chat-container">
      <div className="">
        <div className="search">
          <input
            type="text"
            className="search__input"
            placeholder="Buscar chat"
            onChange={handleSearchConversation}
          />
        </div>
        <ConversationsList
          conversations={filteredConversations}
          selectChat={handleSelectedChat}
          selectedChatId={selectedChatId}
        />
      </div>
      <div className="px-3">
        {selectedChatId ? (
          <>
            <MessagesList
              messages={messages}
              userId={id}
              name={"Andres"}
            />
            <form className="send-message" onSubmit={handleSendMessage}>
              <input
                id="inputMessage"
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="search__input"
                placeholder="Escribe un mensaje..."
              />
              <button type="submit" className="btn-send-message">
                <BsFillSendFill />
              </button>
            </form>
          </>
        ) : (
          <h4>Seleccione una conversación para iniciar a chatear</h4>
        )}
      </div>
    </div>
  );
};
