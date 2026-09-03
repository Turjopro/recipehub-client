import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content p-10">
      <aside>
        <Link to="/" className="text-2xl font-bold">RecipeHub</Link>
        <p className="max-w-md">
          Discover, share and cook delicious recipes from food lovers around the world.
        </p>
        <p>Contact: support@recipehub.com | +880 1XXX-XXXXXX</p>
      </aside>

      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link to="/">Home</Link>
          <Link to="/browse-recipes">Browse Recipes</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>

      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="#" aria-label="Facebook">Facebook</a>
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="Twitter">Twitter</a>
        </div>
      </nav>

      <aside>
        <p>Copyright © {new Date().getFullYear()} - RecipeHub. All rights reserved.</p>
      </aside>
    </footer>
  );
};

export default Footer;