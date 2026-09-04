import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Home from "../pages/Home";
import BrowseRecipes from "../pages/BrowseRecipes";
import RecipeDetails from "../pages/RecipeDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import Overview from "../pages/dashboard/Overview";
import MyRecipes from "../pages/dashboard/MyRecipes";
import AddRecipe from "../pages/dashboard/AddRecipe";
import Favorites from "../pages/dashboard/Favorites";
import Purchased from "../pages/dashboard/Purchased";
import Profile from "../pages/dashboard/Profile";
import AdminOverview from "../pages/admin/AdminOverview";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageRecipes from "../pages/admin/ManageRecipes";
import Reports from "../pages/admin/Reports";
import Transactions from "../pages/admin/Transactions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "browse-recipes", element: <BrowseRecipes /> },
      { path: "recipe/:id", element: <RecipeDetails /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Overview /> },
      { path: "my-recipes", element: <MyRecipes /> },
      { path: "add-recipe", element: <AddRecipe /> },
      { path: "favorites", element: <Favorites /> },
      { path: "purchased", element: <Purchased /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AdminOverview /> },
      { path: "manage-users", element: <ManageUsers /> },
      { path: "manage-recipes", element: <ManageRecipes /> },
      { path: "reports", element: <Reports /> },
      { path: "transactions", element: <Transactions /> },
    ],
  },
]);

export default router;