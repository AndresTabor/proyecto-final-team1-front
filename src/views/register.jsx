import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/imagenlogo.webp"
import { Context } from "../store/AppContext";
import { Store } from "@mui/icons-material";

export const Register = () => {

    const {actions} = useContext(Context);

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
        <div className="container mt-5 w-50 p-5">
            <div className="d-flex justify-content-center form-control-lg">
                <img className="rounded-circle mt-1 mb-5" src={Logo} alt="Logo" />
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        className="form-control"
                        placeholder="Nombre" aria-label="Recipient's username" aria-describedby="basic-addon2"
                        type="text"
                        value={user.fullname}
                        onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <input
                        className="form-control mt-5 w-100"
                        placeholder="Email" aria-label="Recipient's username" aria-describedby="basic-addon2"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <input
                        className="form-control mt-5 w-100"
                        placeholder="Contraseña" aria-label="Recipient's username" aria-describedby="basic-addon2"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        required
                    />
                  
                   <p className="mensaje-validacion mt-2 text-center">La contraseña debe contener al menos 8 caracteres, incluyendo al menos una mayúscula, una minúscula y un número.</p>
                </div>
                <div className="d-grid gap-2 col-3 mx-auto">
                    <button type='submit' className="btn btn-outline-primary mt-5">REGISTRARSE</button>
                </div>
                <div className="text-center mt-5">
                    <Link to="/login">INGRESAR</Link>
                </div>
            </form>
        </div>

    )
}