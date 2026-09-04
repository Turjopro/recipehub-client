import { useState } from "react";
import { useNavigate } from "react-router";
import { useSession } from "../../lib/authClient";

const categories = ["Rice", "Pasta", "Curry", "Dessert", "Soup", "Salad"];
const difficulties = ["Easy", "Medium", "Hard"];

const AddRecipe = () => {
  const { data: session } = useSession();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const recipe = {
      recipeName: form.recipeName.value,
      recipeImage: form.recipeImage.value,
      category: form.category.value,
      cuisineType: form.cuisineType.value,
      difficultyLevel: form.difficultyLevel.value,
      preparationTime: form.preparationTime.value,
      ingredients: form.ingredients.value,
      instructions: form.instructions.value,
      authorId: session?.user?.id,
      authorName: session?.user?.name,
      authorEmail: session?.user?.email,
    };

    try {
      const res = await fetch("http://localhost:5000/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      });
      if (!res.ok) throw new Error("Failed to add recipe");
      navigate("/dashboard/my-recipes");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Recipe</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
        <input name="recipeName" placeholder="Recipe Name" className="input input-bordered w-full" required />
        <input name="recipeImage" placeholder="Recipe Image URL (imgbb link)" className="input input-bordered w-full" required />

        <select name="category" className="select select-bordered w-full" required defaultValue="">
          <option value="" disabled>Select Category</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <input name="cuisineType" placeholder="Cuisine Type (e.g. Italian)" className="input input-bordered w-full" required />

        <select name="difficultyLevel" className="select select-bordered w-full" required defaultValue="">
          <option value="" disabled>Difficulty Level</option>
          {difficulties.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>

        <input name="preparationTime" placeholder="Preparation Time (e.g. 30 min)" className="input input-bordered w-full" required />

        <textarea name="ingredients" placeholder="Ingredients (comma separated)" className="textarea textarea-bordered w-full md:col-span-2" rows={3} required />
        <textarea name="instructions" placeholder="Cooking Instructions" className="textarea textarea-bordered w-full md:col-span-2" rows={5} required />

        {error && <p className="text-error text-sm md:col-span-2">{error}</p>}

        <button type="submit" className="btn btn-primary md:col-span-2" disabled={loading}>
          {loading ? "Adding..." : "Add Recipe"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;