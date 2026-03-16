import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allJobs: [],
  searchJobByText: "",
  singleJob: null,
};

const jobSlice = createSlice({
  initialState,
  name: "job",
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
  },
});

export const { setAllJobs, setSingleJob, setSearchJobByText } =
  jobSlice.actions;
export default jobSlice.reducer;
