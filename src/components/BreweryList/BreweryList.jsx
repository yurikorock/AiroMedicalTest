import { useDispatch, useSelector } from "react-redux";
import {
  selectBreweries,
  selectLoading,
} from "../../redux/breweries/selectors.js";
import { useEffect, useState } from "react";
import { fetchBreweries } from "../../redux/breweries/operations.js";
import css from "./BreweryLIst.module.css"

export default function BreweryList() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const items = useSelector(selectBreweries);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBreweries(page));
  }, [dispatch, page]);

  const handleLoadMore = () => setPage((prev) => prev + 1);

  return (
    <div>
      {isLoading && <p>Loading breweries...</p>}
      <ul className={css.ul}>
        {items.map((brewery) => (
          <li key={brewery.id} className={css.li}>
          <p>{brewery.name}</p>
          <p>{brewery.brewery_type}</p>
          <p>{brewery.city}</p>
          </li>
        ))}
      </ul>
      
      {!isLoading && <button onClick={handleLoadMore}>Load more</button>}
    </div>
  );
}
