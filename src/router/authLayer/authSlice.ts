import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  isAuth: boolean
  unverifiedEmail: string
  token: string
  username: string
  auth0: any
}

const initialState: IState = {
  isAuth: false,
  unverifiedEmail: '',
  token: '',
  username: '',
  auth0: {},
};

export default createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth0: (state, action: PayloadAction<any>) => {
      state.auth0 = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setUnverifiedEmail: (state, action: PayloadAction<string>) => {
      state.unverifiedEmail = action.payload;
    },
  },
});
