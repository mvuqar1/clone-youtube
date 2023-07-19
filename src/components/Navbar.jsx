import React from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { TiMicrophone } from "react-icons/ti";
import { BsYoutube, BsCameraVideo, BsBell } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoAppsSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { changeSearchTerm, clearSearchTerm, clearVideos} from "../Redux/reducers/YoutubeSlice";
import { useDispatch, useSelector } from "react-redux";
import me from "../utils/me.png"


export default function Navbar() {
  const searchTerm=useSelector((state)=>state.youtube.searchTerm)

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault()
    if (location.pathname !== "/search") navigate("/search");
    dispatch(clearVideos());
  };

  const clearSearch = () => {
    dispatch(clearSearchTerm())
    dispatch(clearVideos());
    navigate("/")
  };



  return (
    <div className="flex justify-between items-center px-2  md:px-14 h-14 bg-[#212121] opacity-95 sticky top-0 z-50">
      <div className="flex gap-1 md:gap-8 items-center text-2xl">
        <div className="hidden md:block">
          <GiHamburgerMenu />
        </div>
        <Link to="/">
          <div className="flex gap-2 items-center justify-center">
            <BsYoutube className="text-3xl text-red-600" />
            <span className="text-xl font-medium hidden md:block">YouTube</span>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-2 md:gap-5">
        <form onSubmit={handleSearch}>
          <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0">
            <div className="flex gap-4 items-center pr-5">
              <div>
                <AiOutlineSearch className="text-xl"  />
              </div>
              <input
                type="text"
                value={searchTerm}
                className="w-24 md:w-96 bg-zinc-900 focus:outline-none border-none"
                onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
              />

              <AiOutlineClose
                className={`text-xl cursor-pointer` }
                onClick={clearSearch}
              />
            </div>
            <button type="submit" className="h-10 w-7 md:w-16 flex items-center justify-center bg-zinc-800">
              <AiOutlineSearch className="text-xl" onClick={handleSearch} />
            </button>
          </div>
        </form>
        <div className="hidden md:block text-xl p-3 bg-zinc-900 rounded-full">
          <TiMicrophone />
        </div>
      </div>
      <div className="flex gap-5 items-center text-xl">
        <BsCameraVideo className="hidden md:block" />
        <IoAppsSharp className="hidden md:block" />
        <div className="relative hidden md:block">
          <BsBell />
          <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">
            9+
          </span>
        </div>
        <img
          src={me}
          className="w-9 h-9 rounded-full"
          alt="logo"
        />
      </div>
    </div>
  )
}
