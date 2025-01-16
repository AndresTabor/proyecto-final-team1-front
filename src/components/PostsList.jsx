import React, { useEffect, useContext } from 'react';
import { Context } from '../store/AppContext';
import PostCard from './PostCard';

const PostsList = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchPosts();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Publicaciones</h1>
            <div className="row">
                {store.posts.length > 0 ? (
                    store.posts.map((post) => (
                        <div className="col-md-4" key={post.id}>
                            <PostCard post={post} /> 
                        </div>
                    ))
                ) : (
                    <p>Cargando publicaciones...</p>
                )}
            </div>
        </div>
    );
};

export default PostsList;
