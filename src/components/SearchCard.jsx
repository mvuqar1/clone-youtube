import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import{currentPlay} from "../Redux/reducers/YoutubeSlice"

export default function SearchCard({data}) {

  const [videoAge, setVideoAge] = useState('');
  const navigate=useNavigate()
  const dispatch=useDispatch()

  useEffect(() => {
    const publishedDate = new Date(data.snippet.publishedAt);
    const currentDate = new Date();

    const yearsAgo = currentDate.getFullYear() - publishedDate.getFullYear();
    const monthsAgo = currentDate.getMonth() - publishedDate.getMonth();
    const daysAgo = currentDate.getDate() - publishedDate.getDate();

    if (yearsAgo > 0) {
      setVideoAge(`${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} `);
    } else if (monthsAgo > 0) {
      setVideoAge(`${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} `);
    } else {
      setVideoAge(`${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} `);
    }
  }, [data.snippet.publishedAt]);

  const handleSave=(e)=>{
    e.preventDefault()
    dispatch(currentPlay(data))
    
    navigate(`/watch/${data.id.videoId}`)
  }

  return (
    <div className="flex gap-3">
      <div className="relative">
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
          {/* {data.videoDuration} */}
        </span>
        <Link  onClick={(e)=>handleSave(e,data)}>
          <img
            src={data.snippet.thumbnails.high.url}
            className="h-52 w-96"
            alt="thumbnail"
          />
        </Link>
      </div>
      <div className="flex gap-1 flex-col">
        <h3 className="max-w-2xl">
          <Link href="#" className="line-clamp-2">
            {data.snippet.title}
          </Link>
        </h3>
        <div className="text-xs text-grap-400">
          <div>
            <div>
              <span className="after:content-['•'] after:mx-1">
                {/* {data.videoViews} views */}
              </span>
              <span>{videoAge}</span>
            </div>
          </div>
        </div>
        <div className="min-w-fit my-2">
          <Link href="#" className="flex items-center gap-2 text-xs text-gray-400">
            <img
              src={data.snippet.thumbnails.default.url}
              alt="channel"
              className="h-9 w-9 rounded-full"
            />
            <span>{data.snippet.channelTitle}</span>
          </Link>
        </div>
        <div className="max-w-2xl line-clamp-2 text-sm text-gray-400">
          <p>{data.snippet.description}</p>
        </div>
      </div>
    </div>
  );
}