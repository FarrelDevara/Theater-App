import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTicket } from "../../store/ticketSlice";
import { fetchDataById } from "../../store/movieSlice";
import axios from "axios";
import { BASE_URL } from "../../constant";

function MyTicket() {
  const dispatch = useDispatch();

  const { tickets } = useSelector((state) => state.tickets);

  console.log(tickets);

  

  useEffect(() => {
    dispatch(fetchTicket());
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-5 mr-5 ml-5">
  {Array.isArray(tickets) &&
    tickets.length > 0 &&
    tickets.map((item) => (
      <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col">
        <div className="p-4">
          <h3 className="text-xl font-bold">{item.movieName}</h3>
          {item.paymentStatus ? (
            <button className="bg-red-400 text-white py-2 px-4 rounded mt-3" disabled>Sudah membayar</button>
          ) : (
            <Link to={`/ticket/${item.id}`} className="text-blue-500 hover:underline">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-3">Lanjutkan pembayaran</button>
            </Link>
          )}
        </div>
      </div>
    ))}
</div>



    </>
  );
}

export default MyTicket;
