import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/imagenlogo.webp"
import { Context } from "../store/AppContext";
import { Store } from "@mui/icons-material";

export const Register = () => {

    const { actions } = useContext(Context);

    const [user, setUser] = useState({
        fullname: "",
        email: "",
        password: "",
    })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);


        await actions.register(user)
        navigate("/login");

    };


    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row w-100">
                <div className="col-12 col-md-8 col-lg-6 mx-auto p-4">
                    <div 
                        className="card shadow-lg border-0"
                        style={{
                            backgroundColor: '#E8F9FF',
                            borderRadius: '15px',
                            maxWidth: '500px',
                            margin: '0 auto'}} >
                        <div className="card-body">
                            <div className="d-flex justify-content-center">
                                <img className="rounded-circle mt-1 mb-4 img-fluid" src={Logo} alt="Logo" />
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <input
                                        className="form-control"
                                        placeholder="Nombre"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        type="text"
                                        value={user.fullname}
                                        onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                                        required />
                                </div>
                                <div className="mb-4">
                                    <input
                                        className="form-control"
                                        placeholder="Email"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        type="email"
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        required />
                                </div>
                                <div className="mb-4">
                                    <input
                                        className="form-control"
                                        placeholder="Contraseña"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        type="password"
                                        value={user.password}
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                        required />
                                    <p className="mensaje-validacion mt-2 text-center">
                                        La contraseña debe contener al menos 8 caracteres, incluyendo al menos una mayúscula, una minúscula y un número.
                                    </p>
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-outline-primary w-100 mt-3">
                                        REGISTRARSE
                                    </button>
                                </div>
                                <div className="text-center mt-4">
                                    <p>¿Ya tienes cuenta? <Link to="/login">INGRESAR</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}