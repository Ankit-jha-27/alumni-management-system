import React, { useState } from "react";
import { authApi } from "../lib/api";

const roles = [
  { label: "Faculty", value: "faculty" },
  { label: "Current Student", value: "student" },
  { label: "Alumni", value: "alumni" },
];

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) errs.email = "Valid email required.";
    if (form.password.length < 6) errs.password = "Password must be at least 6 characters.";
    if (!form.role) errs.role = "Role is required.";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await authApi.signup(form);
      setSuccess("Registration successful! You can now log in.");
      setForm({ name: "", email: "", password: "", role: "student" });
    } catch (err) {
      setErrors({ api: err.message });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <form
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="text-2xl font-bold text-blue-700 dark:text-cyan-300 mb-2 text-center">Sign Up</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">Register as Faculty, Student, or Alumni</p>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-cyan-400 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-700"}`}
            autoComplete="name"
          />
          {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name}</span>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-cyan-400 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-700"}`}
            autoComplete="email"
          />
          {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-cyan-400 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-700"}`}
            autoComplete="new-password"
          />
          {errors.password && <span className="text-xs text-red-500 mt-1">{errors.password}</span>}
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Role</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-cyan-400 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${errors.role ? "border-red-500" : "border-gray-300 dark:border-gray-700"}`}
          >
            {roles.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          {errors.role && <span className="text-xs text-red-500 mt-1">{errors.role}</span>}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-gray-900"
          disabled={loading}
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>
  {success && <div className="text-green-600 dark:text-green-400 text-sm text-center mt-2">{success}</div>}
  {errors.api && <div className="text-red-500 text-sm text-center mt-2">{errors.api}</div>}
      </form>
    </div>
  );
};

export default Signup;
