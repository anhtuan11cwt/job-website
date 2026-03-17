import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applicants: [],
};

const applicationSlice = createSlice({
  initialState,
  name: "application",
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    },
    updateApplicantStatus: (state, action) => {
      const { applicantId, status } = action.payload;
      const applicant = state.applicants.find((app) => app._id === applicantId);
      if (applicant) {
        applicant.status = status;
      }
    },
  },
});

export const { setAllApplicants, updateApplicantStatus } =
  applicationSlice.actions;
export default applicationSlice.reducer;
