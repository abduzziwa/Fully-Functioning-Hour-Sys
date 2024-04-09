// export default App;
import "./App.css";
import Dashboard from "./pages/EmployeeDashboard";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GProfile from "./components/GProfile";
import MemberProjectEntry from "./MembersPages/MemberProjectEntry";
import MembersDashboard from "./MembersPages/MembersDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Don from "./components/Don";
import MedewerkersHourTable from "./components/MedewerkersHourTable";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Customers" element={<CustomerDashboard />} />
          <Route path="/Charts" element={<Don />} />
          <Route path="/WorkedHours" element={<MedewerkersHourTable />} />
          <Route path="/profile/:userId" element={<GProfile />} />
          <Route path="/member" element={<MembersDashboard />} />
          <Route path="/membertime" element={<MemberProjectEntry />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
