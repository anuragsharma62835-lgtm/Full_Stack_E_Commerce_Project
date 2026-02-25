import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/appSlice";
import cartReducer from "../features/cartSlice/cartSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    cart: cartReducer,
  },
});

export default store;