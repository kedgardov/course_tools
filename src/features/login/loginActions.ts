import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginForm_t } from '../../models/forms/login';

export const tryLogin = createAsyncThunk(
    'login/tryLogin',
    async (loginData: loginForm_t, { rejectWithValue }) => {
        try {

        } catch (error) {

        }
    }

);
