import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchAllProducts,
  fetchProductById,
  fetchProductsByFilter,
} from './productAPI';

const initialState = {
  loading: false,
  products: [],
  error: null,
  selectedProduct: null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async id => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  'product/fetchProductsByFilter',
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilter(filter, sort, pagination);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: builder => {
    // fetch all products.
    builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      state.loading = false;
    });

    // fetch products by filter.
    builder.addCase(fetchProductsByFilterAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProductsByFilterAsync.rejected, (state, action) => {
      state.loading = false;
    });

    // fetch product by id.
    builder.addCase(fetchProductByIdAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
    });
    builder.addCase(fetchProductByIdAsync.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const selectAllProducts = state => state.product.products;
export const selectSelectedProduct = state => state.product.selectedProduct;
export default productSlice.reducer;
