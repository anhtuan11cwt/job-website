import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
  searchCompanyByText: "",
  singleCompany: null,
};

const companySlice = createSlice({
  initialState,
  name: "company",
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
  },
});

export const { setSingleCompany, setCompanies, setSearchCompanyByText } =
  companySlice.actions;
export default companySlice.reducer;
