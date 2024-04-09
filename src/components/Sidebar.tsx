import "./component styles/Sidebar.css";

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
    <div className="card side style">
      <div className="card-body">
        <h5 className="card-title">
          <span className="admin">
            <a href="/Dashboard">Admin</a>
          </span>
        </h5>
        <div className="links">
          <a href="/Charts">
            <span className="icon">
              {/* <BiSolidDashboard /> */}
              <span className="text">Dashboard</span>
            </span>
          </a>
          <a href="/Dashboard">
            <span className="icon">
              {/* <BiSolidDashboard /> */}
              <span className="text">Medewerkers</span>
            </span>
          </a>
          <a href="/Customers">
            <span className="icon">
              {/* <BiSolidDashboard /> */}
              <span className="text">Klanten</span>
            </span>
          </a>
          <a href="/WorkedHours">
            <span className="icon">
              {/* <IoIosPersonAdd /> */}
              <span className="text">Medewerker Uren</span>
            </span>
          </a>
          <a href="/" onClick={handleLogout}>
            <span className="icon">
              {/* <BiLogOut /> */}
              <span className="text">Afmelden</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
