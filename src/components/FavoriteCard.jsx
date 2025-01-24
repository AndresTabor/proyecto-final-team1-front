import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { useContext } from "react";
import { Context } from "../store/AppContext";
//import './styles/FavoriteCard.css'

const FavoriteCard = ({ favorite }) => {
  const { actions } = useContext(Context);

  const handleClick = (e) => {
    e.preventDefault()
    actions.removeFavorite(favorite?.id)
  }

  return (
    <div className="card favorite-card shadow-sm rounded p-3 mb-4">
      <div className="img mb-3">
        <img   src={favorite?.image || "https://avatar.iran.liara.run/public"} alt="foto" className="card-img-top rounded" />
      </div>
      <div className="info mb-3">
        <h5>{favorite?.fullname}</h5>
        <p>{favorite?.email}</p>
      </div>
      <div className="d-flex flex-column mb-3">
        <Link to={`/public-profile/${favorite.id}`} className="btn btn-primary mb-2">
          Ver perfil
        </Link>
        <Link to={`/chats/${favorite.id}`} className="btn btn-success">
          Contáctame
        </Link>
      </div>
      <button
        className="border-0 bg-transparent text-danger favorite-button"
        onClick={handleClick}
      >
        <i className={`fa-solid fa-heart`} /> Eliminar
      </button>
    </div>


  )
}
FavoriteCard.propTypes = {
  favorite: PropTypes.shape({
    image: PropTypes.string,
    fullname: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number
  }),
};

export default FavoriteCard


