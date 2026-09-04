import { useState } from "react";
import { useSession, authClient } from "../../lib/authClient";

const Profile = () => {
  const { data: session, refetch } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [image, setImage] = useState(session?.user?.image || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await authClient.updateUser({ name, image });
      await refetch();
      setMessage("Profile updated successfully!");
    } catch {
      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="flex items-center gap-4 mb-6">
        <div className="avatar">
          <div className="w-20 rounded-full">
            <img src={image || "https://ui-avatars.com/api/?name=" + name} alt={name} />
          </div>
        </div>
        <div>
          <p className="font-semibold">{session?.user?.name}</p>
          <p className="text-sm opacity-70">{session?.user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="input input-bordered w-full"
            placeholder="https://..."
          />
        </div>

        {message && (
          <p className={message.includes("success") ? "text-success" : "text-error"}>{message}</p>
        )}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;