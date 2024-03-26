import {configureStore} from '@reduxjs/toolkit';
import globalReducer from './globalReducer';
import {clientApi} from '../API/ClientApi';
export const store = configureStore({
  reducer: {
    global: globalReducer, // global is the name of the reducer
    [clientApi.reducerPath]: clientApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(clientApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
