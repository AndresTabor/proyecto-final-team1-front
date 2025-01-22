import React, { useEffect, useContext } from 'react';
import { Context } from '../../store/AppContext';
import PostCard from './PostCard';
import { Link, useLocation } from 'react-router-dom';

const PostListByUserId = () => {
    const { store, actions } = useContext(Context);

    let { pathname } = useLocation()
    

    useEffect(() => {
        actions.fetchPosts(); 
    }, []);

    // filtrar las publicaciones del usuario logueado
    const userPosts = store.posts?.filter(post => post.user.id === store.user.id) || [];

    return (
        <div className="container mt-5">
            {
                pathname.includes("public-profile") 
                ? ""
                :
                <Link to="/create-post" className="btn btn-primary mb-3">
                    Crear Nueva Publicación
                </Link>
            }

            {
                pathname.includes("public-profile") 
                ? <h1 className="mb-4">Publicaciones</h1>
                :
                <h1 className="mb-4">Mis Publicaciones</h1>
            }
            
            <div className="row">
                {userPosts.length > 0 ? (
                    userPosts.map((post) => (
                        <div className="col-12" key={post.id}>
                            <PostCard post={post} /> 
                        </div>
                    ))
                ) : (
                    <p>No tienes publicaciones aún.</p>
                )}
            </div>
        </div>
    );
};

export default PostListByUserId;
