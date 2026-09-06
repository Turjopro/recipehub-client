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
    <div className="overflow-hidden">
      {/* Banner Section */}
      <div className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
        <div className="absolute top-10 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="badge badge-primary badge-lg mb-4 py-3 px-4">🍳 Join 10,000+ Food Lovers</span>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Cook, Share &<br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Discover
              </span>
            </h1>
            <p className="text-lg opacity-70 mb-8 max-w-md">
              Join RecipeHub — a community of food lovers sharing their best recipes.
              Discover new dishes and share your own culinary creations with the world.
            </p>
            <div className="flex gap-4">
              <Link to="/browse-recipes" className="btn btn-primary btn-lg">
                Browse Recipes
              </Link>
              <Link to="/register" className="btn btn-outline btn-lg">
                Join Free
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="relative">
              <div className="mockup-window border border-base-300 bg-base-100 shadow-2xl rotate-2">
                <div className="flex justify-center px-4 py-16 bg-gradient-to-br from-primary/5 to-secondary/10">
                  <span className="text-7xl">🍜🥗🍰</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 card bg-base-100 shadow-xl p-4 -rotate-3">
                <p className="font-bold text-sm">🔥 245 Likes</p>
                <p className="text-xs opacity-60">Chicken Biryani</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Recipes */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold uppercase tracking-wide text-sm">Handpicked</span>
          <h2 className="text-4xl font-bold mt-2">Featured Recipes</h2>
        </div>

        {featuredRecipes.length === 0 ? (
          <p className="text-center opacity-60 py-10">No featured recipes yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="card bg-base-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {recipe.recipeImage ? (
                  <figure className="h-52">
                    <img src={recipe.recipeImage} alt={recipe.recipeName} className="w-full h-full object-cover" />
                  </figure>
                ) : (
                  <figure className="h-52 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-5xl">
                    🍽️
                  </figure>
                )}
                <div className="card-body">
                  <div className="badge badge-primary badge-sm">{recipe.category}</div>
                  <h3 className="card-title">{recipe.recipeName}</h3>
                  <div className="flex gap-4 text-sm opacity-60">
                    <span>🌍 {recipe.cuisineType}</span>
                    <span>⏱️ {recipe.preparationTime}</span>
                  </div>
                  <Link to={`/recipe/${recipe._id}`} className="btn btn-primary btn-sm mt-3 w-full">
                    View Recipe
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Popular Recipes */}
      <div className="bg-base-200 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-secondary font-semibold uppercase tracking-wide text-sm">Trending Now</span>
            <h2 className="text-4xl font-bold mt-2">Popular Recipes</h2>
          </div>

          {popularRecipes.length === 0 ? (
            <p className="text-center opacity-60 py-10">No recipes yet. Be the first to add one!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {popularRecipes.map((recipe) => (
                <div key={recipe._id} className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="card-body">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="card-title">{recipe.recipeName}</h3>
                      <span className="badge badge-secondary gap-1">❤️ {recipe.likesCount || 0}</span>
                    </div>
                    <p className="text-sm opacity-60">By {recipe.authorName}</p>
                    <Link to={`/recipe/${recipe._id}`} className="btn btn-outline btn-sm mt-3 w-full">
                      View Recipe
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Extra Static Section 1 - Why RecipeHub */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Why RecipeHub?</h2>
        <p className="opacity-60 max-w-xl mx-auto mb-12">Everything you need to become part of a global cooking community.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-base-100 shadow-md">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="font-bold text-lg mb-2">Share Easily</h3>
            <p className="opacity-70">Upload your recipes in minutes with our simple form.</p>
          </div>
          <div className="p-8 rounded-2xl bg-base-100 shadow-md">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-bold text-lg mb-2">Discover Recipes</h3>
            <p className="opacity-70">Browse thousands of recipes from around the world.</p>
          </div>
          <div className="p-8 rounded-2xl bg-base-100 shadow-md">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="font-bold text-lg mb-2">Save Favorites</h3>
            <p className="opacity-70">Bookmark recipes you love and access them anytime.</p>
          </div>
        </div>
      </div>

      {/* Extra Static Section 2 - Premium CTA */}
      <div className="mx-4 md:mx-auto max-w-6xl mb-20 rounded-3xl bg-gradient-to-r from-primary to-secondary text-primary-content px-8 py-16 text-center shadow-2xl">
        <h2 className="text-4xl font-bold mb-4">Become a Premium Member</h2>
        <p className="max-w-xl mx-auto mb-8 opacity-90">
          Unlock unlimited recipe uploads and a premium badge on your profile.
        </p>
        <Link to="/register" className="btn btn-lg bg-base-100 text-base-content border-none hover:scale-105 transition-transform">
          Join Now — It's Free
        </Link>
      </div>
    </div>
  );
};

export default Home;