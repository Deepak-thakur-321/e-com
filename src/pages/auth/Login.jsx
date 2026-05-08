import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const VALID_EMAIL = "test@mystore.com";
const VALID_PASSWORD = "test123";

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [errors, setErrors]     = useState({});
  const [mainErr, setMainErr]   = useState("");
  const { login }  = useAuth();
  const navigate   = useNavigate();

  const validate = () => {
    const e = {};
    if (!email.trim())                     e.email    = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))  e.email    = "Enter a valid email address";
    if (!password)                         e.password = "Password is required";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setMainErr("");
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
      setMainErr("Invalid credentials. Use test@mystore.com / test123");
      return;
    }
    login(email, password);
    navigate("/home");
  };

  return (
    <div
      style={{ fontFamily: "Arial, sans-serif" }}
      className="min-h-screen w-full bg-[#f3f4ff] flex items-center justify-center px-4 py-8"
    >
      <div className="w-full max-w-6xl min-h-[90vh] bg-white rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col lg:flex-row">

        {/* ── LEFT: Brand Panel ── */}
        <div
          className="hidden lg:flex w-1/2 flex-col relative overflow-hidden"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/87/04/c6/8704c6fbfe173e064f825b3b95e9df99.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          {/* Logo */}
          <div className="relative z-10 p-10">
            <span
              className="text-white text-3xl font-black tracking-widest uppercase"
              style={{ letterSpacing: "0.18em" }}
            >
              MyStore
            </span>
            <div className="mt-1 h-0.5 w-12 bg-white opacity-60" />
          </div>

          {/* Big Quote */}
          <div className="relative z-10 flex-1 flex flex-col justify-center px-10">
            {/* <p
              className="text-white text-5xl font-black leading-tight uppercase"
              style={{ letterSpacing: "-0.01em" }}
            >
              Dress<br />Like You<br />Mean It.
            </p>
            <p className="text-gray-300 text-sm mt-4 leading-relaxed max-w-xs">
              Curated fashion. Uncompromising style. Built for those who lead — not follow.
            </p> */}
          </div>

          {/* Trust Badges */}
          <div className="relative z-10 p-10">
            <div className="flex gap-6">
              {["50K+ Orders", "Free Returns", "Premium Brands"].map((b) => (
                <div key={b}>
                  <div className="text-white text-xs font-bold tracking-widest uppercase">{b}</div>
                  <div className="mt-1 h-px bg-white opacity-30 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Form Panel ── */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-12 bg-white">

          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <span
              className="text-2xl font-black tracking-widest uppercase text-gray-900"
              style={{ letterSpacing: "0.15em" }}
            >
              MyStore
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-gray-200 mb-8">
            <span
              className="pb-3 text-sm font-bold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900"
              style={{ letterSpacing: "0.12em" }}
            >
              Sign In
            </span>
            <Link
              to="/register"
              className="pb-3 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-gray-700 transition border-b-2 border-transparent"
              style={{ letterSpacing: "0.12em" }}
            >
              Register
            </Link>
          </div>

          <h1
            className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-1"
            style={{ letterSpacing: "-0.01em" }}
          >
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            Sign in to access your exclusive MyStore account
          </p>

          {/* Credentials hint */}
          <div className="border border-gray-200 rounded-lg px-4 py-3 mb-5 bg-gray-50 text-xs text-gray-500">
            <span className="font-bold text-gray-700 uppercase tracking-wider">Test Access</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="font-mono">test@mystore.com</span>
            <span className="mx-2 text-gray-300">/</span>
            <span className="font-mono font-bold text-gray-800">test123</span>
          </div>

          {mainErr && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
              {mainErr}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2"
                style={{ letterSpacing: "0.12em" }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                placeholder="test@mystore.com"
                style={{ fontFamily: "Arial, sans-serif" }}
                className={`w-full px-5 py-3.5 text-sm border-2 rounded-none bg-white focus:outline-none transition-all ${
                  errors.email ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5">✕ {errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2"
                style={{ letterSpacing: "0.12em" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
                  placeholder="••••••••"
                  style={{ fontFamily: "Arial, sans-serif" }}
                  className={`w-full px-5 py-3.5 pr-12 text-sm border-2 rounded-none bg-white focus:outline-none transition-all ${
                    errors.password ? "border-red-400" : "border-gray-200 focus:border-gray-900"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition"
                >
                  {showPw ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5">✕ {errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-4 text-sm font-black uppercase tracking-widest hover:bg-black transition-all"
              style={{ letterSpacing: "0.15em" }}
            >
              Sign In →
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <Link
            to="/register"
            className="block w-full border-2 border-gray-900 text-gray-900 py-3.5 text-sm font-black uppercase tracking-widest text-center hover:bg-gray-900 hover:text-white transition-all"
            style={{ letterSpacing: "0.12em" }}
          >
            Create New Account
          </Link>

          <p className="text-center text-xs text-gray-400 mt-6">
            By signing in, you agree to our{" "}
            <span className="underline cursor-pointer text-gray-600">Terms of Service</span>
            {" "}and{" "}
            <span className="underline cursor-pointer text-gray-600">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}