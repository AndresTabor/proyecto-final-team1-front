import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store/AppContext";
import { FaEdit } from "react-icons/fa";
import './styles/profile.css';


export const Profile = () => {
    const { store, actions } = useContext(Context);
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        fullname: '',
        email: '',
        localization: '',
        image: ''
    });
    const imputFile = useRef(null);


    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        actions.updateUser(user);
        setIsEditing(false);
    };
    
    const handleEditPhto = () => {
        imputFile.current.click();
    };

    const handleUploadImage =  (e) => {
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
            localization: store.user.localization,
            image: store.user.image
        });
    }, [store.user]);


    return (
        <div className="container d-flex justify-content-center">
            <div className="card mb-5 mt-5 w-50 p-5">
                <div className="row g-0">
                    <div className="col-md-4 mt-3 position-abosulte">
                        <input ref={imputFile} onChange={handleUploadImage} type="file" accept="image/*" id="file" style={{ display: 'none' }} />
                        <button className="btn-edit-image" onClick={handleEditPhto} type="file">
                            <FaEdit />
                        </button>
                        
                        <img src={user.image ? user.image : "https://cdn-icons-png.flaticon.com/512/4794/4794936.png" } className="img-fluid rounded-start" alt="Foto" />
                        {/* <p> className="card-title">email@email.com</p> */}
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">

                            {isEditing ? (
                                <form onSubmit={handleSave}>
                                    <input className="form-control mb-3" placeholder="Nombre" type="text" value={user.fullname} onChange={(e) => setUser({ ...user, fullname: e.target.value })} />
                                    <input className="form-control mb-3" placeholder="Email" type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                                    <input className="form-control mb-3" placeholder="Localización" type="text" value={user.localization} onChange={(e) => setUser({ ...user, localization: e.target.value })} />

                                    <div className="text-end mt-5">
                                        <button onClick={handleSave} type='submit' className="btn btn-outline-primary">GUARDAR</button>
                                    </div>


                                </form>
                            ) : (
                                <div className="cuadro">
                                   
                                    <p className="card-title">Nombre: {store.user.fullname}</p>
                                    <p className="card-title">Email: {store.user.email}</p>
                                    <p className="card-title">Localización: </p>
                                    <p className="card-title">Fecha registro: {store.user.date_at} </p>

                                    <div className="text-end mt-5">
                                        <button type="submit" className="btn btn-outline-primary ml-5 "><i className="fa-solid fa-heart-circle-check"></i></button>
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

