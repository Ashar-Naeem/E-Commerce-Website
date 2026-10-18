import { createSlice } from "@reduxjs/toolkit";

const CartSlicer = createSlice(
    {
        name: "cart",
        initialState: {
            cart: localStorage.getItem("CART") ? JSON.parse(localStorage.getItem("CART")) : [],
        },
        reducers: {
            addToCart: (state, req) => {
                let { cartObj } = req.payload;

                state.cart.push(cartObj);
                localStorage.setItem("CART", JSON.stringify(state.cart));
            },
            deleteCart: (state, req) => {
                let { id } = req.payload;
                state.cart = state.cart.filter((object) => object.id != id);
                localStorage.setItem("CART", JSON.stringify(state.cart));
            },
            changeQuantity: (state) => {

            }
        },



    }

)

export const { addToCart, deleteCart, changeQuantity } = CartSlicer.actions
export default CartSlicer.reducer