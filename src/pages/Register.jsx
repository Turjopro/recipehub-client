import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signUp } from "../lib/authClient";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const image = form.image.value;
    const password = form.password.value;

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passRegex.test(password)) {
      setError("Password must be at least 6 characters, with 1 uppercase and 1 lowercase letter.");
      return;
    }

    setLoading(true);
    const { error: authError } = await signUp.email({
      name,
      email,
      password,
      image,
    });
    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input name="name" type="text" placeholder="Name" className="input input-bordered w-full" required />
          <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
          <input name="image" type="text" placeholder="Image URL" className="input input-bordered w-full" />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />

          {error && <p className="text-error text-sm">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="link link-primary">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;