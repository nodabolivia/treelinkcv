import { Link } from "react-router-dom";
import style from "../styles/dashboardwrapper.module.css";
export default function DashboardWrapper({ children }) {
  return (
    <div>
      <nav className={style.nav}>
        <div className={style.logo}>Logotipo</div>
        <Link to="/dashbord">Links</Link>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/signout">Signout</Link>
      </nav>
      <div className="main-container">{children}</div>
    </div>
  );
}
