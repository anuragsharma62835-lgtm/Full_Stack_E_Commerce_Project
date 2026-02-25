import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const loadUserCart = createAsyncThunk(
  "cart/loadUserCart",
  async () => {
    const { data } = await API.get("/cart/");
    return data.items || [] ;
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product) => {
    const { data } = await API.post("/cart/add", {
      productId: product._id,
    });
    return data.items || [];
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId) => {
    const { data } = await API.delete(`/cart/${productId}`);
    return data.items;
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async () => {
    await API.delete("/cart/");
    return [];
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(loadUserCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;