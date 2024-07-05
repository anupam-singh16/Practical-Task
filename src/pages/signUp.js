import React, { useState } from "react";

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userData, setUserData] = useState({
    firstName: fullName || "",
    email: email || "",
    password: password || "",
  });

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    setFullNameError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!fullName) {
      setFullNameError("Full Name is required.");
      valid = false;
    }

    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password.");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      valid = false;
    }

    if (valid) {
      localStorage.setItem(
        "userData",
        JSON.stringify({ fullName, email, password })
      );
      // Proceed with form submission or API call
      console.log("Form submitted:", { fullName, email, password });

      // Reset form fields after submission (if needed)
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFormError("");
    } else {
      setFormError("Please fix the errors above.");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-center mb-6">
          {/* Your SVG and title */}
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Create a new account
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your details to register.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              className={`form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 ${
                fullNameError && "border-red-500"
              }`}
              value={fullName}
              onChange={handleFullNameChange}
              placeholder="James Brown"
            />
            {fullNameError && (
              <p className="text-red-500 text-xs mt-1">{fullNameError}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              className={`form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 ${
                emailError && "border-red-500"
              }`}
              value={email}
              onChange={handleEmailChange}
              placeholder="example@example.com"
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Password *
            </label>
            <input
              type="password"
              id="password"
              className={`form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 ${
                passwordError && "border-red-500"
              }`}
              value={password}
              onChange={handlePasswordChange}
              placeholder="********"
            />
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={`form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 ${
                confirmPasswordError && "border-red-500"
              }`}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="********"
            />
            {confirmPasswordError && (
              <p className="text-red-500 text-xs mt-1">
                {confirmPasswordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register
          </button>
          {formError && (
            <p className="text-red-500 text-xs text-center mt-2">{formError}</p>
          )}
          <p className="text-gray-600 text-xs text-center mt-4">
            By clicking Register, you agree to accept Apex Financial's
            <a href="#" className="text-blue-500 hover:underline">
              Terms and Conditions
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
