import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store/AppContext";
import { FaEdit } from "react-icons/fa";
import './styles/profile.css';



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
        // if (user.localization.length < 3) {
        //     setError("El nombre tiene que tener como mínimo 3 caracteres.")
        // }
        // else {
        //     actions.updateUser(user);
        //     setIsEditing(false);
        //     setError(null);
        // }
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
        <div className="container-profile d-flex justify-content-center">
            <div className="card mb-5 mt-5 w-50 p-5">
                <div className="row g-0">
                    <div className="col-md-4 position-abosulte">
                        <input ref={imputFile} onChange={handleUploadImage} type="file" accept="image/*" id="file" style={{ display: 'none' }} />
                        <button className="btn-edit-image" onClick={handleEditPhto} type="file">
                            <FaEdit />
                        </button>

                        <img src={user.image ? user.image : "https://cdn-icons-png.flaticon.com/512/4794/4794936.png"} className="img-fluid rounded-start" alt="Foto" />
                        {/* <p> className="card-title">email@email.com</p> */}
                    </div>
                    <div className="col-md-8 mt-4">
                        <div className="card-body">

                            {isEditing ? (
                                <form onSubmit={handleSave}>
                                    <input className="form-control mb-3" min={4} placeholder="Nombre" type="text" value={user.fullname} onChange={(e) => setUser({ ...user, fullname: e.target.value })} />
                                    {/* <input className="form-control mb-3" placeholder="Email" type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} /> */}
                                    <input className="form-control mb-3" placeholder="Localización" type="text" value={user.location} onChange={(e) => setUser({ ...user, location: e.target.value })} />

                                    
                                        {error && (<div className="alert-sm text-danger text-center" role="alert">{error}</div>)}
                                        
                                            
                                    

                                    <div className="text-end mt-5">
                                        <button onClick={() => setIsEditing(false)} type='submit' className="btn btn-outline-primary mx-2">CANCELAR</button>
                                        <button onClick={handleSave} type='submit' className="btn btn-outline-primary">GUARDAR</button>
                                    </div>


                                </form>
                            ) : (
                                <div className="cuadro">

                                    <p><strong className="letra-perfil">NOMBRE: </strong>{store.user.fullname}</p>
                                    <p><strong className="letra-perfil">EMAIL: </strong>{store.user.email}</p>
                                    <p><strong className="letra-perfil">LOCALIZACIÓN: </strong>{store.user.location} </p>
                                    <p><strong className="letra-perfil">FECHA DE REGISTRO: </strong>{store.user.date_at} </p>

                                    <div className="text-end mt-5">
                                        <button type="submit" className="btn btn-outline-primary ml-5 mx-2 "><i className="fa-solid fa-heart-circle-check"></i></button>
                                        <button onClick={handleEdit} type='submit' className="btn btn-outline-primary">EDITAR</button>
                                    </div>

                                </div>
                            )}




                            {/* <p className="card-text mt-3"><small className="text-body-secondary">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam est laborum reiciendis. Ab totam officia officiis reprehenderit vitae, dolorem accusamus? Excepturi velit aperiam, iusto ducimus enim laudantium praesentium error suscipit?</small></p> */}

                        </div>
                    </div>
                </div>
            </div>

        </div>


    )
}

