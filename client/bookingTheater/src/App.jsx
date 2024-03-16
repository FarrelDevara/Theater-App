
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Register from './pages/register';
import Login from './pages/login';
import NowPlaying from './pages/nowPlaying';
import Detail from './pages/detail';
import Ticket from './pages/ticket';
import MainLayout from './components/MainLayout';
import MyTicket from './pages/myTicket';
import {Provider} from 'react-redux'
import store from "../store";
import ForgetPassword from "./pages/forgetPassword";
import NewPassword from "./pages/formNewPassword";

import NavbarLogin from "./components/NavbarLogin";
// import './App.css'

const router = createBrowserRouter([
  {
    element : <NavbarLogin/>,
    loader:() => {
      if (localStorage.access_token) {
        return redirect('/now-playing')
      }
      return null
    },
    children : [
      {
        path: "/register",
        element: <Register/>,
        
      },
      {
        path: "/login",
        element: <Login/>,
        
      },
      {
        path: "/forget-password",
        element: <ForgetPassword/>,
      
      },
      {
        path: "/new-password/:id/:token",
        element: <NewPassword/>,
       
      },
    ]
  },
  {element : <MainLayout/>,
    children:[
      {
        path : '/ticket/:ticketId',
        element: <Ticket/>,
        loader:() => {
          if (!localStorage.access_token) {
            return redirect("/login");
          }
          return null;
        }
      },
      {
        path : '/my-ticket',
        element: <MyTicket/>,
        loader:() => {
          if (!localStorage.access_token) {
            return redirect("/login");
          }
          return null;
        }
      },
      {
        path : '/',
        element: <NowPlaying/>
      },
      {
        path : '/movie/detail/:id',
        element: <Detail/>
      },
    ]
  },
]);

function App() {

  return (
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  )
}

export default App
