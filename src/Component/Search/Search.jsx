import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Search() {
    const location = useLocation();
    const navigate = useNavigate();
    const key = import.meta.env.VITE_KEY || '66d8b51786bc1cb0b746dc073d95ed26';

    const [resultData, setResultData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [displayKeyword, setDisplayKeyword] = useState('');

    const options = {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${key}`
        }
    };

    const { keyword } = location.state || { keyword: '' };

    useEffect(() => {
        if (keyword) {
            setSearchKeyword(keyword);
            searchData(keyword);
        }
    }, [keyword]);

    async function searchData(inputKeyword) {
        try {
            const url = `https://api.themoviedb.org/3/search/movie?query=${inputKeyword}&include_adult=false&language=en-US&page=1`;
            const response = await axios.get(`${url}&api_key=${key}`, options);
            setResultData(response.data.results || []);
            setDisplayKeyword(inputKeyword);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function handleSearch(e) {
        e.preventDefault();
        if (searchKeyword) {
            searchData(searchKeyword);
        }
    }

    function viewMovie(movieId) {
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
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)} 
                            />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Search</button>
                        </div>
                    </form>
                </div>

                <h3 className='heading text-white'>Showing Results for "{displayKeyword}"</h3>

                <div className="card-wrapper row py-4 justify-content-between align-items-center">
                    {resultData.length > 0 ? (
                        resultData.map((movie) => (
                            <div className="card bg-dark border-light border-4 pt-3 mt-5" key={movie.id}>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img" alt={movie.title} />
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <h5 className="card-title text-center card-text-ctm">{movie.title}</h5>
                                    <p className="card-text text-center card-text-ctm">{new Date(movie.release_date).getFullYear()}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => viewMovie(movie.id)}
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-white">No results found. Please try a different title.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;
