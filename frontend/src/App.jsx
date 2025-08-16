import "tailwindcss";
import './App.css';
import Navbar from "./components/shared/navbar";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Home from "./components/Home";
import { Jobs } from "./components/JObs";
import Browse from "./components/Browse";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";

const appRouter = createBrowserRouter([

  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
])

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize Redux store with user data from localStorage on app load
    const storedUser = localStorage.getItem("job-user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("job-user"); // Clear corrupted data
      }
    }
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
