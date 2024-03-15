import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/nowPlaying';
import NowPlaying from './pages/nowPlaying';
import Detail from './pages/detail';
import Ticket from './pages/ticket';
import MainLayout from './components/MainLayout';
import MyTicket from './pages/myTicket';

// import './App.css'

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register/>,
    loader:() => {
      if (localStorage.access_token) {
        return redirect('/now-playing')
      }
      return redirect("/login");
    },
  },
  {
    path: "/login",
    element: <Login/>,
    loader:() => {
      if (localStorage.access_token) {
        return redirect('/now-playing')
      }
      return null
    },
    
    
  },
  {
    element : <MainLayout/>,
    children:[
      {
        path : '/',
        element: <div>home</div>
      },
      {
        path : '/now-playing',
        element: <NowPlaying/>
      },
      {
        path : '/movie/detail/:id',
        element: <Detail/>
      },
      
    ]
  },
  {element : <MainLayout/>,
    loader:() => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children:[
      {
        path : '/ticket/:ticketId',
        element: <Ticket/>
      },
      {
        path : '/my-ticket',
        element: <MyTicket/>
      },
    ]
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
