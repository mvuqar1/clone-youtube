
import { createAsyncThunk } from "@reduxjs/toolkit";
import { YOUTUBE_API_URL } from "../../utils/constants.jsx";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export const getHomePageVideos = createAsyncThunk(
  async () => {

    const url = `${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${API_KEY}&part=snippet&type=video&${""}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const { items} = data;
      console.log(items);
    
    } catch (error) {
      console.error(error);
    }
  }
);
