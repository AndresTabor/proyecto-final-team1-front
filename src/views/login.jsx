import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import  Logo  from "../assets/images/imagenlogo.webp"

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
        <div className="container mt-5 w-50 p-5">
            <div className="d-flex justify-content-center form-control-lg">
                <img className= "rounded" src={Logo} alt="Logo"/>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    {/* <label>EMAIL</label> */}
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
                    {/* <label>CONTRASEÑA</label> */}
                    <input
                        className="form-control"
                        placeholder="Contraseña" aria-label="Recipient's username" aria-describedby="basic-addon2"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        required
                    />
                </div>
                <div class="d-grid gap-2 col-3 mx-auto">
                <button type='submit' className="btn btn-outline-primary">INGRESAR</button>
                </div>
                <div className="text-end mt-5">
                <p>No tienes cuenta? Regístrate</p>
                </div>
                <Link to = "/register">REGISTRARSE</Link>
            </form>
        </div>

    )
}