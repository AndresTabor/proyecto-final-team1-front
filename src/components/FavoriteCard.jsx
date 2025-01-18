import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { useContext } from "react";
import { Context } from "../store/AppContext";
import './styles/FavoriteCard.css'

const FavoriteCard = ({favorite}) => {
    const { actions } = useContext(Context);

    const handleClick = (e) => {
        e.preventDefault() 
        actions.removeFavorite(favorite.id)        
    }

  return (
    <div className="card-favorite">
        <div className="img">
            <img src={favorite.image} alt="foto" />
        </div>
        <div className="info">
            <span>{favorite.fullname}</span>
            <p>{favorite.email}</p>
        </div>
        <div className="d-flex flex-column">
            <Link href="#">Ver perfil</Link>
            <Link href="#">Contactame</Link>

        </div>
        <button className='border-0 bg-transparent text-danger favorite-button' onClick={handleClick}>
          <i className={`fa-solid fa-heart`}></i>
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
  }).isRequired
};

export default FavoriteCard


