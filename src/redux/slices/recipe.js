import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchRecipe = createAsyncThunk('/recipes/fetchRecipe', async () => {
    const {data} = await axios.get('/recipes');
    return data;
})

export const fetchRemoveRecipe = createAsyncThunk('/recipes/fetchRemoveRecipe', async (id) => {
    await axios.delete(`/recipes/${id}`);
})

const initialState = {
    recipes: {
        items: [],
        status: 'loading'
    }
};

const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchRecipe.pending, (state) => {
          state.recipes.items = [];
          state.recipes.status = 'loading';
        })
        .addCase(fetchRecipe.fulfilled, (state, action) => {
          state.recipes.items = action.payload;
          state.recipes.status = 'loaded';
        })
        .addCase(fetchRecipe.rejected, (state) => {
          state.recipes.items = [];
          state.recipes.status = 'error';
        })
  
        .addCase(fetchRemoveRecipe.pending, (state, action) => {
          state.recipes.items = state.recipes.items.filter((obj) => obj._id !== action.meta.arg);
        });
    },
  });

export const recipesReducer = recipeSlice.reducer;