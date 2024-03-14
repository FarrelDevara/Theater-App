import { useState } from "react"
import Swal from "sweetalert2"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

function Register(){
    const navigate = useNavigate()
    const[input,setInput] = useState({
        username : "",
        email : "",
        password : ""
    })

    function handleInput(event){
        const {name,value} = event.target

        setInput({
            ...input, [name] : value
        })
    }

    async function submitInput(event){
        event.preventDefault()
        try {

            const {data} = await axios({
                method : "post",
                url : "http://localhost:3000/register",
                data : input
              })
            //   console.log("berhasil");
              console.log(data);

            Swal.fire({
            title: 'Success',
            text: data.message,
            icon: 'success',
            confirmButtonText: 'Cool'
          })

          navigate('/login')
        
        } catch (error) {
            console.log(error);

        Swal.fire({
            title: 'Error!',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }
    }
    return(
        <>
        <div>
            <form action="" onSubmit={submitInput}>
                <label htmlFor="">Username</label>
                <input type="text" name="username" id="" onChange={handleInput}/>
                <label htmlFor="">Email</label>
                <input type="email" name="email" id="" onChange={handleInput}/>
                <label htmlFor="">Password</label>
                <input type="password" name="password" id="" onChange={handleInput}/>
                <button type="submit">Register</button>
            </form>
        </div>
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
    <h1 className="text-2xl font-semibold mb-4">Register</h1>
    <form onSubmit={submitInput}>
    <div className="mb-4">
        <label htmlFor="username" className="block text-gray-600">
          Username
        </label>
        <input
          type="text"
          id="email"
          name="username" 
          onChange={handleInput}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autoComplete="off"
        />
      </div>
      {/* Email Input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600">
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

      {/* Login Button */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Register
      </button>
    </form>
    {/* Sign up  Link */}
    <div className="mt-6 text-center">
        Already have an account?
      <Link to={"/login"} className="hover:underline mt-6 ml-1 text-blue-500">
       Login here
      </Link>
    </div>
    <div className="text-center mt-3"> -OR-</div>
    <div id="buttonDiv"></div>
  </div>
    
</div>
        </>
    )
}

export default Register