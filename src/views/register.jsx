import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/imagenlogo.webp"
import { Context } from "../store/AppContext";

export const Register = () => {

    const {actions} = useContext(Context);

    const [user, setUser] = useState({
        fullname: "",
        email: "",
        contraseña: "",
    })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        
        await actions.register(user)
        // navigate("/login");

    };


    return (
        <div className="container mt-5 w-50 p-5">
            <div className="d-flex justify-content-center form-control-lg">
                <img className="rounded-circle mt-1 mb-5" src={Logo} alt="Logo" />
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* <label>FULLNAME</label> */}
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
                    {/* <label>EMAIL</label> */}
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
                    {/* <label>CONTRASEÑA</label> */}
                    <input
                        className="form-control mt-5 w-100"
                        placeholder="Contraseña" aria-label="Recipient's username" aria-describedby="basic-addon2"
                        type="password"
                        value={user.contraseña}
                        onChange={(e) => setUser({ ...user, contraseña: e.target.value })}
                        required
                    />
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