import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2";
import { fetchDataById } from "../../store/movieSlice";

function Detail(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [data,setData] = useState()

    const {id} = useParams()
    const {movies} = useSelector((state)=>state.movies)
    // console.log(id);

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

            // setTicket(data)
            navigate('/ticket/'+ data.id)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        dispatch(fetchDataById(id))
    },[])

    return(
        <>
        <div>detail page</div>
        <div><img src={movies && movies.poster_path} alt="" /></div>
        <div>{movies && movies.title}</div>
        <div><button onClick={createTicket}>Buy Ticket onclick</button></div>
        {/* <div><Link to={`/movie/ticket/${data && data.id}`}>Buy Ticket</Link></div> */}

        
        </>
    )
}

export default Detail