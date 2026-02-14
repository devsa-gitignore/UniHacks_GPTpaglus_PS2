import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaXTwitter, FaGoogle } from "react-icons/fa6";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const validate = () => {
    const newErrors = {};

    if (!identifier.trim()) newErrors.identifier = "Email or username is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    if (newErrors.identifier) setIdentifier("");
    if (newErrors.password) setPassword("");

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(`${apiBaseUrl}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: identifier.trim(),
          password: password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        const detail = data.detail || "Invalid credentials";
        setErrors({ api: detail });
        return;
      }

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("username", data.username || "");
      localStorage.setItem("role", data.role || "");

      setIdentifier("");
      setPassword("");
      navigate("/home");
    } catch {
      setErrors({ api: "Unable to connect to server. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#FFF2FA] p-4">
        <div className="w-fit min-h-fit bg-[#f7d0e1] rounded-3xl shadow-2xl flex border-2 border-[#6C0C27] ">
          <div className="p-6 w-[30rem]">
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <h2 className="text-4xl text-[#6C0C27] pb-4 font-bold text-center border-b-2">
                Login
              </h2>
              <div className="flex gap-8">
                <p className="text-[#6C0C27] pr-4 relative top-1.5 text-xl">
                  Login with
                </p>
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 rounded-full 
                   border border-[#6C0C27] text-[#6C0C27] hover:bg-white hover:text-[#6C0C27] 
                   transition duration-200 cursor-pointer"
                >
                  <FaGoogle size={16} />
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 rounded-full 
                   border border-[#6C0C27] text-[#6C0C27] hover:bg-white hover:text-[#6C0C27] 
                   transition duration-200 cursor-pointer"
                >
                  <FaFacebookF size={16} />
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 rounded-full 
                   border border-[#6C0C27] text-[#6C0C27] hover:bg-white hover:text-[#6C0C27] 
                   transition duration-200 cursor-pointer"
                >
                  <FaXTwitter size={16} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#6C0C27]"></div>
                <span className="text-lg text-[#6C0C27]">Or</span>
                <div className="flex-1 h-px bg-[#6C0C27]"></div>
              </div>
              <div>
                <div className="text-[#6C0C27] text-xl text-center pb-4 relative bottom-2">
                  Login with Email
                </div>
                <input
                  type="text"
                  placeholder="Email or username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none border-[#6C0C27] border-2 bg-white"
                />
                {errors.identifier && (
                  <p className="text-[#6C0C27] text-sm">{errors.identifier}</p>
                )}
              </div>

              <div>
                <input
                  type={showpassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none border-[#6C0C27] border-2 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showpassword)}
                  className="relative left-[25rem] bottom-8"
                >
                  {showpassword ? <RiEyeFill /> : <RiEyeOffFill />}
                </button>
                {errors.password && (
                  <p className="text-[#6C0C27] text-sm">{errors.password}</p>
                )}
              </div>
              {errors.api && <p className="text-[#6C0C27] text-sm">{errors.api}</p>}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-white py-2 rounded-full hover:bg-gray-200 transition text-2xl border-2 border-[#6C0C27] cursor-pointer"
                >
                  {submitting ? "Logging in..." : "Login"}
                </button>
                <div className="text-center pt-4">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-700">
                    Signup!
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
