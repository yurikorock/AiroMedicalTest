import { useDispatch, useSelector } from "react-redux";
import {
  selectBreweries,
  selectLoading,
} from "../../redux/breweries/selectors.js";
import { useEffect } from "react";
import { fetchBreweries } from "../../redux/breweries/operations.js";

export default function BreweryList() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const items = useSelector(selectBreweries);

  useEffect(() => {
    dispatch(fetchBreweries());
  }, [dispatch]);

  return (
    <div>
      <ul>
        {items.map((brewery) => (
          <li key={brewery.id}>{brewery.name}</li>
        ))}
      </ul>
    </div>
  );
}
