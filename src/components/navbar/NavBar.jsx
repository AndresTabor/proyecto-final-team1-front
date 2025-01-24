import "./NavBar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaHeart, FaComments, FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { GrLogin } from "react-icons/gr";
import { useContext } from "react";
import { Context } from "../../store/AppContext";
import logo from "/src/assets/images/logo-wazoo.png";

export const NavBar = () => {
    const navigate = useNavigate()

    const { store, actions } = useContext(Context);

    const handleLogout = (e) => {
        e.preventDefault();
        actions.logout()
            .then(() => navigate("/"))
            .catch(e => console.error(e));
    }

    return (
        <>
            {/* Navbar de arriba */}
            <nav className="navbar-top">
                <ul>
                    <li className="logo-letras">
                        <Link to="/">
                            <img src={logo} alt="Logo" />
                        </Link>
                    </li>
                    <div className="left-items">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) => (isActive ? "active-link-top" : "")}
                            >
                                <FaHome /> Inicio
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/favorites"
                                className={({ isActive }) => (isActive ? "active-link-top" : "")}
                            >
                                {store.user && store.user.id ? <span><FaHeart />Favoritos</span> : ""}
                            </NavLink>
                        </li>
                    </div>
                    <div className="right-items">

                        {store.user && store.user.id ? "" : <li><NavLink to="/login" ><button>Iniciar Sesion</button></NavLink></li>}
                        {store.user && store.user.id ? "" : <li><NavLink to="/register"><button className="register-button">Registrarse</button></NavLink></li>}
                        {store.user && store.user.id ? <li><NavLink to="/chats" className={({ isActive }) => (isActive ? "active-link-top" : "")}><FaComments />Chats</NavLink></li> : ""}
                        {store.user && store.user.id ? <li><NavLink to="/profile" className={({ isActive }) => (isActive ? "active-link-top" : "")}><FaUserCircle />Perfil</NavLink></li> : ""}
                        {store.user && store.user.id ? <li><NavLink onClick={handleLogout}><BiLogOut />Cerrar Sesion</NavLink></li> : ""}

                    </div>
                </ul>
            </nav>

            {/* Navbar de abajo */}
            <nav className="navbar-bottom">
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive }) => (isActive ? "active-link-bottom" : "")}>
                            <FaHome />
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/favorites" className={({ isActive }) => (isActive ? "active-link-bottom" : "")}>
                            <FaHeart />
                        </NavLink>
                    </li> */}
                    {store.user && store.user.id ?
                        <NavLink to="/favorites" className={({ isActive }) => (isActive ? "active-link-bottom" : "")}>
                            <FaHeart />
                        </NavLink>
                        :
                        ""}
                    {/* <li>
                        <NavLink to="/chats" className={({ isActive }) => (isActive ? "active-link-bottom" : "")}>
                            <FaComments />
                        </NavLink>
                    </li> */}
                    {store.user && store.user.id ?
                        <NavLink to="/favorites" className={({ isActive }) => (isActive ? "active-link-bottom" : "")}>
                            <FaComments />
                        </NavLink>
                        :
                        ""}
                    <li>
                        <NavLink
                            to={store.user && store.user.id ? "/profile" : "/login"}
                            className={({ isActive }) => (isActive ? "active-link-bottom" : "")}
                        >
                            {store.user && store.user.id ? <FaUserCircle /> : <GrLogin />}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
};
