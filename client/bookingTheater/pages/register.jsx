import { useState } from "react"

function Register(){
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

    async function submitInput(){
        try {
            
        } catch (error) {
            
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