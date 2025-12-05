import { Link } from "react-router-dom";
import css from "./HomePage.module.css"

export default function HomePage() {
  return (
    <div className={css.wrapper}>
      <div className={css.overlay}>
        <h1 className={css.title}>Welcome to Breweries Explorer</h1>
        <p className={css.subtitle}>Browse, explore and discover breweries from all over the world</p>
        <Link to="/dashboard" className={css.button}>
          Explore Breweries
        </Link>
      </div>
    </div>
  );
}
