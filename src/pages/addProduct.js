import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

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
      setFullNameError("Title is required.");
      valid = false;
    }

    if (!email) {
      setEmailError("Price is required.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Description is required.");
      valid = false;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Image is required.");
      valid = false;
    }

    if (valid) {
      fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify({
          title: fullName,
          price: email,
          description: password,
          image: confirmPassword,
          category: "electronic",
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          alert("Product Added");
          navigate("/product");
        });
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
        <div className="flex justify-center mb-6"></div>
        <h2 className="text-2xl font-semibold text-center mb-4">Add Product</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="fullName"
              className={`form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 ${
                fullNameError && "border-red-500"
              }`}
              value={fullName}
              onChange={handleFullNameChange}
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
              Price
            </label>
            <input
              type="text"
              id="email"
              className={`form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 ${
                emailError && "border-red-500"
              }`}
              value={email}
              onChange={handleEmailChange}
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
              Description
            </label>
            <input
              type="text"
              id="password"
              className={`form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 ${
                passwordError && "border-red-500"
              }`}
              value={password}
              onChange={handlePasswordChange}
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
              Image
            </label>
            <input
              type="text"
              id="confirmPassword"
              className={`form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 ${
                confirmPasswordError && "border-red-500"
              }`}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
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
            Add Product
          </button>
          {formError && (
            <p className="text-red-500 text-xs text-center mt-2">{formError}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
