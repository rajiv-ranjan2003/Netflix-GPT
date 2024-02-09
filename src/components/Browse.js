
import Header from "./Header"
import useNowPlayingMovies from "../hooks/useNowPLayingMovies"
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"
import usePopularMovies from "../hooks/usePopularMovies"
import useUpcomingMovies from "../hooks/useUpcomingMovies"
import useTopRatedMovies from "../hooks/useTopRated"
import useHorrorMovies from "../hooks/useHorrorMovies"
import GptSearch from "./GptSearch"
import { useSelector } from "react-redux"
import useWatchMovies from "../hooks/useWatchMovies"
const Browse = () => {
const showGptSearch=useSelector(store=>store.gpt.showGptSearch)
 useNowPlayingMovies()
 usePopularMovies()
 useUpcomingMovies()
 useTopRatedMovies()
 useWatchMovies()
//  useHorrorMovies()
  return (
    <div>
      <Header/>
      {
        showGptSearch?(
        <GptSearch/>
        ):(
          <>
        <MainContainer/>
        <SecondaryContainer/>
          </>
        )
      }
      
      
    </div>
  )
}

export default Browse
