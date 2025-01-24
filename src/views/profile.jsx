import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store/AppContext";
import { FaEdit } from "react-icons/fa";
import './styles/profile.css';
import moment from "moment";
import { Link } from "react-router-dom";
import PostListByUserId from "../components/posts/PostListByUserId";



export const Profile = () => {
    const { store, actions } = useContext(Context);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        fullname: '',
        email: '',
        location: '',
        image: ''
    });
    const imputFile = useRef(null);


    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (user.fullname.length < 4) {
            setError("El nombre tiene que tener como mínimo 4 caracteres.")
        }
        else {
            actions.updateUser(user);
            setIsEditing(false);
            setError(null);
        }

    };


    const handleEditPhto = () => {
        imputFile.current.click();
    };

    const handleUploadImage = (e) => {
        console.log(e.target.files);
        const file = e.target.files[0];
        if (file) {
            actions.uploadImageProfile(file);
        }
    };

    useEffect(() => {
        setUser({
            fullname: store.user.fullname,
            email: store.user.email,
            location: store.user.location,
            image: store.user.image
        });
    }, [store.user]);


    return (
        <div className="container d-flex justify-content-center align-items-center mt-5 mb-5">
            <div className="card shadow-lg border-0 row col-12 col-md-10 col-lg-8 p-4"
                style={{
                    backgroundColor: '#E8F9FF',
                    borderRadius: '15px',
                    maxWidth: '900px',
                }}>
                <div className="row g-4">
                    {/* Imagen de perfil y botón de editar */}
                    <div className="col-12 col-md-4 text-center position-relative">
                        <input
                            ref={imputFile}
                            onChange={handleUploadImage}
                            type="file"
                            accept="image/*"
                            id="file"
                            style={{ display: 'none' }}
                        />
                        <button
                            className="btn btn-light position-absolute top-0 end-0 mt-2 me-2"
                            onClick={handleEditPhto}
                            type="button"
                            style={{
                                borderRadius: '50%',
                                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                            }}>
                            <FaEdit />
                        </button>
                        <img
                            src={user.image || "https://cdn-icons-png.flaticon.com/512/4794/4794936.png"}
                            className="img-fluid rounded-circle border mt-3"
                            style={{
                                maxWidth: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #007bff',
                            }}
                            alt="Foto de perfil"
                        />
                    </div>

                    {/* Contenido del perfil */}
                    <div className="col-12 col-md-8">
                        <div className="card-body">
                            {isEditing ? (
                                <form onSubmit={handleSave}>
                                    <input
                                        className="form-control mb-3"
                                        min={4}
                                        placeholder="Nombre"
                                        type="text"
                                        value={user.fullname}
                                        onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                                        required
                                    />
                                    <input
                                        className="form-control mb-3"
                                        placeholder="Localización"
                                        type="text"
                                        value={user.location}
                                        onChange={(e) => setUser({ ...user, location: e.target.value })}
                                        required
                                    />
                                    {error && (
                                        <div className="alert-sm text-danger text-center" role="alert">
                                            {error}
                                        </div>
                                    )}
                                    <div className="text-end mt-4">
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            type="button"
                                            className="btn btn-outline-secondary mx-2">
                                            CANCELAR
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            type="submit"
                                            className="btn btn-outline-primary">
                                            GUARDAR
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div>
                                    <p><strong className="letra-perfil">NOMBRE:</strong> {store.user.fullname}</p>
                                    <p><strong className="letra-perfil">EMAIL:</strong> {store.user.email}</p>
                                    <p><strong className="letra-perfil">LOCALIZACIÓN:</strong> {store.user.location}</p>
                                    <p><strong className="letra-perfil">FECHA DE REGISTRO:</strong> {moment(store.user.date_at).format("DD/MM/YYYY")}</p>
                                    <div className="text-end mt-4">
                                        <Link
                                            to={"/favorites"}
                                            className="btn btn-outline-primary mx-2">
                                            <i className="fa-solid fa-heart-circle-check"></i>
                                        </Link>
                                        <button
                                            onClick={handleEdit}
                                            type="button"
                                            className="btn btn-outline-primary">
                                            EDITAR
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Lista de publicaciones */}
                <PostListByUserId />
            </div>
        </div>


    )
}

