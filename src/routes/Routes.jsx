import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Layouts from "../Layouts/Layouts";
import HomePage from "../pages/HomePage";
import ClassesPage from "../pages/ClassesPage";
import InstructorsPage from "../pages/InstructorsPage";
import AuthPage from "../pages/Auth/AuthPage";
import LogInPage from "../pages/Auth/LogInPage";
import SignInPage from "../pages/Auth/SignInPage";
import Dashboards from "../pages/Dashboards/Dashboards";
import StudentDashboard from "../pages/Dashboards/StudentDashboard";
import InstructorDashboard from "../pages/Dashboards/InstructorDashboard";
import AdminDashboard from "../pages/Dashboards/AdminDashboard";
import AddClass from "../components/Dashboard/InstructorDashboard/AddClass";
import MyClasses from "../components/Dashboard/InstructorDashboard/MyClasses";
import ManageClasses from "../components/Dashboard/AdminDashboard/ManageClasses";
import ManageUsers from "../components/Dashboard/AdminDashboard/ManageUsers";
import MyEnrolledClasses from "../components/Dashboard/StudentDashboard/MyEnrolledClasses";
import MySelectedClasses from "../components/Dashboard/StudentDashboard/MySelectedClasses";
import PrivateRoute from "./PrivateRoute";
import Payment from "../components/Payments/Payment";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "classes",
        element: <ClassesPage />,
      },
      {
        path: "instructors",
        element: <InstructorsPage />,
      },
      {
        path: "payments",
        element: <Payment />
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "auth",
        element: <AuthPage />,
        children: [
          {
            path: "login",
            element: <LogInPage />,
          },
          {
            path: "signin",
            element: <SignInPage />,
          },
          {
            path: "*",
            element: <ErrorPage />,
          }
        ]
      },
      {
        path: "dashboard",
        element: <PrivateRoute> <Dashboards /></PrivateRoute>,
        children: [
          {
            path: "student",
            element: <StudentDashboard />,
            children: [
              {
                path: "my-selected-classes",
                element: <MySelectedClasses />,
              },
              {
                path: "my-enrolled-classes",
                element: <MyEnrolledClasses />,
              }
            ]
          },
          {
            path: "instructor",
            element: <InstructorDashboard />,
            children: [
              {
                path: "add-class",
                element: <AddClass />,
              },
              {
                path: "my-classes",
                element: <MyClasses />,
              }
            ]
          },
          {
            path: "admin",
            element: <AdminDashboard />,
            children: [
              {
                path: "manage-classes",
                element: <ManageClasses />,
              },
              {
                path: "manage-users",
                element: <ManageUsers />,
              }
            ]
          }
        ]
      }

    ],
  },
]);

export default router;