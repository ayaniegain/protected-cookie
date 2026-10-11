import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function ProtectedRouters() {
  const [status, setStatus] = useState("loading"); // loading | valid | invalid
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) return setStatus("invalid"); // no token -> login

    axios
      .get("https://dummyjson.com/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setStatus("valid");
      })
      .catch(() => {
        Cookies.remove("authToken"); // bad or expired token
        setStatus("invalid");
      });
  }, []);

  if (status === "loading") return <p className="p-8 text-slate-500">Checking session...</p>;
  if (status === "invalid") return <Navigate to="/login" replace />;
  return <Outlet context={user} />;
}