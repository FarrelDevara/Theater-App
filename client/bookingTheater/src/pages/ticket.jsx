import { useParams } from "react-router-dom"
import axios from 'axios'
import { useEffect, useState } from "react";
function Ticket(){
    const {ticketId} = useParams()
    // console.log(ticketId);
    const [ticket,setTicket] = useState()
    
    async function fetchTicket(){
        try {
            const {data} = await axios({
                method:"get",
                url : "http://localhost:3000/ticket/" + ticketId,
                headers:{
                    Authorization : "Bearer " + localStorage.access_token
                }
            })

            setTicket(data)
        } catch (error) {
            console.log(error);
        }
    }

    const handlePayment = () => {
        let payButton = document.getElementById('pay-button');
    
        // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
        window.snap.pay('89eef0c8-f277-45e5-aaba-b039f9585143', {
          onSuccess: function(result){
            /* You may add your own implementation here */
            alert("payment success!"); console.log(result);
          },
          onPending: function(result){
            /* You may add your own implementation here */
            alert("wating your payment!"); console.log(result);
          },
          onError: function(result){
            /* You may add your own implementation here */
            alert("payment failed!"); console.log(result);
          },
          onClose: function(){
            /* You may add your own implementation here */
            alert('you closed the popup without finishing the payment');
          }
        })
      
    }
    console.log(ticket);

    useEffect(()=>{
        fetchTicket()
    },[])

    return(
        <>
        <div>ticket</div>
        <div>
            <p>{ticket && ticket.movieName}</p>
            <p>{ticket && ticket.price}</p>

            <button onClick={handlePayment}> Payment </button>
        </div>
        </>
    )
}

export default Ticket