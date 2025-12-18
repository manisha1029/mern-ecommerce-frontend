import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUser, fetchLoggedInUserOrders, updateUser } from './userAPI';

const initialState = {
  orders: [],
  status: 'idle',
  userInfo: null,
};

export const fetchUserOrdersAsync = createAsyncThunk(
  'user/fetchUserOrders',
  async userId => {
    const response = await fetchLoggedInUserOrders(userId);
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async userId => {
    const response = await fetchLoggedInUser(userId);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async newUser => {
    const response = await updateUser(newUser);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserOrdersAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
  },
});

export const selectUserInfo = state => state.user.userInfo;
export const selectUserOrders = state => state.user.orders;
export const selectUserOrdersStatus = state => state.user.status;

export default userSlice.reducer;
