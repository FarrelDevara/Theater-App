import { useState } from "react";
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
  return (
    <>
      <div>
        <form action="" onSubmit={submitInput}>
          <label htmlFor="">Email</label>
          <input type="email" name="email" id="" onChange={handleInput} />
          <label htmlFor="">Password</label>
          <input type="password" name="password" id="" onChange={handleInput} />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login
