import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from '../pages/register';
// import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register/>,
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
