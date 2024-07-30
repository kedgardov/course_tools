// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { loginForm_t } from '../../models/forms/login';
// const API_ROUTE : string = 'http://132.145.196.46/api/';

// interface credentialsCorrect

// export const tryLogin = createAsyncThunk(
//     'login/tryLogin',
//     async (loginData: loginForm_t, { rejectWithValue }) => {
//         try {
//             const { data, status } = await axios.post<boolean>(
//                 API_ROUTE+'login/login',{
//                     loginData,
//                 },{
//                     withCredentials: true,
//                 }
//             );
//             if( data !== true ){
//                 rejectWithValue('Credenciales Incorrectas');
//             }
//         } catch (error) {
//             rejectWithValue('Problemas con el internet');
//         }
//     }
// );
