import React from 'react';
import PostsList from '../components/posts/PostsList';

const PostsView = () => {
    return (
        <div className="posts-view">
            <h1 className="text-center mt-4">Listado de Publicaciones</h1>
            <PostsList />
        </div>
    );
};

export default PostsView;
