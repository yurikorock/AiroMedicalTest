import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import BreweryList from "../BreweryList/BreweryList.jsx";

const getActiveLinkClass = ({isActive}) =>{
    return isActive ? `${css.link} ${css.isActive}` : css.link;
};

export default function Navigation() {
  return (
    <div>
      <nav className={css.nav}>
        <NavLink to="/" className={getActiveLinkClass}>Home</NavLink>
        <NavLink to="/dashboard" className={getActiveLinkClass}>Dashboard</NavLink>
      </nav>
    </div>
  );
}
