import "./NavBar.css"
import { Link } from "react-router-dom"

import { FaHome, FaHeart, FaComments, FaUserCircle } from "react-icons/fa"

const logo = "/src/assets/images/logo-wazoo.png"

export const NavBar = () => {
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
                            <Link to="/">
                                <FaHome /> Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to="/favoritos">
                                <FaHeart /> Favoritos
                            </Link>
                        </li>
                    </div>

                    <div className="right-items">
                        <li>
                            <Link to="/chats">
                                <FaComments /> Chats
                            </Link>
                        </li>
                        <li>
                            <Link to="/perfil">
                                <FaUserCircle /> Perfil
                            </Link>
                        </li>
                    </div>
                </ul>
            </nav>
            
            {/* navbar de abajo */}
            <nav className="navbar-bottom">
                <ul>
                    <Link to="/">
                        <a><FaHome /></a>
                    </Link>
                    <Link to="/favoritos">
                        <a><FaHeart /></a>
                    </Link>
                    <Link to="/chats">
                        <a><FaComments /></a>
                    </Link>
                    <Link to="/perfil">
                        <a><FaUserCircle /></a>
                    </Link>
                </ul>
            </nav>

        </>
    )
}
