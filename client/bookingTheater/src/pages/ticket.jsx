import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketById } from "../../store/ticketSlice";
import { fetchDataById } from "../../store/movieSlice";
import { BASE_URL } from "../../constant";
function Ticket() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  // console.log(ticketId);
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);
  const { movies } = useSelector((state) => state.movies);

  const handlePayment = async () => {
    const { data } = await axios({
      method: "post",
      url: "http://localhost:3000/payment",
      headers: {
        Authorization: "Bearer " + localStorage.access_token,
      },
    });
    // console.log(data.order_id);

    let payButton = document.getElementById("pay-button");
    console.log(data, "<< data");

    // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
    window.snap.pay(data.transactionToken, {
      onSuccess: async function (result) {
        /* You may add your own implementation here */
        alert("payment success!");
        console.log(result);

        await axios({
          method: "patch",
          url: "http://localhost:3000/payment/status/" + ticketId,
          headers: {
            Authorization: "Bearer " + localStorage.access_token,
          },
        });
        navigate("/my-ticket");
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        alert("wating your payment!");
        console.log(result);
      },
      onError: function (result) {
        /* You may add your own implementation here */
        alert("payment failed!");
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });
  };
  // console.log(movies);

  async function deleteTicket(){
    try {
      const {data} = await axios({
        method : "delete",
        url : `${BASE_URL}/ticket/delete/${ticketId}`,
        headers:{
          Authorization: `Bearer ` + localStorage.access_token
        }
      })

      navigate('/my-ticket')
      console.log("berhasil delete");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(fetchTicketById(ticketId));
  }, [dispatch, ticketId]);

  useEffect(() => {
    if (tickets && tickets.MovieId) {
      dispatch(fetchDataById(tickets.MovieId));
    }
  }, [dispatch, tickets]);

  return (
    <>
      <div className="max-w-md mt-4 bg-white rounded-lg overflow-hidden p-6">
        <h2 className="text-2xl font-bold mb-4">Ticket</h2>
        <div className="mb-4">
          <img src={movies.poster_path} alt="" />
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold">Movie Name:</div>
          <div>{tickets && tickets.movieName}</div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold">Price:</div>
          <div>Rp. {tickets && tickets.price}</div>
        </div>
        <div className="flex justify-center">
          {tickets && !tickets.paymentStatus ? (
            <button
              onClick={handlePayment}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Payment
            </button>
          ) : (
            <button
              disabled
              className="bg-gray-500 text-white py-2 px-4 rounded cursor-not-allowed"
            >
              Already Paid
            </button>
          )}
        </div>
        <button onClick={deleteTicket}>Delete</button>
      </div>
    </>
  );
}

export default Ticket;
