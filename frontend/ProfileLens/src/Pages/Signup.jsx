import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaXTwitter, FaGoogle } from "react-icons/fa6";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const [showconfirmpassword, setShowConfirmPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    const userRegex = /^[a-zA-Z0-9_]{3,15}$/;
    if (!userRegex.test(username))
      newErrors.username =
        "Username must be 3-15 chars (letters, numbers, underscore only)";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) newErrors.email = "Invalid Email Format";
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) newErrors.phone = "Enter a valid Phone No.";

    const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passRegex.test(password))
      newErrors.password =
        "Password must be atleast: 8+ characters, 1 uppercase, 1 number and 1 special character";

    if (password !== confirmpassword)
      newErrors.confirmpassword = "Passwords do not match";

    if (!(age > 18)) newErrors.age = "You should be an adult";
    if (!gender) newErrors.gender = "Please select a gender";
    if (!role) newErrors.role = "Please select a role";

    setErrors(newErrors);
    if (newErrors.email) setEmail("");
    if (newErrors.password) setPassword("");
    if (newErrors.phone) setPhone("");
    if (newErrors.gender) setGender("");
    if (newErrors.role) setRole("");
    if (newErrors.age) setAge("");

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Sign Up Successful!!");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAge("");
      setPhone("");
      setRole("");
      setGender("");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#FFF2FA] p-4">
        <div className="min-w-fit min-h-fit bg-[#f6bed6] rounded-3xl shadow-2xl flex border-2 border-[#6C0C27] ">
          <div className="p-6 w-[30rem]">
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <h2 className="text-4xl text-[#6C0C27] pb-4 font-bold text-center border-b-2">
                Signup
              </h2>
              <div className="flex gap-8">
                <p className="text-[#6C0C27] pr-4 relative top-1.5 text-xl">
                  Signup with
                </p>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-full 
                       border border-[#6C0C27] text-[#6C0C27] hover:bg-white hover:text-[#6C0C27] 
                       transition duration-200"
                >
                  <FaGoogle size={16} />
                </button>

                <button
                  className="flex items-center justify-center w-10 h-10 rounded-full 
                       border border-[#6C0C27] text-[#6C0C27] hover:bg-white hover:text-[#6C0C27] 
                       transition duration-200"
                >
                  <FaFacebookF size={16} />
                </button>

                <button
                  className="flex items-center justify-center w-10 h-10 rounded-full 
                       border border-[#6C0C27] text-[#6C0C27] hover:bg-white hover:text-[#6C0C27] 
                       transition duration-200"
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
                  Signup with Email
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-54 px-4 py-2 border rounded-lg focus:outline-none border-[#6C0C27] border-2 bg-white"
                    />
                    {errors.username && (
                      <p className="text-[#6C0C27] text-sm">
                        {errors.username}
                      </p>
                    )}
                    <input
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-54 px-4 py-2 border rounded-lg focus:outline-none border-[#6C0C27] border-2 bg-white"
                    />
                    {errors.email && (
                      <p className="text-[#6C0C27] text-sm">{errors.email}</p>
                    )}

                    <input
                      type={showpassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-54 px-4 py-2 border rounded-lg focus:outline-none border-[#6C0C27] border-2 bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showpassword)}
                      className="relative left-45 bottom-11"
                    >
                      {showpassword ? <RiEyeFill /> : <RiEyeOffFill />}
                    </button>
                    {errors.password && (
                      <p className="text-[#6C0C27] text-sm">
                        {errors.password}
                      </p>
                    )}
                    <input
                      type={showconfirmpassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={confirmpassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-54 px-4 py-2 border rounded-lg focus:outline-none border-[#6C0C27] border-2 bg-white relative bottom-8"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showconfirmpassword)
                      }
                      className="relative left-45 bottom-19"
                    >
                      {showconfirmpassword ? <RiEyeFill /> : <RiEyeOffFill />}
                    </button>
                    {errors.confirmpassword && (
                      <p className="text-[#6C0C27] text-sm">
                        {errors.confirmpassword}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-54 px-4 py-2 border rounded-lg focus:outline-none border-[#6C0C27] border-2 bg-white"
                    />
                    {errors.age && (
                      <p className="text-[#6C0C27] text-sm">{errors.age}</p>
                    )}
                    <input
                      type="text"
                      placeholder="Phone No."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-54 px-4 py-2 border rounded-lg focus:outline-none border-[#6C0C27] border-2 bg-white"
                    />
                    {errors.phone && (
                      <p className="text-[#6C0C27] text-sm">{errors.phone}</p>
                    )}
                    <select
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-54 px-4 py-2 border rounded-lg focus:outline-none border-[#6C0C27] border-2 bg-white"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="text-[#6C0C27] text-sm">{errors.gender}</p>
                    )}
                    <select
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-54 px-4 py-2 border rounded-lg focus:outline-none border-[#6C0C27] border-2 bg-white"
                    >
                      <option value="">Select Role</option>
                      <option value="male">User</option>
                      <option value="female">Reviewer</option>
                    </select>
                    {errors.role && (
                      <p className="text-[#6C0C27] text-sm">{errors.role}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="pt-8">
                <div className="">
                  <label className="flex items-center gap-2 text-[#6C0C27] text-sm relative bottom-20">
                    <input
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer"
                    />
                    Agree to Terms and Conditions
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-white py-2 rounded-full hover:bg-gray-200 transition text-2xl border-2 border-[#6C0C27] relative bottom-15"
                >
                  Signup
                </button>
                <div className="text-center pt-">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-700">
                    Login!
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

export default Signup;
