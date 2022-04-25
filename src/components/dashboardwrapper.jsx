import { Link } from "react-router-dom";
import style from "../styles/dashboardwrapper.module.css";
import logo from "../assets/img/logo.svg";
export default function DashboardWrapper({ children }) {
  return (
    <div>
      <nav className={style.nav}>
        <div className={style.logo}>
        
            <img src={logo} alt="Logotipo" />
         
        </div>
        <Link to="/dashboard">Links</Link>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/signout">Signout</Link>
      </nav>
      <div className="main-container">{children}</div>
    </div>
  );
}
