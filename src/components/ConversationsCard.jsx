import PropTypes from "prop-types"
import "./styles/conversationCard.css"

export const ConversationsCard = ({conversation, selectChat}) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const today = new Date()
    if (date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()) {
      return `${hours}:${minutes}`
    }
    return `${day}/${month}/${year}`
  }

  return (
    <button onClick={() => selectChat(conversation.userId)} className="btn-conversation">
      <div>
        <img src="https://images.imagenmia.com/model_version/bbfea91410ef7994cfefde4a33e032f3aebf7b90dda683f7fa32ea2685d2e7bb/1723819204347-output.jpg" 
          alt="profile" 
        />
      </div>
      <div className="conversation-info">
        <div>
          <strong>{conversation.fullname}</strong>
          <p>{conversation.lastMessage}</p>
        </div>
        <small>
        {formatDate(conversation.timestamp)}
        </small>
      </div>
    </button>
  )
}
ConversationsCard.propTypes = {
  conversation: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    fullname: PropTypes.string.isRequired,
    lastMessage: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired
  }).isRequired,
  selectChat: PropTypes.func.isRequired
}
