import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authRequest} from '../../../api/authService';
import {UserState, User, Position, RequestParam} from '../../../utils/Types';

const initialState: UserState = {
  user: {
    user_id: '',
    name: '',
  },
  users: [],
  token: '',
  loading: false,
  error: false,
};

export const registerUser = createAsyncThunk<{
  name: string;
  token: string;
  param: RequestParam;
}>('registerUser', async param => {
  const response = await authRequest('auth/register', param);
  console.log(response);
  if (response.kind === 'success') {
    console.log(response.body);
    return {name: response.body.name, token: response.body.token};
  }

  throw new Error('Sorry! We can create you account now, try again later.');
});

export const loginUser = createAsyncThunk<
  {token: string},
  {param: RequestParam}
>('loginUser', async param => {
  const response = await authRequest('auth/login', param);

  if (response.kind === 'success') {
    return {token: response.body.token ?? ''};
  }

  throw new Error('Sorry! We can create you account now, try again later.');
});

export const getUsers = createAsyncThunk<
  {users: Array<User>},
  {param: Position}
>('getUsers', async param => {
  const response = await authRequest('users', param);

  if (response.kind === 'success') {
    return {users: response.body.users ?? ''};
  }

  throw new Error('Sorry! We can create you account now, try again later.');
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(registerUser.rejected, state => {
        state.loading = false;
        state.error = true;
      });
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(loginUser.rejected, state => {
        state.loading = false;
        state.error = true;
      });
    builder
      .addCase(getUsers.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.loading = false;
      })
      .addCase(getUsers.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default userSlice.reducer;
