import { useEffect, useState } from "react";

const AdminOverview = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalRecipes: 0, totalPremium: 0, totalReports: 0 });

  useEffect(() => {
    fetch("http://localhost:5000/admin-stats", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setStats({
          totalUsers: data.totalUsers ?? 0,
          totalRecipes: data.totalRecipes ?? 0,
          totalPremium: data.totalPremium ?? 0,
          totalReports: data.totalReports ?? 0,
        });
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat bg-base-100 shadow-md rounded-lg">
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">{stats.totalUsers}</div>
        </div>
        <div className="stat bg-base-100 shadow-md rounded-lg">
          <div className="stat-title">Total Recipes</div>
          <div className="stat-value text-secondary">{stats.totalRecipes}</div>
        </div>
        <div className="stat bg-base-100 shadow-md rounded-lg">
          <div className="stat-title">Premium Members</div>
          <div className="stat-value">{stats.totalPremium}</div>
        </div>
        <div className="stat bg-base-100 shadow-md rounded-lg">
          <div className="stat-title">Total Reports</div>
          <div className="stat-value text-error">{stats.totalReports}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;