import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ForgetPassword(){

    const navigate = useNavigate();
    const [input, setInput] = useState({
      email: "",
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
          url: "http://localhost:3000/forget-password",
          data: input,
        });
        console.log("berhasil");
        console.log(data);
        // navigate("/");
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
    <h1 className="text-2xl font-semibold mb-4">Forget Password</h1>
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
      {/* Login Button */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      > 
        Submit
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
    )
}

export default ForgetPassword