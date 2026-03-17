import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminJobs from "@/components/admin/AdminJobs";
import Applicants from "@/components/admin/Applicants";
import Companies from "@/components/admin/Companies";
import CompanyCreate from "@/components/admin/CompanyCreate";
import CompanySetup from "@/components/admin/CompanySetup";
import PostJob from "@/components/admin/PostJob";
import AuthRoute from "@/components/shared/AuthRoute";
import Navbar from "@/components/shared/Navbar";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
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
        <Route
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
          path="/login"
        />
        <Route
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          }
          path="/signup"
        />
        <Route element={<Jobs />} path="/jobs" />
        <Route element={<Browse />} path="/browse" />
        <Route
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
          path="/profile"
        />
        <Route element={<JobDescription />} path="/description/:id" />
        <Route
          element={
            <ProtectedRoute requireRecruiter>
              <Companies />
            </ProtectedRoute>
          }
          path="/admin/companies"
        />
        <Route
          element={
            <ProtectedRoute requireRecruiter>
              <CompanyCreate />
            </ProtectedRoute>
          }
          path="/admin/companies/create"
        />
        <Route
          element={
            <ProtectedRoute requireRecruiter>
              <CompanySetup />
            </ProtectedRoute>
          }
          path="/admin/companies/:id"
        />
        <Route
          element={
            <ProtectedRoute requireRecruiter>
              <AdminJobs />
            </ProtectedRoute>
          }
          path="/admin/jobs"
        />
        <Route
          element={
            <ProtectedRoute requireRecruiter>
              <PostJob />
            </ProtectedRoute>
          }
          path="/admin/jobs/create"
        />
        <Route
          element={
            <ProtectedRoute requireRecruiter>
              <Applicants />
            </ProtectedRoute>
          }
          path="/admin/jobs/:id/applicants"
        />
      </Routes>
    </div>
  );
}

export default App;
