import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import css from './Favorites.module.css'

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

  // Обновление состояния Redux при авторизации
  useEffect(() => {
    if (isAuth) {
      const savedFavorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)); 
      if (savedFavorites) {
        dispatch(clearFavorites()); 
        savedFavorites.forEach(recipe => {
          dispatch(addToFavorites({ recipe }));
        });
      }
    }
  }, [dispatch, isAuth, userId]);

  return (
    <div className={css.favorites}>
      <h1 className={css.favorites_title}>Favorites</h1>
      {!isAuth && (
        <div className={css.message}>
          <p className={css.page_link}>Please <Link className={css.link} to="/login">log in</Link> to view and add favorite recipes.</p>
        </div>
      )}
      {isAuth && favorites.length === 0 ? (
        <div className={css.message}>
          <p className={css.page_link}>No favorite recipes yet. <Link className={css.link} to="/">Browse recipes</Link></p>
        </div>
      ) : (
        <div className={css.favorites_list}>
          {favorites.map(recipe => (
            <Recipe
              key={recipe._id}
              id={recipe._id}
              title={recipe.title}
              description={recipe.description}
              imageUrl={recipe.imageUrl}
              user={recipe.user}
              createdAt={recipe.createdAt}
              isLoading={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};