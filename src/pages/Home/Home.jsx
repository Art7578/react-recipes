import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './Home.module.css';

import { Recipe } from '../../components/Recipe/Recipe';
import { fetchRecipe } from '../../redux/slices/recipe';

export const Home = () => {
  const dispatch = useDispatch();
  const { recipes } = useSelector(state => state.recipes);
  const userData = useSelector(state => state.auth.data);

  const isRecipeLoading = recipes.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchRecipe());
  }, [dispatch]);


  return (
    <div className={css.container}>
      <div className={css.gridContainer}>
        <div className={css.gridItem}>
        {(isRecipeLoading ? [...Array(5)] : recipes.items).map((obj, index) =>
            isRecipeLoading ? (
              <Recipe key={index} isLoading={true} />
            ) : (
              <Recipe
                key={obj._id}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:3001${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                description={obj.description}
                ingredients={obj.ingredients}
                instructions={obj.instructions}
                prep_time={obj.prep_time}
                cook_time={obj.cook_time}
                total_time={obj.total_time}
                servings={obj.servings}
                difficulty={obj.difficulty}
                nutritional_info={obj.nutritional_info}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};