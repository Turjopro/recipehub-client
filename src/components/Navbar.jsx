import { Link, NavLink, useNavigate } from "react-router";
import { useSession, signOut } from "../lib/authClient";

const Navbar = () => {
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/browse-recipes">Browse Recipes</NavLink></li>
    </>
  );

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <Link to="/" className="text-xl font-bold">RecipeHub</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {links}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {isPending ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : session?.user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={session.user.image || "https://ui-avatars.com/api/?name=" + session.user.name}
                  alt={session.user.name}
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              <li className="menu-title">{session.user.name}</li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;