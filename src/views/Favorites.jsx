import { useContext } from "react";
import FavoritesList from "../components/FavoritesList"
import { Context } from "../store/AppContext";


export const Favorites = () => {
  const { store } = useContext(Context);
  const { following } = store.user;
  
  
  return (
    <FavoritesList favorites={following} />
  )
}
