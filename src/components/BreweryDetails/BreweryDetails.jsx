import { useParams } from "react-router-dom";
import css from "./BreweryDetails.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import BreweryInfo from "../BreweryInfo/BreweryInfo.jsx";

axios.defaults.baseURL = "https://api.openbrewerydb.org/v1";

export default function BreweryDetails() {
  const { breweryId } = useParams();
  const [brewery, setBrewery] = useState(null);

  useEffect(() => {
    axios.get(`/breweries/${breweryId}`).then((res) => setBrewery(res.data));
  }, [breweryId]);

  return <div>{brewery && <BreweryInfo brewery={brewery}/>} </div>;
}
