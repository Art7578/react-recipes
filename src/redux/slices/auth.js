import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const {data} = await axios.post('/auth/login', params);
    return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const {data} = await axios.post('/auth/register', params);
    return data;
});

const initialState = {
    data: JSON.parse(localStorage.getItem('userData')) || null, // Проверяем наличие данных в локальном хранилище
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            localStorage.removeItem('userData'); // Удаляем данные из локального хранилища при выходе
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAuth.pending, (state) => {
            state.status = 'loading';
            state.data = null;
        })
        .addCase(fetchAuth.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
            localStorage.setItem('userData', JSON.stringify(action.payload)); // Сохраняем данные в локальное хранилище при успешной аутентификации
        })
        .addCase(fetchAuth.rejected, (state) => {
            state.status = 'error';
            state.data = null;
        })
        .addCase(fetchRegister.pending, (state) => {
            state.status = 'loading';
            state.data = null;
        })
        .addCase(fetchRegister.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
            localStorage.setItem('userData', JSON.stringify(action.payload)); // Сохраняем данные в локальное хранилище при успешной регистрации
        })
        .addCase(fetchRegister.rejected, (state) => {
            state.status = 'error';
            state.data = null;
        })
    }
});

export const selectIsAuth = state => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions;