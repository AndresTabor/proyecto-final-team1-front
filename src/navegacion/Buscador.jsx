import React from 'react';
import PostsList from '../components/PostsList'; // Ajusta la ruta según tu estructura de carpetas


export const Buscador = () => {
    return(
        <>
        <h1>Esto es buscador, se integrara junto a Home, para una vista del listado ya con el buscador y filtros</h1>
        <div className="posts-view">
            <h1 className="text-center mt-4">Listado de Publicaciones</h1>
            <PostsList />
        </div>
        </>
    )
}