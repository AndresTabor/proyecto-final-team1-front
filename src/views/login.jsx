import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/imagenlogo.webp"
import { Context } from "../store/AppContext";


export const Login = () => {


    const { store, actions } = useContext(Context);
    const { error } = store;
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resp = await actions.login(user)
            console.log(resp);


            navigate("/profile");
        } catch (error) {
            console.log("Algo salió mal");

        }




    };

    const handleLogout = () => {
        actions.logout();
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
                                <img className="rounded-circle mb-3 mt-0 img-fluid" src={Logo} alt="Logo" />
                            </div>
                            <form onSubmit={handleSubmit}>
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
                                <div className="mb-5">
                                    <input
                                        className="form-control"
                                        placeholder="Contraseña"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        type="password"
                                        value={user.password}
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                        required />
                                    {error && (
                                        <div className="alert-sm text-danger text-center mt-3" role="alert">
                                            Usuario o contraseña incorrecto.
                                        </div>
                                    )}
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-outline-primary w-100">
                                        INGRESAR
                                    </button>
                                </div>
                                <div className="text-center mt-4">
                                    <p>¿No tienes cuenta? <Link to="/register">REGÍSTRATE</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}