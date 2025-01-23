
import PropTypes from 'prop-types'
import "./styles/messagesList.css"

const MessagesList = ({messages, userId, name}) => {
  return (
    <div className='overflow-y-auto'>
        <h4 className='ms-3 mb-4 text-center' >Chat with {name}</h4>
        <ul>
        {messages.map((msg) => (
            <li
            key={msg.id}
            style={{
                textAlign: msg.senderId === userId ? "right" : "left",
            }}
            className='message'
            >
            <span
                style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "10px",
                background: msg.senderId === userId ? "#d1f7c4" : "#f1f1f1",
                }}
            >
                {msg.content}
            </span>
            </li>
        ))}
        </ul>
    </div>
  )
}
MessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
  userId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
}

export default MessagesList