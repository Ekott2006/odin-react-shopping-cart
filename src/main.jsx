import "./css/reset.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Shop from "./pages/Shop.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Home from "./pages/Home.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// / -- HomePage
// /products -- All List
// products/category/:category -- List per category
// products/:id -- Category Details

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async ({ request }) => {
      const res = await fetch("https://fakestoreapi.com/products", {
        signal: request.signal,
      });
      return await res.json();
    },
    errorElement: <ErrorBoundary />,
    children: [
      { path: "", element: <Home /> },
      { path: "products", element: <Shop /> },
      { path: "products/:id", element: <ProductDetail /> },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
