import { Link } from "react-router-dom"

function Card(data){


return(
    <>
    
    <div class="s flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 mt-5 shadow-md">
  <div class="p-6">
    <img src="" alt="" /> img aja
  </div>
</div>
    <div>
    <div>{data.data.original_title}</div>
    <div><Link to={`/movie/detail/${data.data.id}`}>detail</Link></div>
    </div>
    </>
)
}

export default Card