import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import authSlice from 'src/router/authLayer/authSlice';
import themeSlice from 'src/router/themeLayer/themeSlice';

const store = configureStore({
  reducer: {
    authReducer: authSlice.reducer,
    themeReducer: themeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        'authSlice/setAuth0',
      ],
      ignoredPaths: [
        'authReducer.auth0',
      ],
    },
  }),
});

type AppState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
type IAppDispatch = () => AppDispatch;

export const useAppDispatch: IAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const authActions = authSlice.actions;
export const themeActions = themeSlice.actions;
export default store;
