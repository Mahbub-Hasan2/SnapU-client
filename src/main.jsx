import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthContextProvider from './Layouts/AuthContextProvider'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes';
import '../src/Assets/styles/index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider >
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
)
