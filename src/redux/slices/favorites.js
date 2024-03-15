import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./auth";

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const { recipe } = action.payload;
      state.favorites.push(recipe);
    },
    removeFromFavorites: (state, action) => {
      const { id } = action.payload;
      state.favorites = state.favorites.filter((recipe) => recipe._id !== id);
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.favorites = [];
    });
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites.favorites;

export const favoritesReducer = favoritesSlice.reducer;