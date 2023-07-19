import Navbar from '../components/Navbar';
import { useParams } from "react-router-dom";


import { BiLike, BiDislike } from "react-icons/bi";
import { HiScissors } from "react-icons/hi";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import RecomendentWatchCard from '../components/RecomendentWatchCard';


export default function Watch() {
  const [videoAge, setVideoAge] = useState('');

  const currentPlaying = useSelector((state) => state.youtube.currentPlaying)
  const {id} = useParams()
  // console.log(currentPlaying)
  // console.log(currentPlaying,id)

  
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value

    return () => window.removeEventListener('resize', handleResize);
  }, []);



  useEffect(() => {
    const publishedDate = new Date(currentPlaying.snippet.publishedAt);
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
  }, [currentPlaying.snippet.publishedAt]);
  return (
    <>
      {currentPlaying && currentPlaying?.id.videoId === id && (
        <div className="max-h-screen overflow-hidden">
          <div style={{ height: "7.5vh" }}>
            <Navbar />
          </div>
          <div className="flex w-full" style={{ height: "92.5vh" }}>
            <div className="block md:flex gap-y-10 gap-x-5 p-2 md:p-7 mx-4 md:mx-20 mr-0 w-full overflow-auto">
              <div style={{ maxWidth: "800px" }}>
                <div>
                <iframe
                width={isSmallScreen ? "100%" : "800"}
                height={isSmallScreen ? "300" : "502"}
                src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
                  <div className="mt-5">
                    <p className="text-xl">{currentPlaying.snippet.title}</p>
                    <div className="block md:flex justify-between mt-1">
                      <div className="text-sm text-gray-400">
                        <span className="after:content-['•'] after:mx-1">
                          {currentPlaying.snippet.title}
                        </span>
                        <span> {videoAge} ago</span>
                      </div>
                      <div className="flex items-center gap-4 uppercase">
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BiLike className="text-xl" />
                          {/* <strong>{currentPlaying.videoLikes}</strong> */}
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BiDislike className="text-xl" />
                          <strong>dislike</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <FaShare className="text-xl" />
                          <strong>share</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <HiScissors className="text-xl" />
                          <strong>clip</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <MdOutlinePlaylistAdd className="text-xl" />
                          <strong>save</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BsThreeDots className="text-xl" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 flex-col border-solid border-gray-400 border-2 my-5 pb-3 border-l-transparent border-r-transparent">
                      <div className="flex items-center gap-5 mr-5 mt-4">
                        <div>
                          <img
                            src={currentPlaying.snippet.thumbnails.default.url}
                            alt="1"
                            className="rounded-full h-12 w-12"
                          />
                        </div>
                        <div className="w-5/6">
                          <h5 className="text-sm">
                            <strong>{currentPlaying.snippet.channelTitle}</strong>
                          </h5>
                          <h6 className="text-gray-400 text-xs">
                            {/* {currentPlaying.channelInfo.subscribers} subscribers */}
                          </h6>
                        </div>
                        <div>
                          <button className="uppercase bg-red-600 rounded-sm p-2 text-sm tracking-wider">
                            subscribe
                          </button>
                        </div>
                      </div>
                      <div
                      // className={`${
                      //   !showMoreStatus ? "max-h-16 overflow-hidden" : ""
                      // } text-sm w-11/12`}
                      >
                        <pre
                          style={{
                            fontFamily: `"Roboto", sans-serif`,
                          }}
                          className="whitespace-pre-wrap"
                        >
                          {currentPlaying.snippet.description}
                        </pre>
                      </div>
                      <div>
                        {/* <button
                        className="uppercase text-sm cursor-pointer"
                        onClick={() => setShowMoreStatus(!showMoreStatus)}
                      >
                        Show {showMoreStatus ? "less" : "more"}
                      </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mr-24 flex flex-col gap-3">
              <RecomendentWatchCard id={id} channelId={currentPlaying.snippet.channelId} />;
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
