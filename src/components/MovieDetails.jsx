import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovies } from './api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await fetchMovies(id);
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError('Movie does not exist');
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div className="text-center p-5">Chargement...</div>;
  if (error) return <div className="alert alert-danger m-5">{error}</div>;
  if (!movie) return <div className="alert alert-warning m-5">Film non trouvé</div>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-4">
          <img 
            src={`/images/${movie.img || 'placeholder.jpg'}`} 
            alt={movie.title} 
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-8">
          <h1>{movie.title}</h1>
          <p className="badge bg-primary">{movie.genre}</p>
          <p className="badge bg-secondary">{movie.year}</p>
          <hr />
          <h3>Description</h3>
          <p>{movie.description}</p>
          <Link to="/movies" className="btn btn-primary">
            Retour à la liste
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;