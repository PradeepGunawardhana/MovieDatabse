import React, { useEffect, useState } from 'react';
import './Movie.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Movie() {
    const key = import.meta.env.VITE_KEY;

    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [movieData, setMovieData] = useState(null);

    const location = useLocation();
    const { id } = location.state || {};

    useEffect(() => {
        if (id) {
            console.log(id)
            loadData();
        }
    }, [id]);

    async function loadData() {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`);
            const data = response.data;

            setTitle(data.title);
            setYear(new Date(data.release_date).getFullYear());
            setDescription(data.overview);
            setMovieData(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='wrapper bg-black vh-100'>
            <div className='container'>
                <div className="row justify-content-between align-items-start pt-5 pb-5">
                    {movieData ? (
                        <>
                            <div className="col-4">
                                <div className="card-wrapper row justify-content-between align-items-center">
                                    <div className="card bg-dark border-light border-4 p-3">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                                            alt={movieData.title}
                                            className="card-img"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-4">
                                <h2 className="heading">{title}</h2>
                                <h4 className="heading">{year}</h4>
                                <h5 className="heading">{movieData.genres.map(genre => genre.name).join(' / ')}</h5>
                            </div>

                            <div className="col-4">
                                <h4 className='heading'>Overview</h4>
                                <p className='heading'>{description}</p>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-white">Loading movie details...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Movie;
