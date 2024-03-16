import { Link } from "react-router-dom";

function Card(data) {
  console.log(data.data);
  return (
    <>
      {/* Show Card */}
      <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col mb-2">
        <img
          src={data.data.poster_path}
          alt="Show Image"
          className="w-full h-90 object-cover"
        />
        <div className="flex">
          <h3 className="text-xl font-bold mt-3">{data.data.original_title}</h3>
        </div>

        <div className="mt-auto">
          <Link
            to={`/movie/detail/${data.data.id}`}
            className="block text-center mt-4 bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Detail Movie
          </Link>
        </div>
      </div>
    </>
  );
}

export default Card;
