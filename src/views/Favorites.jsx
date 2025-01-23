import { useContext, useEffect, useState } from "react";
import FavoritesList from "../components/FavoritesList"
import { Context } from "../store/AppContext";


export const Favorites = () => {
 
  const { actions, store } = useContext(Context);
  const { following } = store.user;

  useEffect(() => {
    actions.getFavorites()

  }, [])
  
  
  
  return (
    <FavoritesList favorites={following} />
  )
}
