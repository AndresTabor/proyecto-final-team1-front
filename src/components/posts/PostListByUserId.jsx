import React, { useEffect, useContext } from "react";
import { Context } from "../../store/AppContext";
import PostCard from "./PostCard";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";

const PostListByUserId = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { pathname } = useLocation(); 
    const { idProfile } = useParams()
    let userPosts = [];

    useEffect(() => {
        actions.fetchPosts(store.filters);
    }, []);

    if (!pathname.includes("public-profile") ) {
        userPosts = store.posts?.filter((post) => post.user.id === store.user.id) || [];
        console.log("lola");
        
        
    } else{
        userPosts = store.posts?.filter((post) => post.user.id == idProfile) || [];
        console.log(idProfile);
    }

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
                                    {
                                        pathname.includes("public-profile") 
                                        ? ""
                                        :
                                        <div className="d-flex justify-content-end mt-3">
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => handleEditPost(post.id)}
                                            >
                                                <i className="bi bi-pencil"></i> Editar
                                            </button>
                                        </div>                                        
                                    }
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