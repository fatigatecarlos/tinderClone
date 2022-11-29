import {combineReducers, configureStore} from '@reduxjs/toolkit';
import UserSlice from './Slices/UserSlice';
import GeolocationSlice from './Slices/GeolocationSlice';

const rootReducer = combineReducers({
  user: UserSlice,
  geolocation: GeolocationSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
