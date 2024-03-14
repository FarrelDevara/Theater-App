import axios from 'axios'
import { useEffect, useState } from 'react';
import Card from '../components/Card';

function NowPlaying(){

    const [data, setData] = useState()

async function fetchData(){
    try {
        const {data} = await axios({
            method:"get",
            url: "http://localhost:3000/getMovies"
        })
        // console.log(data);
        setData(data)
    } catch (error) {
        console.log(error);
    }
}

useEffect(()=>{
 fetchData()
}
,[])

    return(
        <>
        {data && data.results.map((item)=>(
        <Card data={item}/>
        ))}
        
        </>
    )
}

export default NowPlaying