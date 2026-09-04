import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSession } from "../../lib/authClient";

const MyRecipes = () => {
  const { data: session } = useSession();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRecipes = () => {
    if (!session?.user?.email) return;
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/my-recipes/${session.user.email}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setRecipes(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchMyRecipes();
  }, [session]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmDelete) return;

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/recipes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setRecipes((prev) => prev.filter((r) => r._id !== id));
    } catch {
      alert("Failed to delete recipe");
    }
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Recipes ({recipes.length})</h1>
        <Link to="/dashboard/add-recipe" className="btn btn-primary btn-sm">
          + Add Recipe
        </Link>
      </div>

      {recipes.length === 0 ? (
        <p>You haven&apos;t added any recipes yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Recipe Name</th>
                <th>Category</th>
                <th>Likes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe._id}>
                  <td>{recipe.recipeName}</td>
                  <td>{recipe.category}</td>
                  <td>{recipe.likesCount || 0}</td>
                  <td className="flex gap-2">
                    <Link to={`/recipe/${recipe._id}`} className="btn btn-xs btn-outline">
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(recipe._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;