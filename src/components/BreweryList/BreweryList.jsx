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
import { selectorHiddenBreweryIds } from "../../redux/breweries/hiddenBreweries/selectors.js";
import { hideMany } from "../../redux/breweries/hiddenBreweries/hiddenBreweryIdsSlice.js";

export default function BreweryList() {
  const [page, setPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const items = useSelector(selectBreweries);
  const favourites = useSelector(selectFavouritesBrew);
  const hiddenBrewery = useSelector(selectorHiddenBreweryIds);

  // завантажуємо нову сторінку пивоварень
  useEffect(() => {
    dispatch(fetchBreweries(page));
  }, [dispatch, page]);

  // оновлюємо displayedItems при завантаженні items або прихованих елементів
  useEffect(() => {
    const visible = items.filter((b) => !hiddenBrewery.includes(b.id));
    // якщо displayedItems порожній, беремо перші 15
    if (displayedItems.length === 0) {
      setDisplayedItems(visible.slice(0, 15));
    } else {
      // підтягуємо додаткові елементи, якщо забрано якісь
      if (displayedItems.length < 15) {
        const needed = 15 - displayedItems.length;
        const alreadyDisplayedId = displayedItems.map((brewery) => brewery.id);
        const additional = visible.filter(
          (brewery) => !alreadyDisplayedId.includes(brewery.id)
        );
        setDisplayedItems((prev) => [...prev, ...additional.slice(0, needed)]);
      }
    }
  }, [items, hiddenBrewery]);

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handleRightClick = (event, id) => {
    event.preventDefault();
    if (favourites.includes(id)) {
      dispatch(removeFromFavourites(id));
    } else {
      dispatch(addToFavourites(id));
    }
  };

  const handleDeleteAll = () => {
    dispatch(hideMany(favourites));
    favourites.forEach((id) => dispatch(removeFromFavourites(id)));

    // прибираємо вибрані з displayedItems та підтягуємо стільки, скільки видалили
    setDisplayedItems((prev) => {
      const newDisplayed = prev.filter((b) => !favourites.includes(b.id));
      const visible = items.filter(
        (b) =>
          !hiddenBrewery.includes(b.id) &&
          !newDisplayed.map((d) => d.id).includes(b.id)
      );
      const needed = 15 - newDisplayed.length;
      return [...newDisplayed, ...visible.slice(0, needed)];
    });
  };

  return (
    <div>
      {isLoading && <p>Loading breweries...</p>}
      <ul className={css.ul}>
        {displayedItems.map((brewery) => {
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
        <button onClick={handleDeleteAll}>Delete</button>
      )}
    </div>
  );
}
