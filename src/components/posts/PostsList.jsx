import React, { useEffect, useContext, useState } from 'react';
import { Context } from '../../store/AppContext';
import PostCard from './PostCard';

const PostsList = () => {
    const { store, actions } = useContext(Context);

    const [filters, setFilters] = useState({
        profession_title: '',
        location: '',
        min_price: '',
        max_price: ''
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        actions.setFilters(filters);  //actualizamos los filtros
        actions.fetchPosts(); //llamamos a la api
    };

    useEffect(() => {
        actions.fetchPosts();
    }, [filters, store.filters.page, store.filters.limit]);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Publicaciones</h1>

            {/* añadimos la seccion de filtros */}
            <form onSubmit={handleSearch}>
                <div className='row'>
                    <div className='col-md-3'>
                        <input
                            type="text"
                            name="profession_title"
                            className="form-control"
                            placeholder="Título de profesión"
                            value={filters.profession_title}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className='col-md-2'>
                        <input
                            type="number"
                            name="max_price"
                            className="form-control"
                            placeholder="Precio maximo"
                            value={filters.max_price}
                            onChange={handleFilterChange}
                        />
                    </div>

                    <div className='col-md-3'>
                        <input
                            type="text"
                            name="location"
                            className="form-control"
                            placeholder="Localización"
                            value={filters.location}
                            onChange={handleFilterChange}
                        />
                    </div>

                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary w-100">Filtrar</button>
                    </div>

                </div>
            </form>

            {/* parte de los post */}
            <div className="row">
                {store.posts && store.posts.length > 0 ? (
                    store.posts.map((post) => (
                        <div className="col-12" key={post.id}>
                            <PostCard post={post} />
                        </div>
                    ))
                ) : (
                    <p>Cargando publicaciones...</p>
                )}
            </div>
        </div>
    );
};

export default PostsList;
