import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {

    const [user, setUser] = useState({
        email: "",
        contraseña: "",
    })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        
        navigate("/register");

    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>EMAIL</label>
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label>CONTRASEÑA</label>
                    <input
                        type="password"
                        value={user.contraseña}
                        onChange={(e) => setUser({ ...user, contraseña: e.target.value })}
                        required
                    />
                </div>
                <button type='submit'>INGRESAR</button>
                <p>No tienes cuenta? Regístrate</p>
                <Link to = "/register">REGISTRARSE</Link>
            </form>
        </div>

    )
}