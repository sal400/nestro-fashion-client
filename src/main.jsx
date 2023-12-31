import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./components/Root";
import HomePage from "./pages/HomePage";
import AuthProvider from "./providers/AuthProvider";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ErrorPage from "./pages/ErrorPage";
import AddProductPage from "./pages/AddProductPage";
import CartPage from "./pages/CartPage";
import Private from "./components/Private";
import UpdateProductPage from "./pages/UpdateProductPage";
import BrandPage from "./pages/BrandPage";
import ManageProduct from "./pages/ManageProduct";
import ProductDetailsPage from "./pages/ProductDetailsPage";




const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <HomePage />,
        loader: ()=> fetch(`https://nest-server-ten.vercel.app/brands`)
      },
      {
        path: '/brands/:id',
        element: <BrandPage />,
        loader: ({params})=> fetch(`https://nest-server-ten.vercel.app/brands/${params.id}`)
      },
      {
        path: '/products/:id',
        element: <Private><ProductDetailsPage /></Private>,
        loader: ({params})=> fetch(`https://nest-server-ten.vercel.app/products/${params.id}`)
      },
      {
        path: '/manage-product',
        element: <Private><ManageProduct /></Private>,
        loader: ()=> fetch(`https://nest-server-ten.vercel.app/products`)
      },
      {
        path: '/add-product',
        element: <Private><AddProductPage /></Private>,
      },
      {
        path: '/update-product/:id',
        element: <Private><UpdateProductPage /></Private>,
        loader: ({params})=> fetch(`https://nest-server-ten.vercel.app/products/${params.id}`)
      },
      {
        path: '/cart',
        element: <Private><CartPage /></Private>,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <RegistrationPage />,
      },
    ]
  }
])


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);