// export default Dashboard;
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios"; // Import axios for HTTP requests
import CustomersTable from "../components/CustomersTable";

const CustomerDashboard = () => {
  const [name, setName] = useState(""); // State variable to store user name

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get session ID from storage (replace with your storage mechanism)
        const sessionId = localStorage.getItem("sessionId");

        if (!sessionId) {
          throw new Error("Session ID not found");
        }

        // Make Axios request to user data endpoint
        const response = await axios.get(
          "http://localhost/Projects/Backend/GetloggedinData.php",
          {
            params: { sessionId }, // Include session ID in request parameters
          }
        );

        const userData = response.data;

        setName(userData.user.Voornaam + " " + userData.user.Achternaam);

        if (userData && userData.success) {
          setName(userData.userData.name);
        } else {
          console.error("Error fetching user data:", userData.message);
        }
      } catch (error) {
        console.error("Error retrieving user information:", error);
        // Handle potential errors (e.g., display error message)
      }
    };

    fetchUserData();
  }, []); // Run useEffect on component mount

  return (
    <div className="Dash">
      <div className="d-flex">
        <Sidebar />
        <div className="card dash">
          <div className="card-body">
            <h5 className="card-title dash-title">
              klanten Dashboard <span>Groep A4</span>
            </h5>
            <div>
              <h2 className="welcome">Welcome {name} </h2>
            </div>
            <CustomersTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
