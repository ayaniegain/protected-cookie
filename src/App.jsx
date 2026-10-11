import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./page/Login";
import Home from "./page/Home";
import About from "./page/About";
import Dashboard from "./page/Dashboard";
import ProtectedRouters from "./components/ProtectedRouters";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="flex gap-4 border-b border-slate-200 px-8 py-4 text-sm font-medium text-slate-600">
        <Link to="/" className="hover:text-black">Home</Link>
        <Link to="/about" className="hover:text-black">About</Link>
        <Link to="/dashboard" className="hover:text-black">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRouters />}>
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}