import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Ändra status till 'idle' sen 

// export const getUser = createAsyncThunk("user/getUser", async ()=> {
//   return fetch("https://randomuser.me/api/").then((res)=> res.json())
// });

export const getUser = createAsyncThunk("user/getUser", async ()=> {
  const response = await fetch("https://randomuser.me/api/").then((res)=> res.json())
  return response.results
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [
      {
        name: {
          first: "Jane", 
          last: "Doe"
        }
      }
    ], 
    status: "idle"
  }, 
  reducers:{}, 
  extraReducers: {
    [getUser.fulfilled]: (state, action)=>{
      console.log(action.payload)
      state.user = action.payload;
      state.status = "Success!"
    }, 
    [getUser.pending]: (state, action)=>{
      state.status= "Loading..."
    }, 
    [getUser.rejected]: (state, action)=>{
      state.status = "Failed to get user :("
      console.log("failed")
    }
  }
})

export default userSlice.reducer;