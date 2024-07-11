import "../../styles/navbar.css";
import setting from "../../assets/icons/settings.svg";
import notification from "../../assets/icons/dark-bell-icon.svg";

function NavBar() {
  return (
    <div className="navbar-container px-5">
      <h3 className="m-0 navbar-title">Forms</h3>
      <div className="mr-5">
        <img src={notification} alt="" className="mr-4 cursor-pointer" />
        <img src={setting} alt="" className="cursor-pointer" />
      </div>
    </div>
  );
}

export default NavBar;
