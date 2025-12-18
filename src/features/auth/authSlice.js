import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signup, checkUser, signOut  } from './authAPI';
import { updateUser } from '../user/userAPI';

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

export const updateUserAsync = createAsyncThunk(
  'auth/updateUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await updateUser(user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error || 'Update failed');
    }
  }
);

export const signOutAsync = createAsyncThunk(
  'auth/signOut',
  async (userId, { rejectWithValue }) => {
    const response = await signOut(userId);
    return response.data;
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

    // Updating user.
    builder.addCase(updateUserAsync.pending, state => {
      state.status = 'loading';
    });

    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'success';
    });

    builder.addCase(updateUserAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.status = 'error';
    });

    // Signing out.
    builder.addCase(signOutAsync.pending, state => {
      state.status = 'loading';
    });
    
    builder.addCase(signOutAsync.fulfilled, (state, action) => {
      state.user = null;
      state.status = 'User logged out successfully';
    });
  },
});

export const selectLoggedInUser = state => state.auth.user;
export const selectLoggedInUserError = state => state.auth.error;
export const selectLoggedInUserStatus = state => state.auth.status;

export default authSlice.reducer;
