import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  videos: [],
  currentPlaying: null,
  searchTerm: "",
  searchResults: [],
  nextPageToken: null,
  recommendedVideos: [],
};

const YoutubeSlice = createSlice({
  name: "youtubeApp",
  initialState,
  reducers: {
    getPageVideos: (state, action) => {
      state.videos = action.payload.items
      state.nextPageToken = action.payload.nextPageToken
    },
    getNextPageVideos: (state, action) => {
      state.videos = [...state.videos, ...action.payload.items]
      state.nextPageToken = action.payload.nextPageToken
    },

    clearVideos: (state) => {
      state.videos = [];
      state.nextPageToken = null;
    },
    changeSearchTerm: (state, action) => {
      console.log(state.searchTerm)
      state.searchTerm = action.payload;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },
    currentPlay: (state, action) => {
      state.currentPlaying = action.payload
    },
    recommendedPageVideos: (state, action) => {
      const { items } = action.payload;
      const updatedItems = items.map(item => {
        const videoId = item.contentDetails.upload ? item.contentDetails.upload.videoId :item.contentDetails.playlistItem.resourceId.videoId;
        if (videoId) {
          return { ...item, id: { videoId } };
        }
        return item;
      });
      state.recommendedVideos = updatedItems;
    },
    clearRecommendedPageVideos: (state) => {
      state.recommendedVideos = []
    }
  }
  // extraReducers: (builder) => {
  //   builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
  //     state.videos = action.payload.parsedData;
  //     state.nextPageToken = action.payload.nextPageToken;
  //   });
  //   builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
  //     state.videos = action.payload.parsedData;
  //     state.nextPageToken = action.payload.nextPageToken;
  //   });
  //   builder.addCase(getVideoDetails.fulfilled, (state, action) => {
  //     state.currentPlaying = action.payload;
  //   });
  //   builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
  //     state.recommendedVideos = action.payload.parsedData;
  //   });
  // },
});



export const {
  getPageVideos,
  getNextPageVideos,
  clearVideos,
  changeSearchTerm,
  clearSearchTerm,
  currentPlay,
  recommendedPageVideos,
  clearRecommendedPageVideos,
} = YoutubeSlice.actions;
export default YoutubeSlice.reducer