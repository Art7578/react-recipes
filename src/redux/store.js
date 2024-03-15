import { configureStore } from "@reduxjs/toolkit";
import { recipesReducer } from "./slices/recipe";
import { authReducer } from "./slices/auth";
import { favoritesReducer } from "./slices/favorites";

const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        auth: authReducer,
        favorites: favoritesReducer
    },
});

export default store;