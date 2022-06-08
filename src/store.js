import postsReducer from "./features/posts/postSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    postsData: postsReducer,
  },
});

export default store;
