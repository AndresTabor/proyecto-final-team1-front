import { useContext } from "react";
import { Context } from "../store/AppContext";


export const Chats = () => {
  const { store, actions } = useContext(Context);

  const handleSendMessage = async () => {
    await actions.sendMessage(1,2,"Hola");
  }

  return (
    <div className="Chats container">
      <div className="colum-3">
        <h1>Chats</h1>
      </div>
      <div className="colum-9">
        <h2>Chat 1</h2>
        <p>Chat 1 content</p>
        <button className="btn btn-danger" onClick={handleSendMessage}>Enviar</button>
      </div>

    </div>
  )
}
