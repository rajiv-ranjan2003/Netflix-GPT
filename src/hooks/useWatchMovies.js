import { useDispatch, useSelector } from "react-redux"
import { API_options } from "../utils/constants"
import { useEffect } from "react"
import { addWatchMovies } from "../utils/moviesSlice"
const useWatchMovies=()=>{
    const dispatch=useDispatch()
    const watchMovies=useSelector((store)=>store.movies.watchMovies)
  const getWatchMovies=async()=>{
    const data=await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', API_options)
    const json=await data.json();
    console.log(json.results);
    dispatch(addWatchMovies(json.results))

  }
  useEffect(()=>{
   !watchMovies &&  getWatchMovies();
  },[])
 
}
export default useWatchMovies