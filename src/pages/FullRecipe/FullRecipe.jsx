import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import css from "./FullRecipe.module.css"; 

export const FullRecipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`/recipes/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error('Failed to fetch recipe:', error);
            }
        };
        fetchRecipe();
    }, [id]);

    if (!recipe) {
        return <div>Loading</div>;
    }

    return (
        <div className={css.container}>
            <h1 className={css.title}>{recipe.title}</h1>
            {recipe.imageUrl && (
                <img className={css.image} src={`http://localhost:3001${recipe.imageUrl}`} alt={recipe.title} />
            )}
            <div>
                <p className={css.description}><span className={css.recipeItem}>Description: </span>{recipe.description}</p>
                <div className={css.ingredientsBlock}>
                    <p className={css.ingredientsTitle}><span className={css.recipeItem}>Ingredients: </span></p>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className={css.ingredients}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <p className={css.instructions}><span className={css.recipeItem}>Instructions: </span>{recipe.instructions}</p>
                <p className={css.prep_time}><span className={css.recipeItem}>Prep Time: </span>{recipe.prep_time}</p>
                <p className={css.cook_time}><span className={css.recipeItem}>Cook Time: </span>{recipe.cook_time}</p>
                <p className={css.total_time}><span className={css.recipeItem}>ITotal Time: </span>{recipe.total_time}</p>
                <p className={css.servings}><span className={css.recipeItem}>Servings: </span>Servings: {recipe.servings}</p>
                <p className={css.difficulty}><span className={css.recipeItem}>Difficulty: </span>{recipe.difficulty}</p>
                <div className={css.nutritionalInfoBlock}>
                    <p className={css.nutritionalInfoTitle}><span className={css.recipeItem}>Nutritional Info: </span></p>
                    <ul>
                        {recipe.nutritional_info.map((info, index) => (
                            <li key={index} className={css.nutritionalInfo}>{info}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
