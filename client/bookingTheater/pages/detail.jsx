import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import Swal from "sweetalert2";

function Detail(){

    const [data,setData] = useState()
    const {id} = useParams()

    // console.log(id);

    async function fetchDataById(){
        try {
            const {data} = await axios({
                method : "get",
                url : "http://localhost:3000/movie/detail/" + id
            })

            // console.log(data);

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

    useEffect(()=>{
        fetchDataById()
    },[])
    return(
        <>
        <div>detail page</div>
        <div><img src={data && data.poster_path} alt="" /></div>
        <div>{data && data.title}</div>
        <div><Link to={`/movie/ticket/${data && data.id}`}>Buy Ticket</Link></div>

        
        </>
    )
}

export default Detail