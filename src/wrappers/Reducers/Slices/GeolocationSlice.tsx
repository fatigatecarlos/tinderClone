import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authRequest} from '../../../api/authService';
import {Position, PositionState} from '../../../utils/Types';

const initialState: PositionState = {
  position: {
    lat: 0,
    long: 0,
  },
  loading: false,
  error: false,
};

export const setPosition = createAsyncThunk<
  {position: Position},
  {param: Position}
>('setNewPosition', async ({param}) => {
  const response = await authRequest('/geolocation/add', param);
  if (response.kind === 'success') {
    return {user: response.body ?? {}};
  }

  throw new Error('Sorry! We can create you account now, try again later.');
});

const positionSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setPosition.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(setPosition.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.loading = false;
      })
      .addCase(setPosition.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default positionSlice.reducer;
