import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
       status: 'checking',
       uid: null,
       email: null,
       displayName: null,
       photoUrl: null,
       errorMesage: null,
   },
   reducers: {
       login: (state, action)=>{


       },
       logout: (state, payload)=>{

       },
       chekingCredencials: (state)=>{

       }
   }
});


// Action creators are generated for each case reducer function
export const { login, logout, chekingCredencials } = authSlice.actions;