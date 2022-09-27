import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//denna kommer hantera state för både user och cards. 
//Arrayen cards kan innehålla 3 items. Det fjärde kortet kommer vara det aktiva. Det går inte att lägga till ett femte kort, så det funkar, men då kraschar allt
//Vad ska jag med initialCard till? Fortsätt med detta

//EXTRA
//activeCard sätts mha cardnumber. Spärr så man inte kan lägga till två kort med samma kortnummer? 
//Lägg till default Jane Doe ifall fetchen inte funkar


//Thunk för att hantera fetch av random user
export const getUser = createAsyncThunk("user/getUser", async () => {
  const result = await axios.get("https://randomuser.me/api/");
  if(result.status === 200){
    return result.data.results[0].name.first.concat(" ", result.data.results[0].name.last);
  } else {
    //returnera en default-användare kanske?
  }
});

const cardSlice = createSlice({
  name: "cardList",
  initialState: {
    cards: [],
    user: null, 
    activeCard: {
      cardholder: "",
      cardNumber: "1111111111111111", 
      validThruMonth: "10",
      validThruYear: "22",
      cvc: "111", 
      vendor: "Visa"}, 
    status: "idle"
  }, 
  reducers: {
    addNewCard: (state, { payload }) => {
      if([...state.cards, state.activeCard].length >= 4){
        alert("You can only have 4 cards. Please delete a card before adding a new one.");
        return;
      }
        state.cards = [...state.cards, payload];
        alert("Added card!")
        console.log("Message from reducer addNewCard: added card");
    }, 
    deleteCard: (state, { payload }) => {
      state.cards = state.cards.filter((card)=> card.cardNumber !== payload);
      console.log("Message from reducer deleteCard - deleted: ", payload);
    }, 
    initialCard: (state) => {
      if (state.activeCard === null){
        state.activeCard = state.cards.shift();
      }
    },
    setActiveCard: (state, { payload }) => {
      const thisCard = state.activeCard;
      state.activeCard = state.cards.find(card => card.cardNumber === payload)
      state.cards.push(thisCard);
      state.cards = state.cards.filter(card => card.cardNumber !== payload);
      console.log("Message from reducer setActiveCard: activeCard is now cardnumber ", payload);
    }
  }, 
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      console.log("Message from extraReducer: Got the user", action.payload);
      state.user = action.payload;
      state.activeCard.cardholder = action.payload;
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