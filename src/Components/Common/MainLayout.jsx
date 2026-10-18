import { Provider } from "react-redux"
import Footer from "./Footer"
import Header from "./Header"
import { Outlet } from "react-router-dom"
import { store } from "../Redux/store.js"
const MainLayout = () => {
    return (
        <Provider store={store}>
            <Header />
            <Outlet />
            <Footer />
        </Provider>
    )
}

export default MainLayout;