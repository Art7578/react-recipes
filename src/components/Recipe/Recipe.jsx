import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import css from './Recipe.module.css';
import { UserInfo } from '../UserInfo/UserInfo';
import { fetchRemoveRecipe } from '../../redux/slices/recipe';
import { addToFavorites, removeFromFavorites } from '../../redux/slices/favorites';

export const Recipe = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  description,
  children,
  isFullRecipe,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.data !== null);
  const favorites = useSelector(state => state.favorites.favorites);
  const userId = useSelector(state => state.auth.data?._id); 
  const [isFavorite, setIsFavorite] = useState(false); // Используем локальное состояние для отслеживания избранного рецепта

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)); 
    if (savedFavorites) {
      setIsFavorite(savedFavorites.some(recipe => recipe._id === id)); // Устанавливаем isFavorite в true, если рецепт находится в сохраненных избранных
    }
  }, [userId, id]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  const onClickRemove = () => {
    if (window.confirm('Are you sure you want to delete recipe?')) {
      dispatch(fetchRemoveRecipe(id));
    }
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites({ id }));
      setIsFavorite(false); // Обновляем локальное состояние и удаляем рецепт из избранных
      const updatedFavorites = favorites.filter(recipe => recipe._id !== id);
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(updatedFavorites)); 
    } else {
      dispatch(addToFavorites({ recipe: { _id: id, title, description, imageUrl } }));
      setIsFavorite(true); // Обновляем локальное состояние и добавляем рецепт в избранные
      const updatedFavorites = [...favorites, { _id: id, title, description, imageUrl }];
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(updatedFavorites)); 
    }
  };

  return (
    <div className={css.root + (isFullRecipe ? ' ' + css.rootFull : '')}>
      {isEditable && (
        <div className={css.editButtons}>
          <Link to={`/recipes/${id}/edit`}>
            <button className={css.button + ' ' + css.primaryButton}>
              Edit
            </button>
          </Link>
          <button onClick={onClickRemove} className={css.button + ' ' + css.secondaryButton}>
            Delete
          </button>
        </div>
      )}
      {imageUrl && (
        <img
          className={css.image + (isFullRecipe ? ' ' + css.imageFull : '')}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={css.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={css.indention}>
          <h2 className={`${css.title} ${isFullRecipe ? '' : css.ellipsis}`} style={{ width: isFullRecipe ? 'auto' : '450px' }}>
            {isFullRecipe ? title : <Link to={`/recipes/${id}`}>{title}</Link>}
          </h2>
          {children && <div className={css.content}>{children}</div>}
          <span className={css.postDetails}>{description}</span>
        </div>
        {isAuth && (
          <button className={`${css.favoriteButton} ${isFavorite ? css.favoriteButtonRemove : css.favoriteButtonAdd}`} onClick={toggleFavorite}>
          {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </button>
        )}
      </div>
    </div>
  );
};