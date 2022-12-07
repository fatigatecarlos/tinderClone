import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authRequest, axiosRequest} from '../../../api/authService';
import {UserState, User, Position, RequestParam} from '../../../utils/Types';

const initialState: UserState = {
  user: {
    userId: '',
    name: '',
    profileImage: '',
    ageRange: {
      min: 18,
      max: 90,
    },
    maxDistance: 5,
    selectedGender: 'both',
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
  const response = await authRequest('POST', 'auth/register', param);
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
  const response = await authRequest('POST', 'auth/login', param);
  console.log();
  if (response.kind === 'success') {
    return {token: response.body.token ?? ''};
  }

  throw new Error('Sorry! We can create you account now, try again later.');
});

export const getUsers = createAsyncThunk<
  {users: Array<User>},
  {param: Position}
>('getUsers', async param => {
  const response = await authRequest('POST', 'users', param);

  if (response.kind === 'success') {
    return {users: response.body ?? ''};
  }

  throw new Error('Sorry! We can create you account now, try again later.');
});

export const saveConfigurations = createAsyncThunk<{user: User}, {param: User}>(
  'saveConfigurations',
  async (param: User) => {
    const response = await authRequest('PUT', 'me/' + param.userId, param);

    if (response.kind === 'success') {
      return {user: response.body ?? ''};
    }

    throw new Error('Sorry! We can create you account now, try again later.');
  },
);

export const getProfile = createAsyncThunk<{user: UserState}, {token: string}>(
  'getProfile',
  async (token: string) => {
    console.log('getProfile');
    const response = await axiosRequest('GET', 'me', null, token);
    console.log('getProfile');
    console.log(response);
    if (response.kind === 'success') {
      return {users: response.body ?? ''};
    }

    throw new Error('Sorry! We can create you account now, try again later.');
  },
);

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
    builder
      .addCase(saveConfigurations.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(saveConfigurations.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.error = false;
      })
      .addCase(saveConfigurations.rejected, state => {
        state.loading = false;
        state.error = true;
      });
    builder
      .addCase(getProfile.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.error = false;
      })
      .addCase(getProfile.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default userSlice.reducer;
