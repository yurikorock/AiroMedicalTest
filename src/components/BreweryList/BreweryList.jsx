import { useDispatch, useSelector } from "react-redux";
import {
  selectBreweries,
  selectLoading,
} from "../../redux/breweries/selectors.js";
import { useEffect, useState } from "react";
import { fetchBreweries } from "../../redux/breweries/operations.js";

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
      <ul>
        {items.map((brewery) => (
          <li key={brewery.id}>{brewery.name}</li>
        ))}
      </ul>
        {isLoading && <p>Loading breweries...</p>}
      {!isLoading && <button onClick={handleLoadMore}>Load more</button>}
    </div>
  );
}
