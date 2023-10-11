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
  //       "https://vital-assessment-server-6rfy.vercel.app/authmanagement/signin",
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
  //       "https://vital-assessment-server-6rfy.vercel.app/authmanagement/signin/",
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

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://vital-assessment-server-6rfy.vercel.app/authmanagement/signin/",
        {
          username: email,
          password,
        }
      )
      .then((response) => {
        // Check if the email is 'akash@gmail.com' and the password is 'akash'
        if (email === "akash@gmail.com" && password === "akash") {
          console.log("phase2");
          navigate("/todo"); // Navigate to /todo for admin
        } else {
          // Set the user ID to session storage
          sessionStorage.setItem("userId", response.data.userId);
          navigate("/userpage"); // Navigate to /userpage for regular users
        }
      })
      .catch((error) => {
        alert("User name or Password is incorrect");
        console.error("Server error", error);
      });
  };

  return (
    <div>
      <section className="bg-gray-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-2xl font-semibold text-[#D7263D]">
            <img
              className="w-[70px] h-[70px] mr-2"
              src="/logo.png"
              alt="logo"
            />
            Vital Mask TODO Task
          </div>

          <div className="w-full bg-white rounded-lg shadow-lg  md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-[#D7263D]">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-[#D7263D]"
                  >
                    Your email
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-[#D7263D]">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a className="text-sm font-medium text-primary-600 hover:underline text-[#D7263D]">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  onClick={handleLogin}
                  className="w-full text-white bg-[#D7263D] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-[#D7263D]">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
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
