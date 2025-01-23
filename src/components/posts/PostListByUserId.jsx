import React, { useEffect, useContext } from "react";
import { Context } from "../../store/AppContext";
import PostCard from "./PostCard";
import { Link, useNavigate, useLocation } from "react-router-dom";

const PostListByUserId = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchPosts();
    }, []);

    const userPosts = store.posts?.filter((post) => post.user.id === store.user.id) || [];

    const handleEditPost = (id) => {
        navigate(`/edit-post/${id}`);
    };

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
                        <div className="col-md-12 mb-4" key={post.id}>
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <PostCard post={post} />
                                    <div className="d-flex justify-content-end mt-3">
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => handleEditPost(post.id)}
                                        >
                                            <i className="bi bi-pencil"></i> Editar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <div className="alert alert-info text-center">
                            No tienes publicaciones aún. ¡Crea tu primera publicación ahora!
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostListByUserId;