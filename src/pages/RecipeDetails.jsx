import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useSession } from "../lib/authClient";

const reportReasons = ["Spam", "Offensive Content", "Copyright Issue"];

const RecipeDetails = () => {
  const { id } = useParams();
  const { data: session } = useSession();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportMsg, setReportMsg] = useState("");

  const fetchRecipe = () => {
    fetch(`http://localhost:5000/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`http://localhost:5000/favorites/check/${session.user.email}/${id}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setIsFavorited(data.isFavorited));
    }
  }, [session, id]);

  const handleLike = async () => {
    if (!session?.user) {
      navigate("/login", { state: { from: `/recipe/${id}` } });
      return;
    }
    await fetch(`http://localhost:5000/recipes/${id}/like`, {
      method: "PATCH",
      credentials: "include",
    });
    fetchRecipe();
  };

  const handleFavorite = async () => {
    if (!session?.user) {
      navigate("/login", { state: { from: `/recipe/${id}` } });
      return;
    }
    if (isFavorited) {
      await fetch(`http://localhost:5000/favorites/${session.user.email}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setIsFavorited(false);
    } else {
      await fetch("http://localhost:5000/favorites", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: session.user.email, userId: session.user.id, recipeId: id }),
      });
      setIsFavorited(true);
    }
  };

  const handleReportSubmit = async () => {
    if (!reportReason) return;
    await fetch("http://localhost:5000/reports", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipeId: id,
        reporterEmail: session?.user?.email,
        reason: reportReason,
      }),
    });
    setReportMsg("Report submitted. Thank you.");
    setTimeout(() => {
      setShowReportModal(false);
      setReportMsg("");
      setReportReason("");
    }, 1500);
  };

  const handlePurchase = async () => {
    if (!session?.user) {
      navigate("/login", { state: { from: `/recipe/${id}` } });
      return;
    }

    const res = await fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "recipe",
        recipeId: id,
        recipeName: recipe.recipeName,
        userEmail: session.user.email,
        userId: session.user.id,
      }),
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!recipe) {
    return <p className="text-center py-20">Recipe not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {recipe.recipeImage && (
        <img src={recipe.recipeImage} alt={recipe.recipeName} className="w-full h-80 object-cover rounded-lg mb-6" />
      )}

      <h1 className="text-3xl font-bold mb-2">{recipe.recipeName}</h1>
      <p className="text-sm opacity-70 mb-6">By {recipe.authorName}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="badge badge-outline">Category: {recipe.category}</span>
        <span className="badge badge-outline">Cuisine: {recipe.cuisineType}</span>
        <span className="badge badge-outline">Difficulty: {recipe.difficultyLevel}</span>
        <span className="badge badge-outline">Prep Time: {recipe.preparationTime}</span>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Ingredients</h2>
        <p className="whitespace-pre-line">{recipe.ingredients}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Instructions</h2>
        <p className="whitespace-pre-line">{recipe.instructions}</p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <button onClick={handleLike} className="btn btn-outline">
          ❤️ Like ({recipe.likesCount || 0})
        </button>

        <button onClick={handleFavorite} className={`btn ${isFavorited ? "btn-secondary" : "btn-outline"}`}>
          {isFavorited ? "★ Favorited" : "☆ Add to Favorites"}
        </button>

        <button onClick={handlePurchase} className="btn btn-primary">
          Purchase Recipe
        </button>

        <button onClick={() => setShowReportModal(true)} className="btn btn-outline btn-error">
          🚩 Report
        </button>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Report Recipe</h3>

            {reportMsg ? (
              <p className="text-success">{reportMsg}</p>
            ) : (
              <>
                <div className="flex flex-col gap-2 mb-4">
                  {reportReasons.map((reason) => (
                    <label key={reason} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="reportReason"
                        className="radio radio-sm"
                        checked={reportReason === reason}
                        onChange={() => setReportReason(reason)}
                      />
                      {reason}
                    </label>
                  ))}
                </div>
                <div className="modal-action">
                  <button onClick={() => setShowReportModal(false)} className="btn btn-ghost">
                    Cancel
                  </button>
                  <button onClick={handleReportSubmit} className="btn btn-error" disabled={!reportReason}>
                    Submit Report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="mt-8">
        <Link to="/browse-recipes" className="link link-primary">← Back to Browse Recipes</Link>
      </div>
    </div>
  );
};

export default RecipeDetails;