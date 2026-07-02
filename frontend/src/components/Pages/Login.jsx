import React, { useState } from "react";
import { Scale } from "lucide-react";
import { Link,  useNavigate } from "react-router-dom";



const Login = () => {
  const BACKEND_URL = "https://justiceai-backend.onrender.com"
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    email: "",
    password: ""
  });
  const [loginErr, setloginErr] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formdata.email))
      newErrors.email = "Invalid Email";

    if (formdata.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formdata)
      })
      .then(res => {
        if(!res.ok){
          return res.json().then(err => {
            throw new Error(err.message);
          })
        }
        return res.json();
      })
      .then(data => {
        sessionStorage.setItem("token", data.token)
        navigate("/dashboard");
      })
      .catch(err =>{ 
        setloginErr(err.message)
      })
    }
  };

  return (
    <div className="md:fixed min-w-full min-h-screen flex flex-row border-t-[#8b4513] border-t-4">

      {/* LEFT PANEL */}
      <div className="hidden md:flex flex-1 bg-[#1a0f07] flex-col justify-center p-10 gap-8">

    {/* Logo */}
    <div className="w-25 h-25 rounded-full border border-[#c4874a] flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border border-[#c4874a] bg-[#3c1c00] flex items-center justify-center">
        <Scale className="w-8 h-8 text-red-900" />
        </div>
    </div>

    {/* Title */}
    <div>
        <h1 className="text-[#e8d5b0] text-4xl font-[Times_New_Roman]">
        Justice<span className="text-amber-500">AI</span>
        </h1>

        <p className="text-[#7a5535] text-sm font-[Arial]">
        AI-POWERED LEGAL INTELLIGENCE
        </p>
    </div>

    {/* Mandate */}
    <div className="border-l-4 border-l-[#8b4513] bg-[#221208] p-5 flex flex-col gap-3">
        <p className="text-amber-700">ACCESS NOTICE</p>

        <p className="text-[#C8A8A0] italic">
        "Secure authentication required to enter your legal workspace."
        </p>
    </div>

    {/* Feature bullets */}
    <div className="text-[#c4874a] text-sm font-[Times_New_Roman] flex flex-col gap-2">
        <p>• Case dashboard access</p>
        <p>• Secure document vault</p>
        <p>• AI legal assistant</p>
        <p>• Real-time precedent tracking</p>
    </div>

    </div>


      {/* RIGHT PANEL */}
      <div className="flex-1 bg-[#f5f0e8] flex flex-col p-8 justify-center">

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto w-full space-y-5">

          <div>
            <p className="text-3xl font-bold font-[Times_New_Roman]">
              Enter the Chamber
            </p>
            <p className="text-[#8a6a4a]">
              Access your legal workspace securely
            </p>
          </div>


          {/* EMAIL */}
          <div>
            <label className="text-[#6b4a2a]">
              EMAIL ADDRESS
            </label>

            <input
              name="email"
              onChange={handleChange}
              className={`bg-[#fffdf8] border-2 ${
                errors.email ? "border-red-500" : "border-[#c4a882]"
              } w-full p-2`}
              placeholder="Official correspondence address"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>


          {/* PASSWORD */}
          <div>
            <label className="text-[#6b4a2a]">
              PASSCODE
            </label>

            <input
              type="password"
              name="password"
              onChange={handleChange}
              className={`bg-[#fffdf8] border-2 ${
                errors.password ? "border-red-500" : "border-[#c4a882]"
              } w-full p-2`}
              placeholder="Enter passcode"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
            
            {loginErr && (
              <p className="text-red-500 text-sm mt-1">
                {loginErr}
              </p>
            )}
          </div>


          {/* BUTTON */}
          <button
            type="submit"
            className=" cursor-pointer font-[Times_New_Roman] text-2xl text-[#8b4513] w-full bg-[#1a0f07] h-14 border-2 border-[#3a1c07]"
          >
            ENTER CHAMBER
          </button>


          {/* SIGNUP LINK */}
          <p className="text-center text-[#8b4513]">
            New applicant?{" "}
            <Link 
            to="/signup"
            className="underline cursor-pointer text-[#3a1c07]">
              File your entry
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;