import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/AppContext";

const EditPostForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const [formData, setFormData] = useState({
        profession_title: "",
        description: "",
        price_per_hour: "",
        experience: "",
        image_url: "",
        location: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const post = await actions.fetchPostById(id); 
            if (post) {
                setFormData({
                    profession_title: post.profession_title || "",
                    description: post.description || "",
                    price_per_hour: post.price_per_hour || "",
                    experience: post.experience || "",
                    image_url: post.image_url || "",
                    location: post.location || ""
                });
                setLoading(false);
            } else {
                navigate("/"); 
            }
        };
        fetchPost();
    }, [id, actions, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.editPost(id, formData); 
        if (success) {
            navigate("/");
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Cargando...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h3 className="mb-0">Editar Publicación</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="profession_title" className="form-label">
                                        Título de la Profesión
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="profession_title"
                                        name="profession_title"
                                        value={formData.profession_title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Descripción
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price_per_hour" className="form-label">
                                        Precio por Hora (€)
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price_per_hour"
                                        name="price_per_hour"
                                        value={formData.price_per_hour}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="experience" className="form-label">
                                        Experiencia (en años)
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="experience"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image_url" className="form-label">
                                        URL de la Imagen
                                    </label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        id="image_url"
                                        name="image_url"
                                        value={formData.image_url}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">
                                        Localización
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="button" className="btn btn-secondary me-2" onClick={() => navigate("/my-posts")}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Guardar Cambios
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPostForm;
