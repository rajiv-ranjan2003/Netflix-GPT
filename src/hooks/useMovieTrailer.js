import { useDispatch,useSelector } from "react-redux"
import { useEffect } from "react"
import { API_options } from "../utils/constants"
import { addTrailerVideo } from "../utils/moviesSlice"
const useMovieTrailer=(movieid)=>{
    const dispatch=useDispatch()
    
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
    // const [trailerId,settrailerId]=useState(null)
    // fetch trailer video and updating the store
    const getMovieVideos=async ()=>{
      const data=await fetch("https://api.themoviedb.org/3/movie/572802/videos?language=en-US", API_options)
      const json=await data.json();
      console.log(json);
      const filterData=json.results.filter((video)=> video.type==="Trailer")
      const trailer=filterData.length ? filterData:json.results[0]
      console.log(trailer);
      // settrailerId(trailer.key) 1st way is to use the usestate
      // 2nd way is to store the trailer in the redux store
      dispatch(addTrailerVideo(trailer))
    }
    useEffect(()=>{

      !trailerVideo && getMovieVideos()
    },[])
}
export default useMovieTrailer