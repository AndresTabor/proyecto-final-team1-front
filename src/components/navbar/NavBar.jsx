import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaHeart, FaComments, FaUserCircle } from "react-icons/fa";
import { GrLogin } from "react-icons/gr";
import { useContext } from "react";
import { Context } from "../../store/AppContext";

const logo = "/src/assets/images/logo-wazoo.png";

export const NavBar = () => {
    const { store } = useContext(Context);

    return (
        <>
            {/* navbar de arriba */}
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
                                <FaHeart /> Favoritos
                            </NavLink>
                        </li>
                    </div>

                    <div className="right-items">
                        <li>
                            <NavLink
                                to="/chats"
                                className={({ isActive }) => (isActive ? "active-link-top" : "")}
                            >
                                <FaComments /> Chats
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={store.user && store.user.id ? "/profile" : "/login"}
                                className={({ isActive }) => (isActive ? "active-link" : "")}
                            >
                                {store.user && store.user.id ? (
                                    <span>
                                        <FaUserCircle />
                                        Mi Perfil
                                    </span>
                                ) : (
                                    <span>
                                        <GrLogin />
                                        Ingresar
                                    </span>
                                )}
                            </NavLink>
                        </li>
                    </div>
                </ul>
            </nav>

            {/* navbar de abajo */}
            <nav className="navbar-bottom">
                <ul>
                    <NavLink to="/">
                        <a>
                            <FaHome />
                        </a>
                    </NavLink >
                    <NavLink to="/favorites">
                        <a>
                            <FaHeart />
                        </a>
                    </NavLink >
                    <NavLink to="/chats">
                        <a>
                            <FaComments />
                        </a>
                    </NavLink >
                    <NavLink
                        to={store.user && store.user.id ? "/profile" : "/login"}
                    >
                        {store.user && store.user.id ? (
                            <span>
                                <FaUserCircle />
                            </span>
                        ) : (
                            <span>
                                <GrLogin />
                            </span>
                        )}
                    </NavLink >
                </ul>
            </nav>
        </>
    );
};
