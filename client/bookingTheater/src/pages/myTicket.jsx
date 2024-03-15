import axios from "axios";
import { useDebugValue, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTicket } from "../../store/ticketSlice";

function MyTicket(){

    const dispatch = useDispatch()

    const {tickets} = useSelector((state)=>state.tickets)

    useEffect(()=>{
        dispatch(fetchTicket())
    },[])

    return(
        <>
        
        {tickets && tickets?.map((item)=>(
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