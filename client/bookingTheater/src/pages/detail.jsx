import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchDataById } from "../../store/movieSlice";

function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [data,setData] = useState()

  const { id } = useParams();
  const { movies } = useSelector((state) => state.movies);
  // console.log(id);

  const [ticket, setTicket] = useState();

  async function createTicket() {
    try {
      if (localStorage.access_token) {
        const { data } = await axios({
            method: "post",
            url: "http://localhost:3000/create-ticket/" + id,
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          });
    
          // setTicket(data)
          navigate("/ticket/" + data.id);
      }else{
        Swal.fire({
            title: 'Error!',
            text: "Please Login if you want to continue",
            icon: 'error',
            confirmButtonText: 'Cool'
          })
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(fetchDataById(id));
  }, []);

  return (
    <>
     <div className="w-3/4 mx-auto mt-10 flex items-start">
  <div className="w-1/3 pr-8">
    <img
      src={movies && movies.poster_path}
      alt={movies && movies.title}
      className="w-full h-auto rounded-lg shadow-md"
    />
  </div>
  <div className="w-2/3 flex flex-col justify-start">
    <h2 className="text-3xl font-bold mb-4">{movies && movies.title}</h2>
    <p className="text-gray-700 mb-4 text-lg">{movies && movies.overview}</p>
    <button
      onClick={createTicket}
      className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 text-lg"
    >
      Buy Ticket
    </button>
  </div>
</div>



    </>
  );
}

export default Detail;
