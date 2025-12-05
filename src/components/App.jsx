import Product from "./BreweryList/BreweryList";
import BreweryList from "./BreweryList/BreweryList";
import AppHeader from "./AppHeader/AppHeader.jsx";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage.jsx";
import "./App.css";
import BreweryDetails from "./BreweryDetails/BreweryDetails.jsx";

export default function App() {
  return (
    <div>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<BreweryList />} />
        <Route path="/dashboard/:breweryId" element={<BreweryDetails />} />
        <Route path="*" element={<p>404.... Page not found...</p>} />
      </Routes>
    </div>
  );
}
