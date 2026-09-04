import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("loading");
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/verify-payment/${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.payment) {
          setPayment(data.payment);
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-error">Payment Verification Failed</h1>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
      <div className="text-6xl">✅</div>
      <h1 className="text-3xl font-bold">Payment Successful!</h1>
      <p>
        {payment.type === "premium"
          ? "You are now a Premium Member. Enjoy unlimited recipe uploads!"
          : "You've successfully purchased this recipe."}
      </p>
      <p className="text-sm opacity-70">Transaction ID: {payment.transactionId}</p>
      <p className="text-sm opacity-70">Amount: ${payment.amount}</p>

      <div className="flex gap-3 mt-4">
        {payment.type === "recipe" && payment.recipeId && (
          <Link to={`/recipe/${payment.recipeId}`} className="btn btn-outline">View Recipe</Link>
        )}
        <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;