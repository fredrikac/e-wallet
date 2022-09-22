import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "../components/cardSlice";
//import userSlice from "../components/userSlice";

const store = configureStore({
  reducer: {
    cardList: cardSlice
  }
});

export default store;