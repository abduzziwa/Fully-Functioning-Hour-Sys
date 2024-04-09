import "../components/component styles/Sidebar.css"; // Import CSS file for styling

const MemeberSideBar = () => {
  return (
    <div className="card side style">
      <div className="card-body">
        <h5 className="card-title">
          <span className="admin">
            <a href="/Dashboard">Admin</a>
          </span>
        </h5>
        <div className="links">
          <a href="/member">
            <span className="icon">
              <span className="text">Dashboard</span>
            </span>
          </a>
          <a href="/membertime">
            <span className="icon">
              {/* <RiRegisteredFill /> */}
              <span className="text">Registreer de tijd</span>
            </span>
          </a>
          <a href="/">
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

export default MemeberSideBar;
