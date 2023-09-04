import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  locale: string
}

const initialState: IState = {
  locale: 'en',
};

export default createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
  },
});
