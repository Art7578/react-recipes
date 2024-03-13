import { configureStore } from "@reduxjs/toolkit";
import { recipesReducer } from "./slices/recipe";
import { authReducer } from "./slices/auth";

const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        auth: authReducer,
    },
});

export default store;