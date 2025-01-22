

import PropTypes from 'prop-types';
import { ConversationsCard } from './ConversationsCard';
import "./styles/conversationList.css";
import { Timestamp } from 'firebase/firestore';

const ConversationsList = ({conversations, selectChat, selectedChatId}) => {
  return (
    <ul className='overflow-y-auto'>
        {conversations.map((conversation) => (
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
  conversations: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      lastMessage: PropTypes.string.isRequired,
      timestamp: PropTypes.instanceOf(Timestamp).isRequired,
    })
  ).isRequired,
  selectChat: PropTypes.func.isRequired,
  selectedChatId: PropTypes.number
}
export default ConversationsList;
