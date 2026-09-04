import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSession } from "../../lib/authClient";

const Purchased = () => {
  const { data: session } = useSession();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/purchased-recipes/${session.user.email}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setRecipes(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Purchased Recipes ({recipes.length})</h1>

      {recipes.length === 0 ? (
        <p>You haven&apos;t purchased any recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="card bg-base-100 shadow-md">
              {recipe.recipeImage && (
                <figure className="h-40">
                  <img src={recipe.recipeImage} alt={recipe.recipeName} className="w-full h-full object-cover" />
                </figure>
              )}
              <div className="card-body">
                <h3 className="card-title">{recipe.recipeName}</h3>
                <p>Category: {recipe.category}</p>
                <div className="card-actions justify-end mt-2">
                  <Link to={`/recipe/${recipe._id}`} className="btn btn-sm btn-outline">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Purchased;