import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/recipes/featured`)
      .then((res) => res.json())
      .then((data) => setFeaturedRecipes(data));

    fetch(`${import.meta.env.VITE_API_URL}/recipes/popular`)
      .then((res) => res.json())
      .then((data) => setPopularRecipes(data));
  }, []);

  return (
    <div>
      {/* Banner Section */}
      <div className="hero bg-base-200 min-h-[70vh]">
        <div className="hero-content text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-md"
          >
            <h1 className="text-5xl font-bold">Cook, Share & Discover</h1>
            <p className="py-6">
              Join RecipeHub — a community of food lovers sharing their best recipes.
              Discover new dishes and share your own culinary creations with the world.
            </p>
            <Link to="/browse-recipes" className="btn btn-primary">Browse Recipes</Link>
          </motion.div>
        </div>
      </div>

      {/* Featured Recipes */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Recipes</h2>
        {featuredRecipes.length === 0 ? (
          <p className="text-center opacity-70">No featured recipes yet. Admin can feature recipes from Manage Recipes.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="card bg-base-100 shadow-md"
              >
                <div className="card-body">
                  <h3 className="card-title">{recipe.recipeName}</h3>
                  <p>Category: {recipe.category}</p>
                  <p>Cuisine: {recipe.cuisineType}</p>
                  <p>Prep Time: {recipe.preparationTime}</p>
                  <Link to={`/recipe/${recipe._id}`} className="btn btn-primary btn-sm mt-2">View Details</Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Popular Recipes */}
      <div className="max-w-7xl mx-auto px-4 py-16 bg-base-200">
        <h2 className="text-3xl font-bold text-center mb-10">Popular Recipes</h2>
        {popularRecipes.length === 0 ? (
          <p className="text-center opacity-70">No recipes yet. Be the first to add one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularRecipes.map((recipe) => (
              <div key={recipe._id} className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <h3 className="card-title">{recipe.recipeName}</h3>
                  <p>❤️ {recipe.likesCount || 0} Likes</p>
                  <p>By {recipe.authorName}</p>
                  <Link to={`/recipe/${recipe._id}`} className="btn btn-primary btn-sm mt-2">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Extra Static Section 1 */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Why RecipeHub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6">
            <h3 className="font-bold text-lg mb-2">Share Easily</h3>
            <p>Upload your recipes in minutes with our simple form.</p>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-lg mb-2">Discover Recipes</h3>
            <p>Browse thousands of recipes from around the world.</p>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-lg mb-2">Save Favorites</h3>
            <p>Bookmark recipes you love and access them anytime.</p>
          </div>
        </div>
      </div>

      {/* Extra Static Section 2 */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center bg-base-200">
        <h2 className="text-3xl font-bold mb-4">Become a Premium Member</h2>
        <p className="max-w-xl mx-auto mb-6">
          Unlock unlimited recipe uploads and a premium badge on your profile.
        </p>
        <Link to="/register" className="btn btn-secondary">Join Now</Link>
      </div>
    </div>
  );
};

export default Home;