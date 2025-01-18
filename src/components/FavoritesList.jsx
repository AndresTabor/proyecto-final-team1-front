import FavoriteCard from "./FavoriteCard"
import PropTypes from 'prop-types';


const FavoritesList = ({favorites}) => {
  return (
    <div className="container my-5">
        <h2 className="text-center mb-4">Mis Favoritos</h2>
        <div className="row gap-3 justify-content-center">
            {favorites.map(favorite => (
                <div className="col-md-4 mb-4" key={favorite.id}>
                    <FavoriteCard favorite={favorite} />
                </div>
            ))}
            <FavoriteCard/>
            
        </div>
    </div>
  )
}

FavoritesList.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    fullname: PropTypes.string,
    email: PropTypes.string,
  })).isRequired,
};

export default FavoritesList