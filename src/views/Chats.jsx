import { useContext, useState } from "react";
import { Context } from "../store/AppContext";
import useMessages from "../common/hooks/useMessage";
import useConversations from "../common/hooks/useConversations";

import { mockConversations } from "../common/mocks/conversations";
import { mockMessages } from "../common/mocks/messages";
import ConversationsList from "../components/ConversationsList";
import MessagesList from "../components/MessagesList";
import { BsFillSendFill } from "react-icons/bs";

import "./styles/chat.css";

export const Chats = () => {
  const { store, actions } = useContext(Context);
  const [newMessage, setNewMessage] = useState("");

  const id = 2;
  const [selectedChatId, setSelectedChatId] = useState();
  const [conversationsFiltered, setConversationsFiltered] =
    useState(mockConversations);

  // const conversations = useConversations(id);
  // const messages = useMessages(id, selectedChatId);

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
  
  const handleSearchConversation = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredConversations = mockConversations.filter((conversation) =>
      conversation.fullname.toLowerCase().includes(searchQuery)
    );
    setConversationsFiltered(filteredConversations);
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
          mockConversations={conversationsFiltered}
          selectChat={handleSelectedChat}
          selectedChatId={selectedChatId}
        />
      </div>
      <div className="px-3">
        {selectedChatId ? (
          <>
            <MessagesList
              messages={mockMessages}
              userId={id}
              selectedChatId={selectedChatId}
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
