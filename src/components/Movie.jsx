import React, { useState, useEffect } from 'react';         // React et ses hooks
import { NavLink } from 'react-router-dom';

const Movie = ({movie}) => {


     // State for ratings
  const [ratings, setRatings] = useState(movie.ratings || []);
  const [userRating, setUserRating] = useState('');
  const [averageRating, setAverageRating] = useState(null);

  // Calculate average rating when ratings change
  useEffect(() => {
    if (ratings && ratings.length > 0) {
      const sum = ratings.reduce((total, rating) => total + rating, 0);
      setAverageRating((sum / ratings.length).toFixed(1));
    } else {
      setAverageRating(null);
    }
  }, [ratings]);

   // Handle rating submission
   const handleRatingSubmit = (e) => {
    e.preventDefault();
    
    // Convert to number and validate
    const ratingValue = parseFloat(userRating);
    
    if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
      // Show alert for invalid input
      alert("Please enter a rating between 1 and 5");
      return;
    }
    // Add new rating to the array
    const newRatings = [...ratings, ratingValue];
    setRatings(newRatings);
 // TODO: Here you would normally update the backend with the new rating
    // updateMovieRating(movie.id, ratingValue);
    
    // Reset input
    setUserRating('');
  };
    

  return (
    <div className="container" style={{
      position: 'relative',  // Ajout de cette ligne
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '15px',
      margin: '10px',
      width: '300px'
    }}>
 
 <img
        src={`/images/${movie.img || 'placeholder.jpg'}`}
        alt={movie.title}
        style={{ width: '100%', borderRadius: '8px' }}
      />  
    
    <NavLink to={`/details/${movie.id}`}>
        <h3>{movie.title}</h3>
    </NavLink>
      <p>Year: {movie.year}</p>
      <p>genre: {movie.genre}</p>
      <p>description: {movie.description}</p>
    
   {/* Simple Rating Display */}
   <div className="mt-3">
        <h5>Rating:</h5>
        {averageRating ? (
          <div>
            <span style={{ fontWeight: 'bold' }}>{averageRating}/5</span>
            <small className="text-muted"> ({ratings.length} ratings)</small>
          </div>
        ) : (
          <p className="text-muted">No ratings yet</p>
        )}
    {/* Simple Rating Form */}
    <form onSubmit={handleRatingSubmit} className="mt-2">
          <div className="d-flex">
            <input
              type="number"
              className="form-control me-2"
              placeholder="1-5"
              value={userRating}
              onChange={(e) => setUserRating(e.target.value)}
              min="1"
              max="5"
              style={{ width: '80px' }}
            />
            <button type="submit" className="btn btn-sm btn-primary">Rate</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Movie;