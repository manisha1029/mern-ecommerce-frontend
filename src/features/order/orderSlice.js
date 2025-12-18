import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './orderAPI';

const initialState = {
  orders: [],
  loading: false,
  error: null,
  currentOrder: null,
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async order => {
    const response = await createOrder(order);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetCurrentOrder: state => {
      state.currentOrder = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createOrderAsync.pending, state => {
        state.loading = true;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.orders.push(action.payload);
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectCurrentOrder = state => state.order.currentOrder;
export const selectOrders = state => state.order.orders;

export const { resetCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer;
