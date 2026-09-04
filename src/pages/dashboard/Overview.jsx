import { useEffect, useState } from "react";
import { useSession } from "../../lib/authClient";

const Overview = () => {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalRecipes: 0,
    totalFavorites: 0,
    totalLikesReceived: 0,
    isPremium: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;
    fetch(`http://localhost:5000/user-stats/${session.user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
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
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}</h1>
        {stats.isPremium && <span className="badge badge-warning">⭐ Premium</span>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="stat bg-base-100 shadow-md rounded-lg">
          <div className="stat-title">Total Recipes</div>
          <div className="stat-value text-primary">{stats.totalRecipes}</div>
          <div className="stat-desc">{stats.isPremium ? "Unlimited (Premium)" : `${stats.totalRecipes}/2 used`}</div>
        </div>

        <div className="stat bg-base-100 shadow-md rounded-lg">
          <div className="stat-title">Total Favorites</div>
          <div className="stat-value text-secondary">{stats.totalFavorites}</div>
          <div className="stat-desc">Recipes you saved</div>
        </div>

        <div className="stat bg-base-100 shadow-md rounded-lg">
          <div className="stat-title">Likes Received</div>
          <div className="stat-value">{stats.totalLikesReceived}</div>
          <div className="stat-desc">Across all your recipes</div>
        </div>
      </div>

      {!stats.isPremium && (
        <div className="mt-8 p-6 bg-base-200 rounded-lg text-center">
          <h3 className="font-bold text-lg mb-2">Unlock Unlimited Recipes</h3>
          <p className="mb-4">Become a premium member to add unlimited recipes and get a premium badge.</p>
          <button className="btn btn-primary">Upgrade to Premium</button>
        </div>
      )}
    </div>
  );
};

export default Overview;