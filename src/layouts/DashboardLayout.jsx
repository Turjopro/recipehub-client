import { Link, NavLink, Outlet } from "react-router";
import { useSession } from "../lib/authClient";

const DashboardLayout = () => {
  const { data: session } = useSession();

  const userLinks = (
    <>
      <li><NavLink to="/dashboard">Overview</NavLink></li>
      <li><NavLink to="/dashboard/my-recipes">My Recipes</NavLink></li>
      <li><NavLink to="/dashboard/add-recipe">Add Recipe</NavLink></li>
      <li><NavLink to="/dashboard/favorites">My Favorites</NavLink></li>
      <li><NavLink to="/dashboard/purchased">Purchased Recipes</NavLink></li>
      <li><NavLink to="/dashboard/profile">Profile</NavLink></li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-100 shadow-sm lg:hidden px-4">
          <label htmlFor="dashboard-drawer" className="btn btn-ghost drawer-button">
            ☰
          </label>
          <span className="text-lg font-bold ml-2">Dashboard</span>
        </div>
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-64 p-4">
          <li className="mb-4">
            <Link to="/" className="text-xl font-bold">RecipeHub</Link>
          </li>
          <li className="menu-title">{session?.user?.name || "Dashboard"}</li>
          {userLinks}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;