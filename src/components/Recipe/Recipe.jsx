import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import css from './Recipe.module.css';
import { UserInfo } from '../UserInfo/UserInfo';
import { fetchRemoveRecipe } from '../../redux/slices/recipe';

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

  if (isLoading) {
    return <div>Loading</div>;
  }

  const onClickRemove = () => {
    if (window.confirm('Are you sure you want to delete recipe?')) {
      dispatch(fetchRemoveRecipe(id));
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
            {isFullRecipe ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          {children && <div className={css.content}>{children}</div>}
          <span className={css.postDetails}>{description}</span>
        </div>
      </div>
    </div>
  );
};