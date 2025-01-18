import { CiGrid41 } from "react-icons/ci";
import {Link} from "react-router-dom"
import "./NavBar.css"
import { FaHome } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoMdLogIn } from "react-icons/io";

export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="logo" to="/">
                    <img
                        src="/src/assets/logo-wazoo.png"
                    />
                </Link>
                {/* menu toggle */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* menu navegacion */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav d-flex justify-content-evenly align-items-center w-100 gap-3">
                        <Link to = "/" className="inicio d-flex align-item-center gap-2">
                            <FaHome className="icons"/>
                            <h3>Inicio</h3>
                        </Link>
                        <Link to = "/favorites" className="favoritos d-flex align-item-center gap-2">
                            <FaHeart className="icons"/>
                            <h3>Favoritos</h3>
                        </Link>
                        <Link to = "/chats" className="chats d-flex align-item-center gap-2">
                            <FaRegMessage className="icons"/>
                            <h3>Chats</h3>
                        </Link>
                        <Link to = "/profile" className="perfil d-flex align-item-center gap-2">
                            <CgProfile className="icons"/>
                            <h3>Perfil</h3>
                        </Link>
                        <Link to = "/login" className="perfil d-flex align-item-center gap-2">
                            <IoMdLogIn className="icons"/>
                            <h3>Ingresar</h3>
                        </Link>
                    </ul>
                    
                </div>
            </div>
        </nav>

    )
}