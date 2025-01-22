import React from "react";
import CreatePostForm from "../../components/posts/CreatePostForm";

const CreatePostView = () => {
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Nueva Publicación</h1>
            <CreatePostForm />
        </div>
    );
};

export default CreatePostView;
