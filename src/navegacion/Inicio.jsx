import React from 'react';
import PostsList from '../components/posts/PostsList'; // Ajusta la ruta según tu estructura de carpetas


export const Inicio = () => {
    return(
        <div className="posts-view">
            <PostsList />
        </div>
    )
}