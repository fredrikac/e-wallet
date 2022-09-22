import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//denna kommer hantera state för både user och cards. 

//Arrayen cards kan innehålla 3 items. Det fjärde kortet kommer vara det aktiva. 
//cardholder är user. Går detta att göra på smidigare sätt?

//Thunk för att hantera fetch av random user
export const getUser = createAsyncThunk("user/getUser", async ()=> {
  const response = await fetch("https://randomuser.me/api/").then((res)=> res.json())
  return (
    response.results[0], 
    console.log("fetched userdata: ", response.results[0])
  );
});

const cardSlice = createSlice({
  name: "cardList",
  initialState: {
    cards: [],
    user: null, 
    activeCard: null, 
    status: "idle"
  }, 
  reducers: {
    addNewCard: (state, { payload }) => {
      //OM arrayen cards är 3, returnera felmeddelande
      state.cards.push(payload);
      console.log("added card")
    }, 
    deleteCard: (state, { payload }) => {
      state.cards = state.cards.filter((card)=> card.cardNumber !== payload);
      console.log("Tog bort kort med id: ", payload)
    }, 
    setActiveCard: (state) => {
      //markera kort som aktivt
    }
  }, 
  extraReducers: {
    [getUser.fulfilled]: (state, action)=>{
      state.user = action.payload;
      state.status = "Success!"
    }, 
    [getUser.pending]: (state, action)=>{
      state.status= "Loading..."
    }, 
    [getUser.rejected]: (state, action)=>{
      state.status = "Failed to get user :("
    }
}});

export const { addNewCard, deleteCard } = cardSlice.actions;
export default cardSlice.reducer;