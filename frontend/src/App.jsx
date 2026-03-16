import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/Navbar";
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
      </Routes>
    </div>
  );
}

export default App;
