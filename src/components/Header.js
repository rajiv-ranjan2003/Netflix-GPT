import { signOut } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser } from "../utils/userSlice";
import { removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlicer";
import { changeLanguage } from "../utils/configSlice";
// md-for desktops and sm for mobile phones
const Header = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const user=useSelector(sto => sto.user)
  const   showGptSearch=useSelector(store=>store.gpt.showGptSearch)
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      
    }).catch((error) => {
      navigate("/error")
    });
  }
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
        if (user) {
        const {uid,email,displayName} = user;
         dispatch(
          addUser({
          uid:uid,
          email:email,
          displayName:displayName
        })
          )
          navigate("/browse")
         
        } else {
          // User is signed out
          dispatch(removeUser())
          navigate("/")
          
        }
      });
      // unsubscribe when componenent unmounts
      return ()=> unsubscribe()
},[])
const handleGpt=()=>{
  dispatch(toggleGptSearchView())
}
const handleLanguageChange=(e)=>{
  // console.log(e.target.value);
  dispatch(changeLanguage(e.target.value))
}
  return (
    <div className=" absolute flex justify-between w-screen px-8 py-2 bg-gradient-to-b from-black-100 z-10 flex-col md:flex-row md:justify-between">
    <img className="w-40 mx-auto md:mx-0" src= {LOGO}alt="logo"/>
    {user && (
    <div className="flex p-2 justify-between">
      {showGptSearch && (<select onChange={handleLanguageChange} className="p-2 bg-black bg-opacity-70 text-sm font-light rounded-lg m-2 outline-none text-white">
        {SUPPORTED_LANGUAGES.map(lang=><option key={lang.identifier} value={
          lang.identifier
        }>{lang.name}
        </option>)}
      </select>)}
      <button className="py-2 px-4  font-bold text-lg text-white rounded-lg mx-4 my-2" onClick={handleGpt}>{showGptSearch? "Homepage":"GptSearch"}</button>
      <img  className=" hidden md:block w-12 h-12" alt="usericon" src= "https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"
     />
     <button onClick={handleSignOut} className="font-bold text-white ">(Sign Out)</button>
     </div>
     )} 
    </div>
  )
}

export default Header
