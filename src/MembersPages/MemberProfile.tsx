import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/component styles/profile.css";
import EmployeeProfileTable from "../components/EmployeeProfileTable";

interface UserData {
  Voornaam: string;
  Achternaam: string;
  Werkmail: string;
  Functie: string;
  Avatar: string;
  Kantoorruimte: string;
  Geboortedatum: string;
}

interface ProfileProps {
  userId: string | null; // Change type to string
}

const MemberProfile: React.FC<ProfileProps> = ({ userId }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<UserData[]>(
          `http://localhost/Projects/Backend/usersgroep3.php?id=${userId}`
        );
        const userData = response.data[0];
        setUser(userData);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div>No user found with ID: {userId}</div>;
  }

  return (
    <div className="profile-container" contentEditable={false}>
      <div className="profile-content">
        <div className="card1">
          <div className="card-body">
            {user.Avatar && (
              <img src={user.Avatar} alt="User Avatar" className="avatar" />
            )}
          </div>
        </div>
        <div className="card2">
          <div className="cbody">
            <p className="text-start">
              <span className="key">Name</span>: {user.Voornaam}{" "}
              {user.Achternaam}
            </p>
            <p className="text-start">
              <span className="key">Date of Birth</span>: {user.Geboortedatum}
            </p>
            <p className="text-start">
              <span className="key">Function</span>: {user.Functie}
            </p>
            <p className="text-start">
              <span className="key">Work Email</span>: {user.Werkmail}
            </p>
            <p className="text-start">
              <span className="key">Office Space</span>: {user.Kantoorruimte}
            </p>
          </div>
        </div>
      </div>
      <EmployeeProfileTable userId={userId} />
    </div>
  );
};

export default MemberProfile;
