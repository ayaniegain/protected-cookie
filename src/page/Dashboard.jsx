import { useNavigate, useOutletContext } from "react-router-dom";
import Cookies from "js-cookie";

export default function Dashboard() {
  const user = useOutletContext(); // user data from ProtectedRouters
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("authToken");
    navigate("/login");
  };

  return (
    <main className="mx-auto max-w-3xl p-8">
      <div className="flex items-center gap-4">
        <img src={user.image} alt="" className="h-20 w-20 rounded-full bg-amber-300" />
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold">Welcome back, {user.firstName}</h1>
          <p className="text-slate-500">{user.company?.title} at {user.company?.name}</p>
        </div>
        <button onClick={logout} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100">
          Log out
        </button>
      </div>

      <dl className="mt-10 grid gap-x-8 border-t-2 border-slate-900 sm:grid-cols-2">
        {[
          ["Email", user.email],
          ["Username", user.username],
          ["Phone", user.phone],
          ["Age", user.age],
        ].map(([label, value]) => (
          <div key={label} className="border-b border-slate-200 py-4">
            <dt className="text-sm text-slate-500">{label}</dt>
            <dd className="font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}