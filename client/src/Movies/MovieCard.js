import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Route, useParams } from "react-router-dom";
import { response } from 'express';

export default function MovieCard (props) {
  const [movie, setMovie] = useState();
  let { id } = useParams();
  if (props.movie) id = props.movie.id;

  useEffect(() => {
    axios
    .get(`https://localhost:5000/api/movies/${id}`)
    .then((response) => {
      setMovie(response.data);
    })
    .catch((error) => {
      console.error(error)
    });
  }, [id]);
  const saveMovie = (evt) => {
    evt.preventDefault();
    props.addToSavedList(id);
  };
  if (!movie) {
    return <div>Loading</div>
  }
  const { title, director, metascore, stars } = movie;

  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <Route path={`/movie/${id}`}>
          <div>
            <h3>Actors</h3>
            {stars.map((star) => (
              <div key={star} className="movie-star">
                {star}
              </div>
            ))}
          </div>
        </Route>
      </div>
    <div className="save-button" onClick={saveMovie}>
      save
    </div>
    </div>
  );
}
