import "./component styles/Sidebar.css";
import "@fortawesome/fontawesome-free/css/all.css";
const Sidebar = () => {
  const handleLogout = () => {
    const key = localStorage.getItem("sessionId");

    console.log(key);
    fetch("http://localhost/Projects/Backend/Deletesession.php", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionKey: "65f2ff86c2d38" }),
    })
      .then((response) => {
        // Handle re sponse
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        // Handle error
      });
    localStorage.removeItem("sessionId");
    localStorage.removeItem("userId");
  };

  return (
    <div className="sidebar">
      <div className="logo"></div>
      <ul className="menu">
        <li className="active">
          <a href="/Charts">
            <h3>Admin</h3>
          </a>
        </li>

        <li>
          <a href="/Charts">
            <i className="far fa-user"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/dashboard">
            <i className="fas fa-user-md"></i>
            <span>Medewerkers</span>
          </a>
        </li>
        <li>
          <a href="/Customers">
            <i className="fas fa-shopping-bag"></i>
            <span>Klanten</span>
          </a>
        </li>
        <li>
          <a href="/Workedhours">
            <i className="fas fa-briefcase"></i>
            <span>Medewerker Uren</span>
          </a>
        </li>
        <li className="logout">
          <a href="/">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
