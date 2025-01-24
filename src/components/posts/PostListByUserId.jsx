import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/AppContext";
import PostCard from "./PostCard";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";

const PostListByUserId = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { idProfile } = useParams()
    let userPosts = [];

    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);

    useEffect(() => {
        actions.fetchPosts(store.filters);
    }, []);

    if (!pathname.includes("public-profile")) {
        userPosts = store.posts?.filter((post) => post.user.id === store.user.id) || [];
    } else {
        userPosts = store.posts?.filter((post) => post.user.id == idProfile) || [];
    }

    const handleEditPost = (id) => {
        navigate(`/edit-post/${id}`);
    };

    const handleDeletePost = async () => {
        const result = await actions.deletePost(postIdToDelete);
        if (result.success) {
            toast.success("Post eliminado");
            setShowModal(false); // cerrar el modal al eliminar
        } else {
            toast.error(result.message || "Error al eliminar");
        }
    };

    const showDeleteModal = (id) => {
        setPostIdToDelete(id);
        setShowModal(true);
    };

    const closeDeleteModal = () => {
        setShowModal(false);
        setPostIdToDelete(null);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                <h1 className="mb-0">
                    {pathname.includes("public-profile") ? "Publicaciones" : "Mis Publicaciones"}
                </h1>
                {!pathname.includes("public-profile") && (
                    <Link
                        to="/create-post"
                        className="btn btn-success mt-3 mt-md-0 d-block d-md-inline-block"
                    >
                        <i className="bi bi-plus-lg me-2"></i> Crear Nueva Publicación
                    </Link>
                )}
            </div>

            <div className="row">
                {userPosts.length > 0 ? (
                    userPosts.map((post) => (
                        <div className="col-md-12 mb-4 mx-0 px-0" key={post.id}>
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <PostCard post={post} />
                                    {pathname.includes("public-profile") ? (
                                        ""
                                    ) : (
                                        <div className="d-flex flex-column flex-md-row justify-content-end gap-2 mt-3">
                                            <button
                                                className="btn btn-primary btn-sm d-flex align-items-center gap-1 px-3 mb-2 mb-md-0"
                                                onClick={() => handleEditPost(post.id)}
                                            >
                                                <i className="bi bi-pencil-fill"></i>
                                                <span>Editar</span>
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm d-flex align-items-center gap-1 px-3"
                                                onClick={() => showDeleteModal(post.id)}
                                            >
                                                <i className="bi bi-trash-fill"></i>
                                                <span>Eliminar</span>
                                            </button>
                                        </div>

                                    )}
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

            {/* modal de confirmación para eliminar el post */}
            <Modal show={showModal} onHide={closeDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar este post? Esta acción es irreversible.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDeletePost}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default PostListByUserId;
