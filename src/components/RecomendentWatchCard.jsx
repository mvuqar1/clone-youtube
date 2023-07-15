import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { YOUTUBE_API_URL } from "../utils/constants";
import { currentPlay, recommendedPageVideos } from "../Redux/reducers/YoutubeSlice";
import { useDispatch, useSelector } from "react-redux";

export default function RecomendentWatchCard({ id, channelId }) {
    const navigate=useNavigate()

    const dispatch=useDispatch()
    const recomendentVideos = useSelector((state) => state.youtube.recommendedVideos)
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
    useEffect(() => {
        const RecomentendPage = async () => {
            try {
                const response = await fetch(`${YOUTUBE_API_URL}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=video&videoId=${id}`)
                const data = await response.json()
                dispatch(recommendedPageVideos(data))
            } catch (error) {
                console.log(error)
            }
        }
        RecomentendPage()
    }, [API_KEY, channelId, dispatch, id])
    
    const handleSave=(e,item)=>{
        e.preventDefault()
        dispatch(currentPlay(item))
        // dispatch(clearRecommendedPageVideos())
        console.log(item)

        navigate(`/watch/${item.id.videoId}`)
      }

      console.log(recomendentVideos)

    return (
    <>
    {recomendentVideos && recomendentVideos.map((item,index)=>(
        <div key={index} className="flex gap-3">
          <div className="relative min-w-fit">
            <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
              {/* {item.videoDuration} */}
            </span>
            <Link onClick={(e)=>handleSave(e,item)}>
              <img
                src={item.snippet.thumbnails.high.url}
                className="h-24 w-40"
                alt="thumbnail"
              />
            </Link>
          </div>
          <div className="flex gap-1 flex-col">
            <h4 className="text-sm">
              <Link href="#" className="line-clamp-2">
                {item.snippet.title}
              </Link>
            </h4>
            <div className="text-xs text-grap-400">
              <div>
                <Link href="#" className="hover:text-white">
                  {item.snippet.channelTitle}
                </Link>
              </div>
              <div>
                <div>
                  <span className="after:content-['•'] after:mx-1">
                    {/* {item?.videoViews} views */}
                  </span>
                  {/* <span>{item?.videoAge}</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
    ))}
    </>
    );
}