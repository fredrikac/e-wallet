import { configureStore } from "@reduxjs/toolkit";
import cardListSlice from "../components/cardListSlice";
import userSlice from "../components/userSlice";

const store = configureStore({
  reducer: {
    cardList: cardListSlice, 
    user: userSlice
  }
});

export default store;