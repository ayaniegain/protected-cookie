import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login() {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (Cookies.get("authToken")) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", { username, password });
      Cookies.set("authToken", res.data.accessToken, { expires: 7, sameSite: "strict" });
      navigate("/dashboard");
    } catch {
      setError("Username or password is incorrect.");
    } finally {
      setLoading(false);
    }
  };

  const input =
    "w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15";

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="flex flex-col justify-between bg-blue-600 p-10 text-white">
        <span className="text-xl font-bold">Keycard</span>
        <h1 className="my-16 max-w-xs text-5xl font-extrabold leading-tight">
          check
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="m-auto grid w-full max-w-sm gap-4 p-8">
        <h2 className="text-3xl font-bold">Log in</h2>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <label className="grid gap-1 text-sm font-medium">
          Username
          <input className={input} value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>

        <label className="grid gap-1 text-sm font-medium">
          Password
          <input className={input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        <button
          disabled={loading}
          className="rounded-lg bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}