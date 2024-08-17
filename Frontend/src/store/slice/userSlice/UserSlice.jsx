import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserData } from "./userThunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isCurrentAuthDataFetched: false,
    userAuth: null,
    isErrorInUserData: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserData.pending, (state) => {
      state.isCurrentAuthDataFetched = false;
    });
    builder.addCase(getCurrentUserData.fulfilled, (state, action) => {
      state.userAuth = action.payload;
    });
    builder.addCase(getCurrentUserData.rejected, (state, action) => {
      state.isErrorInUserData = action.error.message;
    });
  },
});

const userReducer = userSlice.reducer;

export default userReducer;
