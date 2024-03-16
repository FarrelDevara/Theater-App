import axios from 'axios'
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../store/movieSlice';

function NowPlaying(){

const dispatch = useDispatch()

const {movies} = useSelector((state)=>state.movies)

useEffect(()=>{
 dispatch(fetchData())
}
,[])

    return(
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-5 mr-5 ml-5">
        {movies && movies?.results?.map((item)=>(
        <Card data={item}/>
        ))}
        </div>
        
        </>
    )
}

export default NowPlaying