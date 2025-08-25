import "tailwindcss";
import './App.css';
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
import Companies from "./components/admin/companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import { setUser } from "./redux/authSlice";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";

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

  //admin ke liy yha se start hoga
  {
    path:'/admin/companies',
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:'/admin/companies/create',
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },
  {
    path:'/admin/companies/:id',
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
  {
    path:'/admin/jobs',
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
  {
    path:'/admin/jobs/create',
    element:<ProtectedRoute><PostJob/></ProtectedRoute>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
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
