import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";

const PostSingleView = () => {
    const { id } = useParams(); 
    const [post, setPost] = useState(null); 

    useEffect(() => {
        fetch(`https://fictional-carnival-j4jj9j5j59xhjqg6-3000.app.github.dev/posts-list/${id}`)
            .then((response) => response.json())
            .then((data) => setPost(data.data))
            .catch((error) => console.error("Error fetching post:", error));
    }, [id]);

    if (!post) {
        return <p>Cargando...</p>;
    }

    return (
        <Card className="mt-5 shadow-sm border-1" style={{ borderRadius: '10px', borderColor: '#d9d9d9' }}>
            <Card.Body>
                <Row className="gy-3">
                    <Col xs={12} className="d-flex justify-content-between align-items-center">
                        <div>
                            <Card.Title className="fw-bold">{post.profession_title}</Card.Title>
                            <Card.Subtitle className="text-muted">Localidad: {post.location}</Card.Subtitle>
                        </div>
                        <Card.Text className="fw-bold text-end" style={{ fontSize: '1.2rem' }}>
                            ${post.price_per_hour} / h
                        </Card.Text>
                    </Col>

                    <Col xs={12}>
                        <Card.Text
                            className="p-2"
                            style={{
                                border: '1px solid #d9d9d9',
                                borderRadius: '5px',
                                backgroundColor: '#f9f9f9',
                            }}
                        >
                            {post.description}
                        </Card.Text>
                    </Col>

                    <Col xs={12} className="text-center">
                        <Button variant="primary" className="fw-bold">
                            Contactar
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default PostSingleView;
