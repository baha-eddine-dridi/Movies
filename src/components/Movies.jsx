import Movie from './Movie.jsx'; // Importer le composant fils
import {fetchMovies} from './api.jsx'; // Importer les fonctions d'API
import React, { useEffect, useState } from 'react';


const Movies = () => {


    //use state
    const [Movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

     //searchTerm : pour stocker la valeur de l'input de recherche
     //filteredMovies : pour stocker les films filtrés après une recherche
      const [searchTerm, setSearchTerm] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]); 

    // Fonction pour charger/recharger les propriétés

useEffect(() => {
    loadMovies();
  }, []);

const loadMovies= async () => {
    try {
      setLoading(true);
      const data = await fetchMovies();

       // Initialize ratings array if not present
       const moviesWithRatings = data.map(movie => ({
        ...movie,
        ratings: movie.ratings || []
    }));

      setMovies(moviesWithRatings);
      setFilteredMovies(moviesWithRatings); // Initialiser les films filtrés avec tous les films
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour rechercher les films
const handleSearch = (e) => {
    e.preventDefault(); // Empêcher le rafraîchissement de la page
    
    if (searchTerm.trim() === '') {
      // Si la recherche est vide, afficher tous les films
      setFilteredMovies(Movies);
    } else {
      // Sinon, filtrer les films par titre (recherche insensible à la casse)
      const results = Movies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(results);
    }
  };

    // Function to update movie rating (to be passed to Movie component)
    const updateMovieRating = (movieId, newRating) => {
        const updatedMovies = Movies.map(movie => {
            if (movie.id === movieId) {
                const updatedRatings = [...(movie.ratings || []), newRating];
                return { ...movie, ratings: updatedRatings };
            }
            return movie;
        });
        
        setMovies(updatedMovies);
        
        // Also update filtered movies to reflect the changes
        setFilteredMovies(updatedMovies.filter(movie => 
            searchTerm.trim() === '' || 
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    };
    
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return(

    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>

         {/* Barre de recherche */}
      <div style={{ marginBottom: '30px' }}>
        <form onSubmit={handleSearch} className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

 {/* Message si aucun résultat */}
 {!loading && filteredMovies.length === 0 && (
        <div className="alert alert-warning text-center">No result found</div>
      )}

     {/* Affichage des movies */}
     {filteredMovies.map((movie) => (
        <Movie  //fils
          key={movie.id}
          movie={movie}
          
        
        />
      ))}
       </div>



);
  

};

export default Movies;