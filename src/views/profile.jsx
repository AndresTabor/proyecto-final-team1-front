import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/imagenlogo.webp"
import { Context } from "../store/AppContext";

export const Profile = () => {





    return (
        <div className="container d-flex justify-content-center">
        <div className="card mb-5 mt-5 w-50 p-5">
            <div className="row g-0">
                <div className="col-md-4 mt-5">
                    <img className= "rounded-circle" src="https://cdn-icons-png.flaticon.com/512/4794/4794936.png" className="img-fluid rounded-start" alt="Foto"/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title">Nombre</h3>
                        {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> */}
                        <p className="card-text mt-3"><small className="text-body-secondary">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam est laborum reiciendis. Ab totam officia officiis reprehenderit vitae, dolorem accusamus? Excepturi velit aperiam, iusto ducimus enim laudantium praesentium error suscipit?</small></p>
                        <div className="text-end mt-5">
                        <button type='submit' className="btn btn-outline-primary">PUBLICAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* <div className="card container d-flex">
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div> */}
        </div>
       
    )
}

