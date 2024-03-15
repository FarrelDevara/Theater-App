import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

function MyTicket(){

    const [data,setData] = useState()

    async function fetchTicket(){
        try {
            const {data} = await axios({
                method : "get",
                url : "http://localhost:3000/my-ticket",
                headers:{
                    Authorization : "Bearer " + localStorage.access_token
                }
            })

            setData(data)
        } catch (error) {
            console.log(error);
        }
    }

    console.log(data);

    useEffect(()=>{
        fetchTicket()
    },[])
    return(
        <>
        
        {data && data.map((item)=>(
            <div key={item.id}>
                <p>{item.movieName}</p>
            <p>{item.price}</p>
            {item.paymentStatus === true ? <p>Sudah membayar</p> : <Link to={`/ticket/${item.id}`}>Lanjutkan pembayaran</Link> }
            </div>
        ))}
        </>
    )
}

export default MyTicket