import { useDispatch, useSelector } from "react-redux";
import {
  selectBreweries,
  selectLoading,
} from "../../redux/breweries/selectors.js";
import { useEffect, useState } from "react";
import { fetchBreweries } from "../../redux/breweries/operations.js";
import css from "./BreweryLIst.module.css";
import { selectFavouritesBrew } from "../../redux/favourite/favouritesSelector.js";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../redux/favourite/favouritesSlice.js";

export default function BreweryList({id}) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const items = useSelector(selectBreweries);
  const [page, setPage] = useState(1);
  const favourites = useSelector(selectFavouritesBrew);

  const isFavourites = favourites.includes(id);

  useEffect(() => {
    dispatch(fetchBreweries(page));
  }, [dispatch, page]);

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handleRightClick = (event, id) => {
    event.preventDefault();
    if (favourites.includes(id)) {
      dispatch(removeFromFavourites(id));
    } else {
      dispatch(addToFavourites(id));
    }
  };

  const handdleDeleteAll = () => {
    favourites.forEach((id) => dispatch(removeFromFavourites(id)));
  };

  return (
    <div>
      {isLoading && <p>Loading breweries...</p>}
      <ul className={css.ul}>
        {items.map((brewery) => {
          const isSelected = favourites.includes(brewery.id);
          return (
            <li
              key={brewery.id}
              className={`${css.li} ${isSelected ? css.selected : ""}`}
              onContextMenu={(e) => handleRightClick(e, brewery.id)}
            >
              <p>{brewery.name}</p>
              <p>{brewery.brewery_type}</p>
              <p>{brewery.city}</p>
            </li>
          );
        })}
      </ul>

      {!isLoading && <button onClick={handleLoadMore}>Load more</button>}
      {favourites.length > 0 && (
        <button onClick={handdleDeleteAll}>Delete</button>
      )}
    </div>
  );
}
