import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signup, checkUser } from './authAPI';

const initialState = {
  status: 'idle',
  error: null,
  user: null,
  token: null,
};

export const signupAsync = createAsyncThunk('auth/signup', async user => {
  const response = await signup(user);
  return response.data;
});

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await checkUser(loginInfo);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    // Signing up.
    builder.addCase(signupAsync.pending, state => {
      state.status = 'loading';
    });

    builder.addCase(signupAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'success';
    });

    builder.addCase(signupAsync.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = 'error';
    });

    // Logging in.
    builder.addCase(loginAsync.pending, state => {
      state.status = 'loading';
    });

    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'success';
    });

    builder.addCase(loginAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.status = 'error';
    });
  },
});

export const selectLoggedInUser = state => state.auth.user;
export const selectLoggedInUserError = state => state.auth.error;

export default authSlice.reducer;
