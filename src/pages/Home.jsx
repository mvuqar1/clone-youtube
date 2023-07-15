import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Spinner from "../components/Spinner.jsx"
import { YOUTUBE_API_URL } from '../utils/constants.jsx';
import Card from '../components/Card.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { getPageVideos, getNextPageVideos } from '../Redux/reducers/YoutubeSlice.jsx';

export default function Home() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.youtube.videos)
  const nextPageToken = useSelector((state) => state.youtube.nextPageToken)

  useEffect(() => {
    const getHomePage = async () => {
      const url = `${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet&type=video`;

      try {
        const response = await fetch(url);
        const responseData = await response.json();
        const data = responseData;

        dispatch(getPageVideos(data))
      } catch (error) {
        console.error(error);
      }
    };

    getHomePage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreData = async () => {
    const url = `${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet&type=video&pageToken=${nextPageToken}`;

    try {
      const response = await fetch(url);
      const responseData = await response.json();
      const data = responseData;

      dispatch(getNextPageVideos(data))
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-h-screen overflow-hidden ">
      <div style={{ height: '7.5vh' }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: '92.5vh' }}>
        
        <Sidebar />

        {data && data.length > 0 ? (
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={data.length < 500}
            loader={<Spinner />}
            height={650}
            endMessage={<p>No more videos</p>}
          >
            <div className="grid grid-rows-1 gap-y-20 md:gap-y-14 gap-x-8 md:grid-cols-4 p-8">
              {data.map((item) => (
                <div key={item.id.videoId}>
                  <Card data={item} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}