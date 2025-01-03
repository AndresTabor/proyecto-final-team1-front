import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        //url del codeSpace
        const url = "http://localhost:3000"
        const response = await fetch(`${url}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();
        console.log(data);
        
        
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
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
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