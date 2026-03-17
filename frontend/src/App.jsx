import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminJobs from "@/components/admin/AdminJobs";
import Applicants from "@/components/admin/Applicants";
import Companies from "@/components/admin/Companies";
import CompanyCreate from "@/components/admin/CompanyCreate";
import CompanySetup from "@/components/admin/CompanySetup";
import PostJob from "@/components/admin/PostJob";
import Navbar from "@/components/shared/Navbar";
import Browse from "./pages/Browse";
import Home from "./pages/Home";
import JobDescription from "./pages/JobDescription";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Jobs />} path="/jobs" />
        <Route element={<Browse />} path="/browse" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<JobDescription />} path="/description/:id" />
        <Route element={<Companies />} path="/admin/companies" />
        <Route element={<CompanyCreate />} path="/admin/companies/create" />
        <Route element={<CompanySetup />} path="/admin/companies/:id" />
        <Route element={<AdminJobs />} path="/admin/jobs" />
        <Route element={<PostJob />} path="/admin/jobs/create" />
        <Route element={<Applicants />} path="/admin/jobs/:id/applicants" />
      </Routes>
    </div>
  );
}

export default App;
