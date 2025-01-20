

import PropTypes from 'prop-types';
import { ConversationsCard } from './ConversationsCard';
import "./styles/conversationList.css";

const ConversationsList = ({mockConversations, selectChat, selectedChatId}) => {
  return (
    <ul className='overflow-y-auto'>
        {mockConversations.map((conversation) => (
        <li
            key={conversation.userId}
            style={{
            padding: "10px",
            background: conversation.userId === selectedChatId ? "#a6cae4" : "transparent",
            }}
            className='conversation'
        >
            <ConversationsCard conversation={conversation} selectChat={selectChat} />
            
        </li>
        ))}
    </ul>
  )
};
ConversationsList.propTypes = {
  mockConversations: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      lastMessage: PropTypes.string.isRequired,
      timestamp: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  selectChat: PropTypes.func.isRequired,
  selectedChatId: PropTypes.number
}
export default ConversationsList;
