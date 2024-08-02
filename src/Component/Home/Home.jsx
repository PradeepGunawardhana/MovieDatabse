import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
    const key = import.meta.env.VITE_KEY;
    const navigate = useNavigate();

    const [resultData, setResultData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    const options = {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${key}`
        }
    };

    async function loadData() {
        const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
        try {
            const response = await axios.get(`${url}&api_key=${key}`, options);
            setResultData(response.data.results || []);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    function handleSearch(e) {
        e.preventDefault();
        if (searchKeyword) {
            navigate("/search", { state: { keyword: searchKeyword } });
        }
    }

    function viewData(movieId) {
        navigate('/movie', { state: { id: movieId } });
    }

    return (
        <div className='wrapper bg-black'>
            <div className='container'>
                <h2 className='heading text-center pt-2'>Movie Database</h2>
                <div className="search-container mt-3">
                    <form className="row g-3 justify-content-center align-items-center" onSubmit={handleSearch}>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                id="inputSearch"
                                placeholder="Search"
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-secondary">Search</button>
                        </div>
                    </form>
                </div>

                <div className="card-wrapper row py-4 justify-content-between align-items-center">
                    {resultData.length > 0 ? (
                        resultData.map((movie) => (
                            <div className="card bg-dark border-light border-4 pt-3 mt-5" key={movie.id}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    className="card-img"
                                    alt={movie.title}
                                />
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <h5 className="card-title text-center card-text-ctm">{movie.title}</h5>
                                    <p className="card-text text-center card-text-ctm">{new Date(movie.release_date).getFullYear()}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => viewData(movie.id)}
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-white">Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
