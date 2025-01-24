import React, { useContext, useState } from "react";
import { Context } from "../../store/AppContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const CreatePostForm = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate(); // Para redirigir después de crear
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
        const postData = { ...formData, user_id: store.user?.id }; // Agregar user_id del store
        const result = await actions.createPost(postData);

        if (result?.success) {
            toast.success("Publicación creada con éxito 🎉", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });

            // Redirigir al listado de publicaciones
            setTimeout(() => {
                navigate("/profile"); // Cambia esta ruta según sea necesario
            }, 1500);
        } else {
            toast.error("Error al crear la publicación. Por favor, inténtalo de nuevo. ❌", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        }
    };

    return (
        <div className="container mt-2 mb-5">
            <ToastContainer />
            <h1 className="text-center mb-4">Crea tu Publicación</h1>
            <form
                onSubmit={handleSubmit}
                className="p-4 border rounded shadow-sm bg-light"
            >
                <div className="mb-3">
                    <label htmlFor="profession_title" className="form-label">
                        <strong>Título de la Profesión</strong>
                    </label>
                    <input
                        type="text"
                        id="profession_title"
                        name="profession_title"
                        className="form-control"
                        value={formData.profession_title}
                        onChange={handleChange}
                        placeholder="Ejemplo: Pintor, Herrero, Carpintero, etc."
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        <strong>Descripción</strong>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe tus habilidades y experiencia"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="price_per_hour" className="form-label">
                            <strong>Precio por hora</strong>
                        </label>
                        <input
                            type="number"
                            id="price_per_hour"
                            name="price_per_hour"
                            className="form-control"
                            value={formData.price_per_hour}
                            onChange={handleChange}
                            placeholder="Ejemplo: 20, 30, 40, etc."
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="experience" className="form-label">
                            <strong>Experiencia (años)</strong>
                        </label>
                        <input
                            type="number"
                            id="experience"
                            name="experience"
                            className="form-control"
                            value={formData.experience}
                            onChange={handleChange}
                            placeholder="Ejemplo: 5, 2.5, 3, etc."
                            required
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="image_url" className="form-label">
                        <strong>URL de la Imagen</strong>
                    </label>
                    <input
                        type="url"
                        id="image_url"
                        name="image_url"
                        className="form-control"
                        value={formData.image_url}
                        onChange={handleChange}
                        placeholder="Ejemplo: http://example.com/imagen.jpg"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                        <strong>Ubicación</strong>
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        className="form-control"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Ejemplo: Ciudad de trabajo"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Crear Publicación
                </button>
            </form>
        </div>
    );
};

export default CreatePostForm;
