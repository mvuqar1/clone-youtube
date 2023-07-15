import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'
import { getPageVideos,getNextPageVideos } from '../Redux/reducers/YoutubeSlice'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../components/Spinner'
import { YOUTUBE_API_URL } from '../utils/constants'
import SearchCard from '../components/SearchCard'

export default function Search() {

  const navigate=useNavigate()
  const dispatch = useDispatch();
  const searchTerm=useSelector((state)=>state.youtube.searchTerm)
  const nextPageToken=useSelector((state)=>state.youtube.nextPageToken)
  const videos=useSelector((state)=>state.youtube.videos)

 

  useEffect(() => {
    if (searchTerm === "") navigate("/");
    
    const getSearchPage = async () => {
      const url = `${YOUTUBE_API_URL}/search?q=${searchTerm}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet&type=video&`
  
      try {
        const response = await fetch(url);
        const responseData = await response.json();
        const data = responseData;
        console.log(data)
        
        dispatch(getPageVideos(data))
      } catch (error) {
        console.error(error);
      }
    };
    getSearchPage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const loadMoreData = async () => {

      const url = `${YOUTUBE_API_URL}/search?q=${searchTerm}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet&type=video&pageToken=${nextPageToken}`
  
      try {
        const response = await fetch(url);
        const responseData = await response.json();
        const data = responseData;
        console.log(data)
        console.log(searchTerm)

        dispatch(getNextPageVideos(data))
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos && videos.length ? (
          <div className="py-8 pl-8 flex flex-col gap-5 w-full">
            <InfiniteScroll
              dataLength={videos.length}
              next={loadMoreData}
              hasMore={videos.length < 500}
              loader={<Spinner />}
              height={600}
            >
              {videos && videos.map((item) => {
                return (
                  <div className="my-5" key={item.id.videoId} >
                    <SearchCard data={item} />
                  </div>
                );
              })}
            </InfiniteScroll>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
