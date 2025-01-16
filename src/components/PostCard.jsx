import React from 'react';
import { Card, Button } from 'react-bootstrap';

const PostCard = ({ post }) => {
    return (
        <Card className="mb-4">
            <Card.Img
                variant="top"
                src={post.image_url}
                alt={post.profession_title}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
                <Card.Title>{post.profession_title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
                <Card.Text>
                    <strong>Precio por hora:</strong> €{post.price_per_hour}
                </Card.Text>
                <Card.Text>
                    <strong>Experiencia:</strong> {post.experience} años
                </Card.Text>
                <Card.Text>
                    <strong>Ubicación:</strong> {post.location}
                </Card.Text>
                <Button variant="primary">Ver más</Button>
            </Card.Body>
        </Card>
    );
};

export default PostCard;
