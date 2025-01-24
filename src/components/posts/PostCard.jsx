import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
    const navigate = useNavigate();

    //limitar caract en desc
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <Card className="mb-4 shadow-sm border-0" style={{ borderRadius: '15px', backgroundColor: '#E8F9FF' }}>
    <Card.Body>
        <Row className="gy-3">
            {/* Información principal del post */}
            <Col xs={12} className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <div className="mb-3 mb-md-0">
                    <Card.Title className="fw-bold fs-4 mb-2">{post.profession_title}</Card.Title>
                    <div className="d-flex flex-column flex-sm-row text-muted">
                        <Card.Subtitle className="mx-2 mb-1 mb-sm-0">Localidad: {post.location}</Card.Subtitle>
                        <Card.Subtitle className="mx-2">Publicado por: <span className="fw-bold">{post.user.fullname}</span></Card.Subtitle>
                    </div>
                </div>

                <Card.Text className="fw-bold fs-5 text-end mt-2 mt-md-0" style={{ color: '#2a2a2a' }}>
                    ${post.price_per_hour} / h
                </Card.Text>
            </Col>

            {/* Descripción del post */}
            <Col xs={12}>
                <Card.Text
                    className="p-3 mb-3"
                    style={{
                        border: '1px solid #d9d9d9',
                        borderRadius: '8px',
                        backgroundColor: '#f9f9f9',
                        color: '#555',
                    }}
                >
                    {truncateText(post.description, 120)}
                </Card.Text>
            </Col>

            {/* Botón "Ver más" */}
            <Col xs={12} className="text-end">
                <Button
                    variant="link"
                    className="text-primary p-0 fw-bold"
                    style={{
                        textDecoration: 'none',
                        fontSize: '1.1rem',
                        padding: '0',
                        borderBottom: '2px solid #3498db',
                        transition: 'all 0.3s ease',
                    }}
                    onClick={() => navigate(`/posts-list/${post.id}`)}
                    onMouseEnter={(e) => e.target.style.borderBottom = '2px solid #2980b9'}
                    onMouseLeave={(e) => e.target.style.borderBottom = '2px solid #3498db'}
                >
                    Ver más +
                </Button>
            </Col>
        </Row>
    </Card.Body>
</Card>

    );
};

export default PostCard;
