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
        <div className="container mt-5 w-50 p-5">
            <div className="d-flex justify-content-center form-control-lg">
                <img className="rounded-circle mb-5 mt-0" src={Logo} alt="Logo" />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <input
                        className="form-control"
                        placeholder="Email" aria-label="Recipient's username" aria-describedby="basic-addon2"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        required
                    />

                </div>


                <div className="mb-5">
                    <input
                        className="form-control"
                        placeholder="Contraseña" aria-label="Recipient's username" aria-describedby="basic-addon2"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        required
                    />
                    {
                        error && (<div className="alert-sm text-danger text-center mt-3" role="alert">
                            Usuario o contraseña incorrecto.
                        </div>)
                    }
                </div>
                <div className="d-grid gap-2 col-3 mx-auto">
                    <button type='submit' className="btn btn-outline-primary">INGRESAR</button>
                    <button type='submit' className="btn btn-outline-primary" onClick={handleLogout}>CERRAR SESIÓN</button>
                </div>
                <div className="text-end mt-5">
                    <p className="text-center">¿No tienes cuenta? Regístrate</p>
                </div>
                <div className="text-center">
                    <Link to="/register">REGISTRARSE</Link>
                </div>
            </form>
        </div>

    )
}