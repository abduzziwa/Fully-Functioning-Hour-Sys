// export default Dashboard;
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TableUsers from "../components/TableUsers";
import axios from "axios"; // Import axios for HTTP requests

const Dashboard = () => {
  const [name, setName] = useState("Admin"); // State variable to store user name

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
          "http://localhost/Projects/backendcode/GetloggedinData.php",
          {
            params: { sessionId }, // Include session ID in request parameters
          }
        );

        const userData = await response.data;
        // console.log(userData);
        setName(userData.user.Voornaam + " " + userData.user.Achternaam);
        if (!userData) {
          setName(`${userData.Achternaam}  ${userData.Voornaam}`);
        } else {
          console.error("Error fetching user data:", userData.message);
        }
      } catch (error) {
        error && console.error("Error retrieving user information:", error);
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
              Dashboard <span>Groep A4</span>
            </h5>
            <div>
              <h2 className="welcome">Welcome {name} </h2>
            </div>
            <TableUsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
