import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import BreweryList from "../BreweryList/BreweryList.jsx";

export default function Navigation() {
  return (
    <div>
      <nav className={css.nav}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>
    </div>
  );
}
