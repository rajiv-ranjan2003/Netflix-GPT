import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4 hover:scale-150 transition duration-200 ease-out hover:ease-in rounded-md hover:m-9  cursor-pointer  hover:overflow-hidden ">
      <img alt="Movie Card" src={IMG_CDN + posterPath} className="rounded-md" />
    </div>
  );
};
export default MovieCard;