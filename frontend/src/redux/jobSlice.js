import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allAdminJobs: [],
  allJobs: [],
  searchJobByText: "",
  singleJob: null,
};

const jobSlice = createSlice({
  initialState,
  name: "job",
  reducers: {
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
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

export const { setAllJobs, setAllAdminJobs, setSingleJob, setSearchJobByText } =
  jobSlice.actions;
export default jobSlice.reducer;
