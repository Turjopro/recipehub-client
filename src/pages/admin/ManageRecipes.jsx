import { useEffect, useState } from "react";

const ManageRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/recipes?limit=100`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const toggleFeature = async (id, current) => {
    await fetch(`${import.meta.env.VITE_API_URL}/recipes/${id}/feature`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFeatured: !current }),
    });
    fetchRecipes();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this recipe?")) return;
    await fetch(`${import.meta.env.VITE_API_URL}/recipes/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchRecipes();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Recipes ({recipes.length})</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Recipe</th>
              <th>Author</th>
              <th>Category</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe._id}>
                <td>{recipe.recipeName}</td>
                <td>{recipe.authorName}</td>
                <td>{recipe.category}</td>
                <td>
                  <button
                    onClick={() => toggleFeature(recipe._id, recipe.isFeatured)}
                    className={`btn btn-xs ${recipe.isFeatured ? "btn-warning" : "btn-outline"}`}
                  >
                    {recipe.isFeatured ? "★ Featured" : "Feature"}
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(recipe._id)} className="btn btn-xs btn-error">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRecipes;