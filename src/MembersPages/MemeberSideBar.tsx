import "../components/component styles/Sidebar.css";
import "@fortawesome/fontawesome-free/css/all.css";

const MemeberSideBar = () => {
  return (
    <div className="sidebar">
      <div className="logo"></div>
      <ul className="menu">
        <li className="active">
          <a href="/Member">
            <i className="far fa-user"></i>
            <span>Medewerker</span>
          </a>
        </li>

        <li>
          <a href="/Member">
            <i className="far fa-user"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/membertime">
            <i className="fas fa-user-md"></i>
            <span>Registeer de Tijd</span>
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

export default MemeberSideBar;
