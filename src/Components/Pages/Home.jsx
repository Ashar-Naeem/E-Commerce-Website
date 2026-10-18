import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { addToCart, deleteCart } from "../Redux/CartSlice";
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
    let [product, setproduct] = useState([]);
    let getProducts = () => {
        axios.get('https://dummyjson.com/products')
            .then((res) => res.data.products)
            .then(finalRes => {
                setproduct(finalRes);
            })
    }
    useEffect(() => {
        getProducts();
    }, []);


    return (
        <section className="py-5">
            <h1 className="text-center text-3xl font-bold">
                Our Products
            </h1>

            <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {product.map((obj) => (
                    <Products data={obj} key={obj.id} />
                ))}
            </div>
            <ToastContainer />
        </section>
    );

}

export default Home;


function Products({ data }) {
    const { title, price, description, thumbnail, rating, id ,quantity} = data;

    const cart = useSelector((mydata) => mydata.cart.cart);

    let checkItemInCart = cart.find((obj) => obj.id == id);


    let dispatch = useDispatch();
    const addToCartItem = () => {
        let cartObj = {
            title,
            price,
            thumbnail,
            description,
            id,
            quantity:1
        }
        dispatch(addToCart({ cartObj }))
        toast.success("Item Added into cart")
    }

    const removeItemFromCart = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {
                dispatch(deleteCart({ id }))
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

    }

    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Product Image */}
            <div className="relative flex h-56 items-center justify-center bg-gray-50 p-5">
                <span className="absolute left-3 top-3 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Featured
                </span>

                <img
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    src={thumbnail}
                    alt={title}
                    loading="lazy"
                />

                <button
                    type="button"
                    aria-label="Add to favorites"
                    className="absolute right-3 top-3 rounded-full bg-white p-2 text-gray-500 shadow-sm transition hover:bg-red-50 hover:text-red-500"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
                        />
                    </svg>
                </button>
            </div>

            {/* Product Details */}
            <div className="flex flex-1 flex-col p-5">

                <div className="mb-2 flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-amber-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.5Z" />
                            </svg>
                        ))}
                    </div>

                    <span className="text-sm font-semibold text-gray-800">
                        {rating ?? "N/A"}
                    </span>
                    <span className="text-xs text-gray-500">
                        Customer rating
                    </span>
                </div>

                <h2 className="mb-2 line-clamp-2 text-lg font-bold leading-6 text-gray-900 transition-colors group-hover:text-blue-700">
                    {title}
                </h2>

                <p className="mb-4 line-clamp-2 text-sm leading-5 text-gray-600">
                    {description}
                </p>

                {/* Price and Button */}
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                    <div>
                        <p className="text-xs font-medium text-gray-500">
                            Price
                        </p>
                        <p className="text-2xl font-extrabold text-gray-900">
                            ${Number(price).toFixed(2)}
                        </p>
                    </div>
                    {
                        checkItemInCart ?
                            <button
                                onClick={removeItemFromCart}
                                type="button"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3h2l2.5 12h10.8l2-8H6M10 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                    />
                                </svg>
                                Remove Cart
                            </button> :
                            <button
                                onClick={addToCartItem}
                                type="button"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3h2l2.5 12h10.8l2-8H6M10 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                    />
                                </svg>
                                Add to cart
                            </button>
                    }

                </div>
            </div>
        </div>
    );
}
