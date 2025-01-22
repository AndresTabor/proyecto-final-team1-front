import PropTypes from "prop-types"
import "./styles/conversationCard.css"
import { Timestamp } from "firebase/firestore"
import { Context } from "../store/AppContext"
import { useContext, useEffect, useState } from "react"

export const ConversationsCard = ({conversation, selectChat}) => {

  const { actions } = useContext(Context)
  const [ userData, setUserData] = useState({})

  useEffect(() => {
    
    actions.getUserById(conversation.userId)
    .then(response => setUserData(response))
    .catch(err => console.log(err))
    
  }, [])
  
  const formatDate = (timestamp) => {
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;
    const date = new Date(milliseconds)
  
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
        <img src={userData.image ? userData.image : "https://cdn-icons-png.flaticon.com/512/6858/6858504.png" }
          alt="profile" 
        />
      </div>
      <div className="conversation-info">
        <div>
          <strong>{userData.fullname}</strong>
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
    lastMessage: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(Timestamp).isRequired
  }).isRequired,
  selectChat: PropTypes.func.isRequired
}
