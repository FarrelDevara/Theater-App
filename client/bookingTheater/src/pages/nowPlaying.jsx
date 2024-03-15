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
        {movies && movies?.results?.map((item)=>(
        <Card data={item}/>
        ))}
        
        </>
    )
}

export default NowPlaying