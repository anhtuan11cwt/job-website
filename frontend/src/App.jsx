import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
      </Routes>
    </div>
  );
}

export default App;
