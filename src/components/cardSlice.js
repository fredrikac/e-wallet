import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//denna kommer hantera state för både user och cards. 

//Arrayen cards kan innehålla 3 items. Det fjärde kortet kommer vara det aktiva. 
//activeCard sätts mha cardnumber. Spärr så man inte kan lägga till två kort med samma kortnummer? 

//Thunk för att hantera fetch av random user
export const getUser = createAsyncThunk("user/getUser", async ()=> {
  return fetch("https://randomuser.me/api/")
  .then(response => response.json())
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
      if(state.cards.length >= 3){
        alert("You can only have 4 cards. Please delete a card before adding a new one.")
      }
      state.cards.push(payload); 
      console.log("Message from reducer addNewCard: added card")
    }, 
    deleteCard: (state, { payload }) => {
      state.cards = state.cards.filter((card)=> card.cardNumber !== payload);
      console.log("Tog bort kort med id: ", payload)
    }, 
    setActiveCard: (state, {payload}) => {
      state.activeCard = payload;
      console.log("Message from reducer setActiveCard: activeCard is now cardnumber ", payload);
    }
  }, 
  extraReducers: {
    [getUser.fulfilled]: (state, action)=> {
      console.log("Message from extraReducer: Got the user", action.payload)
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

export const { addNewCard, deleteCard, setActiveCard } = cardSlice.actions;
export default cardSlice.reducer;