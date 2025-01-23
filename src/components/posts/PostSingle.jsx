import React, { useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Context } from "../../store/AppContext";
import { Card, Button } from "react-bootstrap";

const SinglePost = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getSinglePost(id);
    }, [id]);

    if (!store.singlePost) {
        return <div className="text-center mt-5">Cargando...</div>;
    }

    const { profession_title, description, image_url, price_per_hour, location , user} = store.singlePost;

    return (
        <div className="container d-flex justify-content-center mt-5">
            <Card style={{ width: "100%", maxWidth: "600px" }}>
                <Card.Body>
                    <Card.Title>{profession_title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Localidad: {location}</Card.Subtitle>
                    <Card.Text>
                        <strong>Precio por hora:</strong> ${price_per_hour}/h
                    </Card.Text>
                    <Card.Text>{description}</Card.Text>
                    <Card.Img src={image_url} alt={profession_title} className="mb-2" />
                    <div className="d-flex justify-content-between">
                        <Button
                            variant="primary"
                            onClick={() => navigate(-1)}
                        >
                            Volver atrás
                        </Button>
                        {
                            store.user.id !== user.id &&
                            <Link to={`/public-profile/${user.id}`} variant="secondary" className="btn btn-secondary">Ver Perfil</Link>
                        }
                        {
                            store.user.id !== user.id
                            ? <Link to={`/chats/${user.id}`} variant="success" className="btn btn-success">Contactar</Link>
                            : <Link to={`/edit-post/${id}`} variant="success" className="btn btn-success">Editar</Link>
                        }
                        
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SinglePost;
