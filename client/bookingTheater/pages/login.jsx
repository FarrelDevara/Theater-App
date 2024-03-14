import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      console.log("berhasil");

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
      <div>
        <form action="" onSubmit={submitInput}>
          <label htmlFor="">Email</label>
          <input type="email" name="email" id="" onChange={handleInput} />

          <label htmlFor="">Password</label>
          <input type="password" name="password" id="" onChange={handleInput} />

          <button type="submit">Login</button>

          <div id="buttonDiv"></div>
        </form>
        
      </div>
    </>
  );
}

export default Login
