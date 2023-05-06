import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { loggin } from './accessAPI';
import { register } from './accessAPI';
import userType from './userType'; //username and password
import newuserType from './newuserType';

export interface AccessState {
  logged: boolean;
  token: string;
  logmessage: string;
  registermessage: string;
  registerStatus: boolean;

}

const token = sessionStorage.getItem('token')
const initialState: AccessState = {
    logged: !!token, // the !! sign converts token to truthy/falsy value, so if token is undefined or its length is zero that means token thruthy false is FALSE, and therfore logged will be false
    token: '',
    logmessage: '',
    registermessage: '',
    registerStatus: false,

};


export const logginAsync = createAsyncThunk(
  'access/loggin',
  async (user: userType) => {
    console.log(user.username +' '+ user.password + ' @clg from the logginAsync')
    const response = await loggin(user);
    return response.data;
  }
);

export const registerAsync = createAsyncThunk(
  'access/register',
  async (newuser: newuserType) => {
    console.log(newuser.username +' '+ newuser.email + newuser.password + ' @clg from the registerAsync')
    const response = await register(newuser);
    return response.data;
  }
);


export const accessSlice = createSlice({
  name: 'access',
  initialState,
  reducers: {
    logout: (state) => {
        console.log('logged out')
        state.logged = false
        state.token = ''
        sessionStorage.setItem('token', state.token)
        state.logmessage = ''
        
    },
    
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    // //   state.value += action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(logginAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.logged = true
        state.token = action.payload.access
        sessionStorage.setItem('token', state.token)
        console.log(action.payload.access+' @clg from the builder')
        console.log('@logged?: ' + state.logged)
        state.logmessage = 'Hello '
      })
      .addCase(logginAsync.rejected, (state, action) => {
        state.logmessage = 'Wrong input'

      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        console.log(action.payload) //  //the return in django of register is {"username": "someuser", "email": "someemail"}
        state.registermessage = 'Thank you for Registering ' + action.payload.email;
        state.registerStatus = true;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.registermessage = 'Register Failed'
        state.registerStatus = false;
      })
      
  },
});

export const { logout } = accessSlice.actions;

export const selectLoggedStatus = (state: RootState) => state.access.logged;
export const selectLogmessage = (state: RootState) => state.access.logmessage;
export const selectRegistermessage = (state: RootState) => state.access.registermessage;
export const selectRegisterStatus = (state: RootState) => state.access.registerStatus;




export default accessSlice.reducer;
