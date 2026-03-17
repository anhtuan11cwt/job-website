import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allAdminJobs: [],
  allAppliedJobs: [],
  allJobs: [],
  filterdJobs: [],
  searchJobByText: "",
  selectedLocation: "",
  selectedRole: "",
  selectedSalary: "",
  singleJob: null,
};

const jobSlice = createSlice({
  initialState,
  name: "job",
  reducers: {
    clearFilters: (state) => {
      state.selectedLocation = "";
      state.selectedRole = "";
      state.selectedSalary = "";
      state.filterdJobs = state.allJobs;
    },
    filterJobs: (state) => {
      let filtered = [...state.allJobs];

      if (state.searchJobByText) {
        const searchLower = state.searchJobByText.toLowerCase();
        filtered = filtered.filter(
          (job) =>
            job.title?.toLowerCase().includes(searchLower) ||
            job.description?.toLowerCase().includes(searchLower) ||
            job.location?.toLowerCase().includes(searchLower) ||
            job.company?.name?.toLowerCase().includes(searchLower),
        );
      }

      if (state.selectedLocation) {
        filtered = filtered.filter(
          (job) =>
            job.location?.toLowerCase() ===
            state.selectedLocation.toLowerCase(),
        );
      }

      if (state.selectedRole) {
        filtered = filtered.filter(
          (job) =>
            job.title
              ?.toLowerCase()
              .includes(state.selectedRole.toLowerCase()) ||
            job.jobTitle
              ?.toLowerCase()
              .includes(state.selectedRole.toLowerCase()),
        );
      }

      if (state.selectedSalary) {
        filtered = filtered.filter((job) => {
          const salary = job.salary;
          if (!salary) return true;

          const salaryNum = parseSalary(salary);

          switch (state.selectedSalary) {
            case "0-10 triệu":
              return salaryNum < 10;
            case "10-25 triệu":
              return salaryNum >= 10 && salaryNum < 25;
            case "25-50 triệu":
              return salaryNum >= 25 && salaryNum < 50;
            case "trên-50-triệu":
              return salaryNum >= 50;
            default:
              return true;
          }
        });
      }

      state.filterdJobs = filtered;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
      state.filterdJobs = action.payload;
    },
    setFilterByLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    setFilterByRole: (state, action) => {
      state.selectedRole = action.payload;
    },
    setFilterBySalary: (state, action) => {
      state.selectedSalary = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
  },
});

function parseSalary(salary) {
  if (!salary) return 0;
  const salaryStr = String(salary);
  const match = salaryStr.match(/(\d+)/);
  return match ? Number.parseInt(match[1], 10) : 0;
}

export const {
  setAllJobs,
  setAllAdminJobs,
  setSingleJob,
  setSearchJobByText,
  setAllAppliedJobs,
  setFilterByLocation,
  setFilterByRole,
  setFilterBySalary,
  filterJobs,
  clearFilters,
} = jobSlice.actions;
export default jobSlice.reducer;
