import { useEffect, useState } from "react";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/reports`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setReports(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDismiss = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/reports/${id}/dismiss`, {
      method: "PATCH",
      credentials: "include",
    });
    fetchReports();
  };

  const handleRemoveRecipe = async (recipeId, reportId) => {
    if (!window.confirm("Delete the reported recipe?")) return;
    await fetch(`${import.meta.env.VITE_API_URL}/recipes/${recipeId}`, {
      method: "DELETE",
      credentials: "include",
    });
    await fetch(`${import.meta.env.VITE_API_URL}/reports/${reportId}/dismiss`, {
      method: "PATCH",
      credentials: "include",
    });
    fetchReports();
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
      <h1 className="text-2xl font-bold mb-6">Reports ({reports.length})</h1>
      {reports.length === 0 ? (
        <p>No reports.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Reporter</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id}>
                  <td>{report.reporterEmail}</td>
                  <td>{report.reason}</td>
                  <td>
                    <span className={`badge ${report.status === "pending" ? "badge-warning" : "badge-ghost"}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    {report.status === "pending" && (
                      <>
                        <button onClick={() => handleRemoveRecipe(report.recipeId, report._id)} className="btn btn-xs btn-error">
                          Remove Recipe
                        </button>
                        <button onClick={() => handleDismiss(report._id)} className="btn btn-xs btn-ghost">
                          Dismiss
                        </button>
                      </>
                    )}
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

export default Reports;