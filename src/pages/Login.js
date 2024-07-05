import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [user, setUser] = useState();

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
    console.log(
      valid,
      fullName === user?.email,
      password === user?.password,
      "ghjk"
    );
    if (valid && email === user?.email && password === user?.password) {
      // Proceed with form submission or API call
      navigate("/product");
      console.log("Form submitted:", { fullName, email, password });

      // Reset form fields after submission (if needed)
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFormError("");
    } else {
      setFormError("Email or Password Wrong");
    }
  };
  console.log(user, "user");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUser(userData);
  }, []);

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-center mb-6">
          {/* Your SVG and title */}
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Login your account
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your details to Login.
        </p>
        <form>
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

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
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
