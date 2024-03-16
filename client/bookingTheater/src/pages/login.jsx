import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from 'axios'

function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function handleInput(event) {
    const { name, value } = event.target;

    setInput({
      ...input,
      [name]: value,
    });
  }

  async function submitInput(event) {
    event.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/login",
        data: input,
      });
      // console.log("berhasil");

      localStorage.setItem("access_token", data.access_token);

      navigate("/");
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  }

  async function handleCredentialResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);

    try {
      const {data} = await axios.post("http://localhost:3000/google-login",{
        googleToken: response.credential
      })

      // console.log(data.access_token, "<<<<<<<<<<<<<<,");

      localStorage.setItem("access_token", data.access_token)
      // console.log(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(()=>{
    
    window.onload = function () {
      google.accounts.id.initialize({
        client_id: "224565751584-3eu74pi5cvbq0n5v1j62e72oar9c6n5s.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    }
  })

  
  return (
    <>

      <div className="bg-gray-100 flex justify-center items-center h-screen">
  {/* Left: Image */}
  <div className="w-1/2 h-screen hidden lg:block">
    <img
      src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
      alt="Placeholder Image"
      className="object-cover w-full h-full"
    />
  </div>
  {/* Right: Login Form */}
  <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
    <h1 className="text-2xl font-semibold mb-4">Login</h1>
    <form onSubmit={submitInput}>
      {/* Username Input */}
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-600">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email" 
          onChange={handleInput}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autoComplete="off"
        />
      </div>
      {/* Password Input */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-600">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleInput}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autoComplete="off"
        />
      </div>
      {/* Remember Me Checkbox */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="remember"
          name="remember"
          className="text-blue-500"
        />
        <label htmlFor="remember" className="text-gray-600 ml-2">
          Remember Me
        </label>
      </div>
      {/* Forgot Password Link */}
      <div className="mb-6 text-blue-500">
        <Link to={'/forget-password'} className="hover:underline">
          Forgot Password?
        </Link>
      </div>
      {/* Login Button */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Login
      </button>
    </form>
    {/* Sign up  Link */}
    <div className="mt-6 text-blue-500 text-center">
      <Link to={"/register"} className="hover:underline">
        Sign up Here
      </Link>
    </div>
    <div className="text-center mt-3"> -OR-</div>
    <div id="buttonDiv" className="flex items-center justify-center mt-3"></div>
  </div>
    
</div>

    </>
  );
}

export default Login
