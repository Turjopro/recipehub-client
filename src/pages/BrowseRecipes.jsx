import { useEffect, useState } from "react";
import { Link } from "react-router";

const categories = ["Rice", "Pasta", "Curry", "Dessert", "Soup", "Salad"];

const BrowseRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    const categoryQuery = selectedCategories.length ? `&category=${selectedCategories.join(",")}` : "";
    fetch(`${import.meta.env.VITE_API_URL}/recipes?page=${page}&limit=9${categoryQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, selectedCategories]);

  const toggleCategory = (cat) => {
    setPage(1);
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Browse Recipes</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`btn btn-sm ${selectedCategories.includes(cat) ? "btn-primary" : "btn-outline"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : recipes.length === 0 ? (
        <p className="text-center text-lg py-20">No recipes found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="card bg-base-100 shadow-md">
                {recipe.recipeImage && (
                  <figure className="h-48">
                    <img src={recipe.recipeImage} alt={recipe.recipeName} className="w-full h-full object-cover" />
                  </figure>
                )}
                <div className="card-body">
                  <h3 className="card-title">{recipe.recipeName}</h3>
                  <p>Category: {recipe.category}</p>
                  <p>Cuisine: {recipe.cuisineType}</p>
                  <p>Prep Time: {recipe.preparationTime}</p>
                  <div className="card-actions justify-end mt-2">
                    <Link to={`/recipe/${recipe._id}`} className="btn btn-primary btn-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-10">
            <button
              className="btn btn-sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>
            <span className="btn btn-sm btn-ghost">Page {page} of {totalPages}</span>
            <button
              className="btn btn-sm"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BrowseRecipes;