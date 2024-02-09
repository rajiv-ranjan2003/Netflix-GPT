import { useDispatch, useSelector } from "react-redux"
import { API_options } from "../utils/constants"
import { useEffect } from "react"
import {  addHorrorMovies } from "../utils/moviesSlice"
const useHorrorMovies=()=>{
    const dispatch=useDispatch()
    const horrorMovies=useSelector((store)=>store.movies.horrorMovies)
  const getHorrorMovies=async()=>{
    const data=await fetch('https://api.themoviedb.org/27/movie/horror?page=1', API_options)
    const json=await data.json();
    console.log(json.results);
    dispatch(addHorrorMovies(json.results))

  }
  useEffect(()=>{
   !horrorMovies &&  getHorrorMovies();
  },[])
 
}
export default useHorrorMovies