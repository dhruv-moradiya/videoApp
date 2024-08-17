import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrentUserData = createAsyncThunk(
  "user/getCurrentUserData",
  async () => {
    const URL =
      import.meta.env.VITE_APP_BASE_URL +
      import.meta.env.VITE_APP_USER_ENDPOINT +
      "/current-user";

    try {
      const token = JSON.parse(localStorage.getItem("userAuth")).accessToken;

      const response = await fetch(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      return result.user;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }
);
