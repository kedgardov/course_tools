// import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../../app/store';

// import { tryLogin } from './loginActions';

// interface LoginState {
//     username: string;
//     password: string;
//     status: 'idle' | 'loading' | 'fulfilled' | 'rejected';
//     error: string | null;
// }

// const initialState: LoginState = {
//     username: '',
//     password: '',
//     status: 'idle',
//     error: null,
// }

// export const loginSlice = createSlice({
//     name:'login',
//     initialState,
//     reducers:{
//         setUsername: (state, action: PayloadAction<string>) => {
//             state.username = action.payload
//         },
//         setPassword: (state, action: PayloadAction<string>) => {
//             state.password = action.payload
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//         .addCase(tryLogin.pending, (state) => {
//             state.status = 'loading';
//             state.error = null;
//         })
//         .addCase(tryLogin.fulfilled, (state, action: PayloadAction<string>) => {
//             state.status = 'fulfilled';
//             state.error = null;
//             //will be adding statements that use action later
//         })
//         .addCase(tryLogin.rejected, (state, action: PayloadAction<string>) => {
//             state.status = 'rejected';
//             state.error = action.payload;
//         });
//     },
// })
