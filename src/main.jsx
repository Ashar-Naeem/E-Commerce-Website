import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home.jsx';
import Cart from './Components/Pages/Cart.jsx'
import MainLayout from './Components/Common/MainLayout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>

  </StrictMode>,
)
