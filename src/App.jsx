import React from 'react';
import {createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Products from './Components/Products/Products';
import { AuthContextProvider } from './Context/AuthContextProvider';
import Cart from './Components/Cart/Cart';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Catagories from './Components/Categories/Catagories';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { CartContextProvider } from './Context/CartContextProvider';
import { Toaster } from 'react-hot-toast';
import Error from './Components/Error/Error';
import { Offline } from "react-detect-offline";


const myRouter = createHashRouter([
  { path: "/", element: <Layout />, children: [
    { path:"", element: <Products /> },
    { path:"products", element: <Products /> },
    { path:"cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute>},
    { path:"catagories", element: <ProtectedRoute> <Catagories /> </ProtectedRoute>},
    { path:"productdetails/:id", element: <ProtectedRoute>  <ProductDetails />  </ProtectedRoute>},
    { path:"login", element: <Login /> },
    { path:"register", element: <Register /> },
    { path:"*", element: <Error /> },
  ]}
])

function App() {

  const queryClient = new QueryClient();

  return <>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <CartContextProvider>
              <RouterProvider router={myRouter} />
            </CartContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
        <Toaster position='top-center' />
        <Offline>
          <div className='d-flex justify-content-center'>
            <div className='w-25 mt-3  bg-white p-2  shadow d-flex align-items-center justify-content-center rounded-4  position-fixed top-0'>
              <i className="fa-solid fa-2x fa-xmark text-danger"></i>
              <h5 className='ms-2 mt-2'>You Are Offline Now.</h5>
            </div>
          </div>
        </Offline>
  </>
}

export default App;

