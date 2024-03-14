import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/nowPlaying';
import NowPlaying from './pages/nowPlaying';
import Detail from './pages/detail';
import Ticket from './pages/ticket';
import MainLayout from './components/MainLayout';
// import './App.css'

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    element : <MainLayout/>,
    children:[
      {
        path : '/now-playing',
        element: <NowPlaying/>
      },
      {
        path : '/movie/detail/:id',
        element: <Detail/>
      },
      {
        path : '/movie/ticket/:id',
        element: <Ticket/>
      },
    ]
  }
  // {
  //   element: <div>element parent</div>,
  //   loader:() => {
  //     if (!localStorage.access_token) {
  //       return redirect("/login");
  //     }
  //     return null;
  //   },
  //   // children:[
  //   //   {
  //   //     path : '/',
  //   //     element: <Home/>
  //   //   }
  //   // ]
  // },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
