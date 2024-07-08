import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (category) => {
    let url = "";
    if (category) {
      url = `https://fakestoreapi.com/products/category/${category}`;
    } else {
      url = `https://fakestoreapi.com/products`;
    }
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { dispatch }) => {
    try {
      const response = await axios.delete(
        `https://fakestoreapi.com/products/${id}`
      );
      alert("Product Deleted");
      dispatch(fetchProducts());
    } catch (error) {
      throw error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (data) => {
    const { id, formData } = data;
    try {
      fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: formData?.title,
          price: formData?.price,
          description: formData?.description,
          image: formData?.image,
        }),
      })
        .then((res) => res.json())
        .then((json) => alert("Product added "));
    } catch (error) {
      throw error;
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/updateProduct",
  async (data) => {
    const { id, formData } = data;
    console.log(formData, "ahfgsadsjsagfjsfsj");
    try {
      fetch(`https://fakestoreapi.com/products`, {
        method: "POST",
        body: JSON.stringify({
          title: formData?.title,
          price: formData?.price,
          description: formData?.description,
          image: formData?.image,
        }),
      })
        .then((res) => res.json())
        .then((json) => alert("Product Updated "));
    } catch (error) {
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
