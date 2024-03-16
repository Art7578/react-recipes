import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";

export const FullRecipe = () => {
    const {id} = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async() => {
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
        return <div>Error;</div>
    }

    return (
        <div>
            <h1>{recipe.title}</h1>
            {recipe.imageUrl && (
                <img src={`http://localhost:3001${recipe.imageUrl}`} alt={recipe.title} />
            )}
            <p>Description: {recipe.description}</p>
            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
            <p>Instructions: {recipe.instructions}</p>
            <p>Prep Time: {recipe.prep_time}</p>
            <p>Cook Time: {recipe.cook_time}</p>
            <p>Total Time: {recipe.total_time}</p>
            <p>Servings: {recipe.servings}</p>
            <p>Difficulty: {recipe.difficulty}</p>
            <p>Nutritional Info: {recipe.nutritional_info.join(', ')}</p>
        </div>
    );
};
