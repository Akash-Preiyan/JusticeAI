import React, { useState } from "react";
import { Scale } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const BACKEND_URL = "https://justiceai-backend.onrender.com"
  const [formdata, Setformdata] = useState({
    fullName: "",
    email: "",
    role: "",
    barid: "",
    password: "",
    conformpass: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {

    Setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    let newErrors = {};

    if (!/^[A-Za-z\s]+$/.test(formdata.fullName.trim())) {
      newErrors.fullName =
        "Valid full name required";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formdata.email
      )
    ) {
      newErrors.email =
        "Invalid email address";
    }

    if (formdata.password.length < 6) {
      newErrors.password =
        "Minimum 6 characters required";
    }

    if (
      formdata.password !==
      formdata.conformpass
    ) {
      newErrors.conformpass =
        "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      fetch(
        `${BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(formdata),
        }
      )
        .then((res) => res.json())

        .then((data) => {

          sessionStorage.setItem(
            "token",
            data.token
          );

          navigate("/dashboard");

        })

        .catch((err) =>
          console.log(err)
        );
    }
  };

  return (

    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f0e8]">

      {/* LEFT PANEL */}

      <div className="hidden md:flex md:w-[45%] bg-[#1a0f07] relative overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(196,135,74,0.15),transparent_40%)]" />

        <div className="relative z-10 flex flex-col justify-between px-12 py-14 w-full">

          <div className="space-y-10">

            <div className="flex items-center gap-5">

              <div className="w-24 h-24 rounded-full border border-[#c4874a]/40 flex items-center justify-center">

                <div className="w-16 h-16 rounded-full bg-[#2d160a] border border-[#c4874a]/30 flex items-center justify-center shadow-lg">

                  <Scale
                    className="text-[#c4874a]"
                    size={30}
                  />

                </div>
              </div>

              <div>

                <h1 className="text-5xl font-extrabold text-[#f5e7d3] tracking-tight">
                  Justice
                  <span className="text-[#c4874a]">
                    AI
                  </span>
                </h1>

                <p className="text-[#9f7d5d] mt-2 text-sm tracking-[0.2em] uppercase">
                  AI Powered Legal Intelligence
                </p>

              </div>
            </div>

            <div className="border-l-4 border-[#8b4513] bg-[#24140c] rounded-r-2xl p-6 shadow-xl">

              <p className="text-[#c4874a] text-sm tracking-[0.2em] uppercase font-semibold">
                Court Mandate
              </p>

              <p className="text-[#d5bfa8] italic text-lg mt-4 leading-8">
                “Equal access to legal intelligence
                for every citizen, every case.”
              </p>

            </div>

            <div className="grid grid-cols-3 gap-5">

              <div className="rounded-2xl bg-[#24140c] border border-[#3a2418] p-5 text-center">
                <h2 className="text-3xl font-bold text-[#c4874a]">
                  50K+
                </h2>
                <p className="text-[#9f7d5d] text-xs mt-2 uppercase tracking-wide">
                  Cases Filed
                </p>
              </div>

              <div className="rounded-2xl bg-[#24140c] border border-[#3a2418] p-5 text-center">
                <h2 className="text-3xl font-bold text-[#c4874a]">
                  90%
                </h2>
                <p className="text-[#9f7d5d] text-xs mt-2 uppercase tracking-wide">
                  AI Accuracy
                </p>
              </div>

              <div className="rounded-2xl bg-[#24140c] border border-[#3a2418] p-5 text-center">
                <h2 className="text-3xl font-bold text-[#c4874a]">
                  120+
                </h2>
                <p className="text-[#9f7d5d] text-xs mt-2 uppercase tracking-wide">
                  Jurisdictions
                </p>
              </div>

            </div>

            <div className="space-y-4">

              {[
                "Real-time case law analysis",
                "Document drafting & review",
                "Precedent matching engine",
                "Secure attorney-client vault",
              ].map((item, index) => (

                <div
                  key={index}
                  className="flex items-center gap-4 text-[#d8c2ab]"
                >

                  <div className="w-2 h-2 rounded-full bg-[#c4874a]" />

                  <p className="text-sm tracking-wide">
                    {item}
                  </p>

                </div>

              ))}

            </div>
          </div>

          <div className="text-[#7a5535] text-sm">
            JusticeAI © 2026
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}

      <div className="flex-1 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-2xl bg-[#fffaf3] border border-[#e4d5c4] rounded-[32px] shadow-2xl p-8 md:p-10">

          <div className="border-b border-[#e6d9ca] pb-6">

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-4xl font-extrabold text-[#2b1408]">
                  Create Account
                </h2>

                <p className="text-[#8a6a4a] mt-3 leading-7">
                  Complete your registration to
                  access AI-powered legal
                  intelligence tools.
                </p>

              </div>

              <div className="hidden md:block text-right">
                <p className="text-[#8a6a4a] text-xs uppercase tracking-[0.2em]">
                  Case Registry
                </p>

                <p className="text-[#2b1408] font-bold mt-2">
                  REG-2026
                </p>
              </div>

            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 mt-8"
          >

            {/* FULL NAME */}

            <div>

              <label className="block mb-2 text-sm font-semibold text-[#6b4a2a] uppercase tracking-wide">

                Full Legal Name

              </label>

              <input
                required
                name="fullName"
                type="text"
                placeholder="As it appears on legal documents"
                onChange={handleChange}
                className={`w-full rounded-2xl border-2 bg-white px-5 py-4 outline-none transition-all text-[#2b1408]
                ${
                  errors.fullName
                    ? "border-red-500"
                    : "border-[#d5c1aa] focus:border-[#c4874a]"
                }`}
              />

              {errors.fullName && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.fullName}
                </p>
              )}

            </div>

            {/* EMAIL */}

            <div>

              <label className="block mb-2 text-sm font-semibold text-[#6b4a2a] uppercase tracking-wide">

                Email Address

              </label>

              <input
                required
                name="email"
                type="email"
                placeholder="Official correspondence address"
                onChange={handleChange}
                className={`w-full rounded-2xl border-2 bg-white px-5 py-4 outline-none transition-all text-[#2b1408]
                ${
                  errors.email
                    ? "border-red-500"
                    : "border-[#d5c1aa] focus:border-[#c4874a]"
                }`}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email}
                </p>
              )}

            </div>

            {/* ROLE + BAR ID */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <label className="block mb-2 text-sm font-semibold text-[#6b4a2a] uppercase tracking-wide">

                  Designation

                </label>

                <select
                  required
                  name="role"
                  onChange={handleChange}
                  className="w-full rounded-2xl border-2 border-[#d5c1aa] bg-white px-5 py-4 outline-none text-[#2b1408] focus:border-[#c4874a]"
                >

                  <option value="">
                    Select role
                  </option>

                  <option>
                    Lawyer / Attorney
                  </option>

                  <option>
                    Judge / Magistrate
                  </option>

                  <option>
                    Law Student
                  </option>

                  <option>
                    Legal Researcher
                  </option>

                  <option>
                    Corporate Counsel
                  </option>

                  <option>
                    Individual / Pro Se
                  </option>

                </select>
              </div>

              <div>

                <label className="block mb-2 text-sm font-semibold text-[#6b4a2a] uppercase tracking-wide">

                  Bar ID (Optional)

                </label>

                <input
                  name="barid"
                  type="text"
                  placeholder="e.g. BAR-004721"
                  onChange={handleChange}
                  className="w-full rounded-2xl border-2 border-[#d5c1aa] bg-white px-5 py-4 outline-none text-[#2b1408] focus:border-[#c4874a]"
                />

              </div>
            </div>

            {/* PASSWORDS */}

            <div className="pt-3">

              <div className="flex items-center gap-4 mb-6">

                <div className="flex-1 border-t border-[#d8c8b7]" />

                <p className="text-[#8a6a4a] text-xs uppercase tracking-[0.2em]">
                  Security Credentials
                </p>

                <div className="flex-1 border-t border-[#d8c8b7]" />

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>

                  <label className="block mb-2 text-sm font-semibold text-[#6b4a2a] uppercase tracking-wide">

                    Passcode

                  </label>

                  <input
                    required
                    name="password"
                    type="password"
                    placeholder="Create passcode"
                    onChange={handleChange}
                    className={`w-full rounded-2xl border-2 bg-white px-5 py-4 outline-none transition-all text-[#2b1408]
                    ${
                      errors.password
                        ? "border-red-500"
                        : "border-[#d5c1aa] focus:border-[#c4874a]"
                    }`}
                  />

                  {errors.password && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.password}
                    </p>
                  )}

                </div>

                <div>

                  <label className="block mb-2 text-sm font-semibold text-[#6b4a2a] uppercase tracking-wide">

                    Confirm Passcode

                  </label>

                  <input
                    required
                    name="conformpass"
                    type="password"
                    placeholder="Re-enter passcode"
                    onChange={handleChange}
                    className={`w-full rounded-2xl border-2 bg-white px-5 py-4 outline-none transition-all text-[#2b1408]
                    ${
                      errors.conformpass
                        ? "border-red-500"
                        : "border-[#d5c1aa] focus:border-[#c4874a]"
                    }`}
                  />

                  {errors.conformpass && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.conformpass}
                    </p>
                  )}

                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-16 rounded-2xl bg-[#1a0f07] hover:bg-[#2a160c] transition-all duration-300 text-[#f5e7d3] text-lg font-bold shadow-xl mt-4"
            >

              Submit Declaration

            </button>

          </form>

          <p className="text-center text-[#8a6a4a] mt-8">

            Already admitted?{" "}

            <Link
              to="/login"
              className="text-[#2b1408] font-semibold underline"
            >
              Sign in to the chamber
            </Link>

          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;