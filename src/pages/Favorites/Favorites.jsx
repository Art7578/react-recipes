import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Recipe } from '../../components/Recipe/Recipe';
import { selectFavorites, clearFavorites, addToFavorites } from '../../redux/slices/favorites';

export const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isAuth = useSelector(state => state.auth.data !== null);
  const userId = useSelector(state => state.auth.data?._id); 

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)); 
    if (savedFavorites) {
      dispatch(clearFavorites()); 
      savedFavorites.forEach(recipe => {
        dispatch(addToFavorites({ recipe }));
      });
    }
  }, [dispatch, userId]);

  return (
    <div>
      <h1>Favorites</h1>
      {!isAuth && (
        <p>Please <Link to="/login">log in</Link> to view and add favorite recipes.</p>
      )}
      {isAuth && favorites.length === 0 ? (
        <p>No favorite recipes yet. <Link to="/">Browse recipes</Link></p>
      ) : (
        <div>
          {favorites.map(recipe => (
            <Recipe
              key={recipe._id}
              id={recipe._id}
              title={recipe.title}
              description={recipe.description}
              imageUrl={recipe.imageUrl}
              user={recipe.user}
              createdAt={recipe.createdAt}
              isEditable={false}
              isLoading={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};