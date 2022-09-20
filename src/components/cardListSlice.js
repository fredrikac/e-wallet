import { createSlice } from "@reduxjs/toolkit";

const cardListSlice = createSlice({
  name: "cardList",
  initialState: {
    cards: [
        {
        cardNumber: "1234-5678-9101-1123",
        cardholder: "", 
        valid: "11/22", 
        id: 1, 
        active: true
      },
      { 
        cardNumber: "1111-2222-3333-4444",
        cardholder: "", 
        valid: "10/22", 
        id: 2, 
        active: false 
      }, 
      {
        cardNumber: "2222-3333-4444-5555",
        cardholder: "", 
        valid: "10/22", 
        id: 3, 
        active: false
      }, 
      {
        cardNumber: "3333-4444-5555-6666",
        cardholder: "", 
        valid: "12/22", 
        id: 4, 
        active: false
      }
    ], 
    status: ""
  }, 
  reducers: {

  }
});

export default cardListSlice.reducer;