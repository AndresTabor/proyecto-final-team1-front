import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const PostCard = ({ post }) => {

    //limitar caract en desc
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <Card className="mb-4 shadow-sm border-1" style={{ borderRadius: '10px', borderColor: '#d9d9d9' }}>
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
                            {truncateText(post.description, 120)}
                        </Card.Text>
                    </Col>

                    <Col xs={12} className="text-end">
                        <Button variant="link" className="text-primary p-0 fw-bold" style={{ textDecoration: 'none' }}>
                            Ver más +
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default PostCard;
