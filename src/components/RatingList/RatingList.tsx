import './RatingList.css'

import React, { useEffect, useState } from 'react';
import { Movie, getMovies } from '../../services/dynamoService';

const RatingList: React.FC = () =>{
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() =>{
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try{
            const movies = await getMovies();
            setMovies(movies);
        } catch (error){
            console.log('Error fetching movies', error)
        }
    };

    return(
        <div>
             <ol>
        {movies.map((movie) => (
          <li key={movie.title}>
            <h3>{movie.title}</h3>
            <p>IMDB Link: {movie.imdbLink}</p>
            <p>Rating: {movie.rating}</p>
          </li>
        ))}
      </ol>
        </div>
    )
}

export default RatingList;