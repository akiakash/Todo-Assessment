import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  // State to hold the user's input
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State to hold an error message
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      // Make a POST request to your signup API endpoint
      const response = await axios.post(
        "https://vital-assessment-server-6rfy.vercel.app/authmanagement/signup",
        {
          username: formData.email,
          password: formData.password,
        }
      );

      // Handle the response (e.g., show a success message)
      console.log(response.data); // Log the response for debugging
      navigate("/");

      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });

      setErrorMessage("");
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error signing up:", error);
      console.log(formData.email);

      // Display an error message to the user
      setErrorMessage("An error occurred while signing up");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <section className="bg-gray-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-[#D7263D]"
          >
            <img
              className="w-[70px] h-[70px] mr-2"
              src="/logo.png"
              alt="logo"
            />
            Vital Mask TODO Task
          </a>
          <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0  ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-[#D7263D]">
                Create an account
              </h1>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-[#D7263D]"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    value={formData.email} // Bind the value to the state
                    onChange={handleChange} // Handle input changes
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-[#D7263D]"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={formData.password} // Bind the value to the state
                    onChange={handleChange} // Handle input changes
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-[#D7263D]"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={formData.confirmPassword} // Bind the value to the state
                    onChange={handleChange} // Handle input changes
                  />
                </div>
                {errorMessage && (
                  <p className="text-sm font-light text-red-500">
                    {errorMessage}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-[#D7263D] mt-[20px] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-[#D7263D]">
                  Already have an account yet?{" "}
                  <Link
                    to="/sigin"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
