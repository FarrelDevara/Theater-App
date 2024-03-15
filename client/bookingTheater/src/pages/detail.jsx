import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2";

function Detail(){
    const navigate = useNavigate()
    const [data,setData] = useState()
    const {id} = useParams()

    // console.log(id);

    async function fetchDataById(){
        try {
            const {data} = await axios({
                method : "get",
                url : "http://localhost:3000/movie/detail/" + id
            })

            setData(data)
        } catch (error) {
            console.log(error);

            Swal.fire({
                title: "Error",
                text: "That thing is still around?",
                icon: "error"
              });
        }
    }

    const [ticket,setTicket] = useState()

    async function createTicket(){
        try {
            const { data } = await axios({
                method: "post",
                url : "http://localhost:3000/create-ticket/" + id,
                headers:{
                    Authorization : `Bearer ${localStorage.access_token}`
                }
            })

            navigate('/ticket/'+ data.id)

            console.log(data);
            setTicket(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchDataById()
    },[])
    return(
        <>
        <div>detail page</div>
        <div><img src={data && data.poster_path} alt="" /></div>
        <div>{data && data.title}</div>
        <div><button onClick={createTicket}>Buy Ticket onclick</button></div>
        {/* <div><Link to={`/movie/ticket/${data && data.id}`}>Buy Ticket</Link></div> */}

        
        </>
    )
}

export default Detail