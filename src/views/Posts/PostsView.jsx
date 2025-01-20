import React from 'react';
import PostsList from '../../components/PostsList'; // Ajusta la ruta según tu estructura de carpetas

const PostsView = () => {
    return (
        <div className="posts-view">
            <h1 className="text-center mt-4">Listado de Publicaciones</h1>
            <PostsList />
        </div>
    );
};

export default PostsView;
