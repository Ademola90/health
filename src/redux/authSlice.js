import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { instance } from '../axiosConfig';

const baseURL = "https://healthbackend-2kaw.onrender.com"

// Async thunk for signup
export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await instance.post('/auth/signup', formData)
            console.log({ response })
            return { message: response.data.message, email: formData.email };
        } catch (error) {
            throw rejectWithValue(error.response?.data?.error || 'Signup failed');
        }
    }
);

// Async thunk for OTP verification
export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/auth/verify-otp', { email, otp });
            return response.data.token; // JWT token
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'OTP verification failed');
        }
    }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/auth/login', formData);
            return response.data.token; // JWT token
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        email: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.email = action.payload.email;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload);
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
