import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p>Page Not Found</p>
      <Link to="/" className="btn">Back to Home</Link>
    </div>
  );
};

export default ErrorPage;