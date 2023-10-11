import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  // State to hold the user's input
  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  // });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Function to handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Make a POST request to your signup API endpoint
  //     const response = await axios.post(
  //       "http://localhost:9999/authmanagement/signin",
  //       formData
  //     );

  //     // Handle the response (e.g., show a success message)
  //     console.log(response.data); // Log the response for debugging
  //     navigate("/todo", { state: { isAuthenticated: true } });
  //     // Clear the form after successful signup (you can also redirect the user)
  //     setFormData({
  //       email: "",
  //       password: "",
  //     });
  //   } catch (error) {
  //     // Handle errors (e.g., show an error message)
  //     console.error("Error signing up:", error);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Make a POST request to your signin API endpoint
  //     const response = await axios.post(
  //       "http://localhost:9999/authmanagement/signin/",
  //       formData
  //     );

  //     console.log("Response data:", response.data); // Log the response for debugging

  //     // Check if the user is the admin
  //     if (
  //       formData.username === "akash@gmail.com" &&
  //       formData.password === "akash"
  //     ) {
  //       console.log("User email:", formData.username);
  //       // Redirect to /todo if it's the admin
  //       navigate("/todo", { state: { isAuthenticated: true } });
  //     } else {
  //       // Handle the response data here for non-admin users
  //       if (response.data.isAuthenticated) {
  //         sessionStorage.setItem("userId", response.data.userId);
  //         navigate("/userpage", { state: { isAuthenticated: true } });
  //       } else {
  //         alert("User name or Password is Incorrect");
  //       }
  //     }

  //     // Clear the form after successful signin
  //     setFormData({
  //       username: "",
  //       password: "",
  //     });
  //   } catch (error) {
  //     // Handle errors
  //     console.error("Error signing in:", error);
  //     alert("User name or Password is Incorrect");
  //   }
  // };

  // // Function to handle input changes
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9999/authmanagement/signin/",
        {
          username: email,
          password,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        const { userId } = data;

        // Check if the email is 'admin@gmail.com' and the password is 'Admin'
        if (email === "akash@gmail.com" && password === "akash") {
          navigate("/todo"); // Navigate to /todo for admin
        } else {
          sessionStorage.setItem("userId", response.data.userId);
          navigate("/userpage"); // Navigate to /userpage for regular users
        }
      } else {
        // Authentication failed
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Server error", error);
    }
  };

  return (
    <div>
      <section class="bg-gray-100">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            class="flex items-center mb-6 text-2xl font-semibold text-[#cd5c5c]"
          >
            <img
              className="w-[70px] h-[70px] mr-2"
              src="/logo.png"
              alt="logo"
            />
            Vital Mask TODO Task
          </a>
          <div class="w-full bg-white rounded-lg shadow-lg  md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-[#cd5c5c]">
                Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-[#cd5c5c]"
                  >
                    Your email
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-[#cd5c5c]"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="remember" class="text-[#cd5c5c]">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    class="text-sm font-medium text-primary-600 hover:underline text-[#cd5c5c]"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  onClick={handleLogin}
                  class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p class="text-sm font-light text-[#cd5c5c]">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
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

export default SignIn;
