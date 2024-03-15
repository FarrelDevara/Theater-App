import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import { useEffect, useState } from "react";
function Ticket(){
    const {ticketId} = useParams()
    const navigate = useNavigate()
    // console.log(ticketId);
    const [ticket,setTicket] = useState()
    const [tokenPayment, setTokenPayment] = useState()

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

    // console.log(tokenPayment);
    const handlePayment = async () => {

        const { data} = await axios({
            method : "post",
            url : "http://localhost:3000/payment",
            headers : {
                Authorization : "Bearer "+ localStorage.access_token
            }
        })
        // console.log(data.order_id);

        let payButton = document.getElementById('pay-button');
        console.log(data,"<< data");
    
        // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
        window.snap.pay(data.transactionToken, {
          onSuccess: async function(result){
            /* You may add your own implementation here */
            alert("payment success!"); console.log(result);

            await axios({
                method : "patch",
                url : "http://localhost:3000/payment/status/" + ticketId,
                headers : {
                    Authorization : "Bearer "+ localStorage.access_token
                }
            })
            navigate('/my-ticket')
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
    // console.log(ticket);

    useEffect(()=>{
        fetchTicket()
    },[])

    return(
        <>
        <div>ticket</div>
        <div>
            <p>{ticket && ticket.movieName}</p>
            <p>{ticket && ticket.price}</p>

            {ticket && (ticket.paymentStatus === false) ? 
            <button onClick={handlePayment}> Payment </button> : <button onClick={handlePayment} disabled> Already Paid </button>
            }
        </div>
        </>
    )
}

export default Ticket