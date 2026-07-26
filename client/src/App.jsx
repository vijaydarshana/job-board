import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../src/pages/Home"
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Jobs from "../src/pages/Jobs";
import CreateJob from "../src/pages/CreateJob";
import Dashboard from "../src/pages/Dashboard";
import Navbar from "./components/Navbar";
import JobDetails from "./pages/JobDetails";
import EditJob from "./pages/EditJob";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/edit-job/:id" element={<EditJob />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/create-job" element={<CreateJob />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;