import { useState } from "react"
import Swal from "sweetalert2"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

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
        </>
    )
}

export default Register