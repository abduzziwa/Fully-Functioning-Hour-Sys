// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "../components/component styles/profile.css";
// import EmployeeProfileTable from "./EmployeeProfileTable";

// interface UserData {
//   Voornaam: string;
//   Achternaam: string;
//   Werkmail: string;
//   Functie: string;
//   Avatar: string;
//   Kantoorruimte: string;
//   Geboortedatum: string;
// }

// interface ProfileProps {
//   userId: string | undefined;
// }

// type MyError = {
//   message: string;
// };
// const Profile: React.FC<ProfileProps> = () => {
//   const { userId } = useParams();
//   const [user, setUser] = useState<UserData | null>(null);
//   const [error, setError] = useState<MyError | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       setIsLoading(true); // Set loading state
//       try {
//         const response = await axios.get<UserData[]>(
//           `http://localhost/Projects/Backend/usersgroep3.php?id=${userId}`
//         );
//         const [userData] = response.data;
//         setUser({
//           Voornaam: userData.Voornaam,
//           Achternaam: userData.Achternaam,
//           Werkmail: userData.Werkmail,
//           Functie: userData.Functie,
//           Avatar: userData.Avatar,
//           Kantoorruimte: userData.Kantoorruimte,
//           Geboortedatum: userData.Geboortedatum,
//         });
//       } catch (err) {
//         if (axios.isAxiosError(err)) {
//           setError({ message: err.message });
//         } else {
//           console.error("Unexpected error:", err);
//         }
//       } finally {
//         setIsLoading(false); // Clear loading state after success or failure
//       }
//     };

//     fetchUser();
//   }, [userId]);

//   return (
//     <div className="profile-container" contentEditable={false}>
//       {isLoading ? (
//         <div>Loading user data...</div>
//       ) : error ? (
//         <div className="error">Error: {error.message}</div>
//       ) : user ? (
//         <UserDataDisplay user={user} />
//       ) : (
//         <div>No user found with ID: {userId}</div>
//       )}
//     </div>
//   );
// };

// const UserDataDisplay: React.FC<{ user: UserData }> = ({ user }) => {
//   return (
//     <>
//       <div className="profile-content">
//         <div className="card1">
//           <div className="card-body">
//             {user.Avatar && (
//               <img src={user.Avatar} alt="User Avatar" className="avatar" />
//             )}
//           </div>
//         </div>
//         <div className="card2">
//           <div className="cbody">
//             <p className="text-start">
//               <span className="key">Naam</span> : {" " + user.Voornaam}{" "}
//               {" " + user.Achternaam}
//             </p>
//             <p className="text-start">
//               <span className="key">Geboortedatum</span>:{" "}
//               {" " + user.Geboortedatum}
//             </p>
//             <p className="text-start">
//               <span className="key">Functie</span> : {" " + user.Functie}
//             </p>
//             <p className="text-start">
//               <span className="key">Werkmail</span> : {" " + user.Werkmail}
//             </p>
//             <p className="text-start">
//               <span className="key">Kantoorruimte</span> :{" "}
//               {" " + user.Kantoorruimte}
//             </p>
//           </div>
//         </div>
//       </div>
//       <EmployeeProfileTable userId={userId} />
//     </>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../components/component styles/profile.css";
import EmployeeProfileTable from "./EmployeeProfileTable";

interface UserData {
  Voornaam: string;
  Achternaam: string;
  Werkmail: string;
  Functie: string;
  Avatar: string;
  Kantoorruimte: string;
  Geboortedatum: string;
}

type MyError = {
  message: string;
};

interface ProfileProps {
  userId: string | number | null | undefined;
}

const Profile: React.FC<ProfileProps> = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState<MyError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<UserData[]>(
          `http://localhost/Projects/Backend/usersgroep3.php?id=${userId}`
        );
        const [userData] = response.data;
        setUser(userData);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError({ message: err.message });
        } else {
          console.error("Unexpected error:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="profile-container" contentEditable={false}>
      {isLoading ? (
        <div>Loading user data...</div>
      ) : error ? (
        <div className="error">Error: {error.message}</div>
      ) : user ? (
        <>
          <UserDataDisplay user={user} />
          <EmployeeProfileTable userId={userId} />
        </>
      ) : (
        <div>No user found with ID: {userId}</div>
      )}
    </div>
  );
};

const UserDataDisplay: React.FC<{ user: UserData }> = ({ user }) => {
  return (
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
            <span className="key">Naam</span> : {user.Voornaam}{" "}
            {user.Achternaam}
          </p>
          <p className="text-start">
            <span className="key">Geboortedatum</span>: {user.Geboortedatum}
          </p>
          <p className="text-start">
            <span className="key">Functie</span> : {user.Functie}
          </p>
          <p className="text-start">
            <span className="key">Werkmail</span> : {user.Werkmail}
          </p>
          <p className="text-start">
            <span className="key">Kantoorruimte</span> : {user.Kantoorruimte}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
