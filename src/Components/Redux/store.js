
import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import counterSlicer from "./counterSlicer";

export const store = configureStore({
    reducer: {
        cart: CartSlice,
        counterSlicer
    }
});
