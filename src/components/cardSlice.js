import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//denna kommer hantera state för både user och cards. 

//Arrayen cards kan innehålla 3 items. Det fjärde kortet kommer vara det aktiva. Även om det kommer upp en alert om att det inte går att lägga till kort så görs det kortet man försökte lägga till som aktivt. Buggggg

//activeCard sätts mha cardnumber. Spärr så man inte kan lägga till två kort med samma kortnummer? 

//Thunk för att hantera fetch av random user
export const getUser = createAsyncThunk("user/getUser", async () => {
  return fetch("https://randomuser.me/api/")
  .then(response => response.json())
});

const cardSlice = createSlice({
  name: "cardList",
  initialState: {
    cards: [{
      cardholder: "",
      cardNumber: "1111111111111111", 
      validThruMonth: "10",
      validThruYear: "22",
      cvc: "111", 
      vendor: "Visa"}],
    user: null, 
    activeCard: null, 
    status: "idle"
  }, 
  reducers: {
    addNewCard: (state, { payload }) => {
      if(state.cards.length >= 4){
        alert("You can only have 4 cards. Please delete a card before adding a new one.");
      }else{
        state.cards.push(payload); 
        alert("Added card!")
        console.log("Message from reducer addNewCard: added card");
      }
    }, 
    deleteCard: (state, { payload }) => {
      state.cards = state.cards.filter((card)=> card.cardNumber !== payload);
      console.log("Tog bort kort med id: ", payload);
    }, 
    setActiveCard: (state, {payload}) => {
      if(state.cards.length <= 4){
        state.activeCard = payload;
        console.log("Message from reducer setActiveCard: activeCard is now cardnumber ", payload);
      }
    }
  }, 
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      console.log("Message from extraReducer: Got the user", action.payload);
      state.user = action.payload;
      state.status = "Success!";
    }, 
    [getUser.pending]: (state, action) => {
      state.status= "Loading...";
    }, 
    [getUser.rejected]: (state, action) => {
      state.status = "Failed to get user :(";
    }
}});

export const { addNewCard, deleteCard, setActiveCard } = cardSlice.actions;
export default cardSlice.reducer;