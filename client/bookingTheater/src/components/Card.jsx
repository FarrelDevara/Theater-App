import { Link } from "react-router-dom"

function Card(data){


return(
    <>
    {/* <div>Card ceritanya</div> */}
    <div>
    <div>{data.data.original_title}</div>
    <div><Link to={`/movie/detail/${data.data.id}`}>detail</Link></div>
    </div>
    </>
)
}

export default Card