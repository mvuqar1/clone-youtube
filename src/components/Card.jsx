import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { currentPlay } from "../Redux/reducers/YoutubeSlice";

export default function Card({data}) {
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
    // console.log(data)

    navigate(`/watch/${data.id.videoId}`)
  }
  
  return (
    <div className="w-full h-52 sm:h-64 md:w-64 md:h-60 flex gap-3 flex-col">
      <div className="relative">
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
          {/* {data.videoDuration} */}
        </span>
        <Link onClick={(e)=>handleSave(e,data)}>
          <img
            src={data.snippet.thumbnails.medium.url}
            className="w-full max-h-44 md:max-h-56 bg-contain lg:h-44 lg:w-72 "
            alt="thumbnail"
          />
        </Link>
      </div>
      <div className="flex gap-2 ">
        <div className="min-w-fit">
          <Link href="#">
            <img
              src={data.snippet.thumbnails.default.url}
              alt="channel"
              className="h-9 w-9 rounded-full"
            />
          </Link>
        </div>
        <div>
          <h3>
            <Link href="#" className="line-clamp-2">
              {data.snippet.title}
            </Link>
          </h3>
          <div className="text-sm text-gray-400">
            <div>
              <Link href="#" className="hover:text-white">
                {data.snippet.channelTitle}
              </Link>
            </div>
            <div>
              <span className="after:content-['•'] after:mx-1">
                {/* {data.videoViews} views */}
              </span>
              <span>{videoAge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}