
import { createSlice, } from '@reduxjs/toolkit';
import axios from 'axios';

const UserSlice = createSlice({
    name: 'users',
    initialState: {
        loading:false,
        showPassword:false,
        generatePage: false
    },
    reducers: {
        setLoading:(state,action)=>{
            state.loading = action.payload
        },
        setShowPassword:(state,action)=>{
            state.showPassword = action.payload;
          },
          setGeneratePage:(state,action)=>{
            state.generatePage =  action.payload;
        
          }
    },
    
});
export const {setLoading,setShowPassword,setGeneratePage} =  UserSlice.actions
export default UserSlice.reducer;