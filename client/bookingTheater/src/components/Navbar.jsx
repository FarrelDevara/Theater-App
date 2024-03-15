import { useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Navbar() {
  const navigate = useNavigate()
  function Logout() {
    Swal.fire({
      title: "Do you want to logout?",
      showCancelButton: true,
      confirmButtonText: "Logout",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        localStorage.removeItem("access_token");
        Swal.fire("Logout successfully!", "", "success");
        navigate('/')
      }
    });
  }

  return (
    <>
      <nav>
        <div className="">
          <div className="flex justify-between h-16 px-10 shadow items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl lg:text-2xl font-bold cursor-pointer">
                Wadidaw Theater
              </h1>
              <div className="hidden md:flex justify-around space-x-4">
                <a href="#" className="hover:text-indigo-600 text-gray-700">
                  Home
                </a>
                <Link
                  to={"/my-ticket"}
                  className="hover:text-indigo-600 text-gray-700"
                >
                  Ticket
                </Link>
                <a href="#" className="hover:text-indigo-600 text-gray-700">
                  Contact
                </a>
              </div>
            </div>

            <div className="flex space-x-4 items-center">
              {!localStorage.access_token ? <Link to={'/login'} className="text-blue-800 text-sm">
                Login
              </Link> : ""}
              {localStorage.access_token ? (
                <button onClick={Logout} className="text-red-800 text-sm">
                  Logout
                </button>
              ) : (
                <button disabled className="text-gray-800 text-sm">
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
