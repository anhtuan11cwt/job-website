import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = authSlice.actions;
export default authSlice.reducer;
