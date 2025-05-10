import { createBrowserRouter } from "react-router-dom";
import Bills from "../Pages/Bills";
import MainLayout from "../Layouts/MainLayout";
import MyProfile from "../Components/Profile/MyProfile";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import BillDetails from "../Pages/BillsDetails";

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, element: <Home /> },
      { path: '/bills', element: <PrivateRoutes><Bills /></PrivateRoutes> },
      { path: 'bill/:id', element: <PrivateRoutes><BillDetails /></PrivateRoutes> },
      { path: '/profile', element: <PrivateRoutes><MyProfile /></PrivateRoutes> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
]);

export default router;
