import React, { useContext, useState } from "react";
import { Context } from "../../store/AppContext";
import { toast } from "react-toastify";

const CreatePostForm = () => {
    const { actions, store } = useContext(Context);
    const [formData, setFormData] = useState({
        profession_title: "",
        description: "",
        price_per_hour: "",
        experience: "",
        image_url: "",
        location: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = { ...formData, user_id: store.user.id }; // Agrega user_id del store
        const result = await actions.createPost(postData);
        if (result.success) {
            toast.success(result.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.error(result.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Título de la Profesión</label>
                <input
                    type="text"
                    name="profession_title"
                    className="form-control"
                    value={formData.profession_title}
                    onChange={handleChange}
                    placeholder="Ejemplo: Pintor, Herrero, Carpintero, etc."
                    required
                />
            </div>
            <div className="form-group">
                <label>Descripción</label>
                <textarea
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe tus habilidades y experiencia"
                    required
                />
            </div>
            <div className="form-group">
                <label>Precio por hora</label>
                <input
                    type="number"
                    name="price_per_hour"
                    className="form-control"
                    value={formData.price_per_hour}
                    onChange={handleChange}
                    placeholder="Ejemplo: 20, 30, 40, etc."
                    required
                />
            </div>
            <div className="form-group">
                <label>Experiencia</label>
                <input
                    type="number"
                    name="experience"
                    className="form-control"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Ejemplo: 5, 2.5, 3, etc."
                    required
                />
            </div>
            <div className="form-group">
                <label>URL de la Imagen</label>
                <input
                    type="url"
                    name="image_url"
                    className="form-control"
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="Ejemplo: http://example.com/imagen.jpg"
                    required
                />
            </div>
            <div className="form-group">
                <label>Ubicación</label>
                <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Ejemplo: Ciudad de trabajo."
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
                Crear Publicación
            </button>
        </form>
    );
};

export default CreatePostForm;
