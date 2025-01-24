import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store/AppContext";
import { FaEdit } from "react-icons/fa";
import './styles/profile.css';
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import PostListByUserId from "../components/posts/PostListByUserId";
import { ToastContainer, toast } from "react-toastify";



export const PublicProfile = () => {
    const { store, actions } = useContext(Context);
    const [user, setUser] = useState({});
    const { idProfile } = useParams()

    useEffect(() => {
        if (idProfile) {
            actions.getUserById(idProfile)
                .then(setUser)
                .catch(e => console.error(e))
        }
    }, [idProfile]);

    const handleAddFavorites = () => {
        actions.addFavorite(user.id);
        toast.success("¡Agregado a Favoritos!", {
            position: "top-right",
            autoClose: 3000, // Tiempo en ms (3s)
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <>
            <ToastContainer />
            <div className="container-profile d-flex justify-content-center">
                <div className="card mb-5 mt-5 w-50 p-5">
                    <div className="row g-0">
                        <div className="col-md-4 position-abosulte">
                            <input type="file" accept="image/*" id="file" style={{ display: 'none' }} />


                            <img src={user.image ? user.image : "https://cdn-icons-png.flaticon.com/512/4794/4794936.png"} className="img-fluid rounded-start" alt="Foto" />

                        </div>
                        <div className="col-md-8 mt-4">
                            <div className="card-body">


                                <div className="cuadro">

                                    <p><strong className="letra-perfil">NOMBRE: </strong>{user.fullname}</p>
                                    <p><strong className="letra-perfil">EMAIL: </strong>{user.email}</p>
                                    <p><strong className="letra-perfil">LOCALIZACIÓN: </strong>{user.location} </p>
                                    <button
                                        className="btn btn-outline-primary d-flex align-items-center gap-2"
                                        style={{
                                            borderRadius: '30px',
                                            padding: '10px 20px',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                            fontWeight: 'bold',
                                        }}
                                        onClick={handleAddFavorites}>
                                        <i className="fa-solid fa-heart-circle-check"></i>Agregar a Favoritos
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <PostListByUserId />
                </div>
            </div>
        </>

    )
}

