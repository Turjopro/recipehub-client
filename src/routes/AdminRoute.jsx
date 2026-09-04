import { Navigate, useLocation } from "react-router";
import { useSession } from "../lib/authClient";

const AdminRoute = ({ children }) => {
  const { data: session, isPending } = useSession();
  const location = useLocation();

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!session?.user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // blocked user কে dashboard এ ঢুকতে দেওয়া হচ্ছে না
  if (session.user.isBlocked) {
    return <Navigate to="/blocked" replace />;
  }

  if (session.user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;