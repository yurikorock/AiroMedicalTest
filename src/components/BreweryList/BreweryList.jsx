import { useDispatch, useSelector } from "react-redux";
import {
  selectBreweries,
  selectLoading,
} from "../../redux/breweries/selectors.js";
import { useEffect, useMemo, useState } from "react";
import { fetchBreweries } from "../../redux/breweries/operations.js";
import css from "./BreweryLIst.module.css";
import { selectFavouritesBrew } from "../../redux/favourite/favouritesSelector.js";
import {
  addToFavourites,
  removeFromFavourites,
} from "../../redux/favourite/favouritesSlice.js";
import { selectorHiddenBreweryIds } from "../../redux/breweries/hiddenBreweries/selectors.js";
import { hideMany } from "../../redux/breweries/hiddenBreweries/hiddenBreweryIdsSlice.js";
import { Link } from "react-router-dom";

export default function BreweryList() {
  const PAGE_SIZE_FROM_API = 50; //  backend page size
  const TARGET_UI_COUNT = 15; // how many we show in UI
  

  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const items = useSelector(selectBreweries); //все отримано на даний момент
  const favourites = useSelector(selectFavouritesBrew); // array of ids коли вибрані
  const hiddenBrewery = useSelector(selectorHiddenBreweryIds); // array of ids коли видалені delete

  const [page, setPage] = useState(1);
  const [uiPage, setUiPage] = useState(0);
  // const [displayedItems, setDisplayedItems] = useState([]); // те що показуємо в UI (<= 15)

  // отримуємо пивоварні коли зміни сторінки
  useEffect(() => {
    dispatch(fetchBreweries(page));
  }, [dispatch, page]);

  // видимі елементи = отримуємо елементи окрім прихованих
  const visible = useMemo(() => {
    return items.filter((b) => !hiddenBrewery.includes(b.id));
  }, [items, hiddenBrewery]);

  //загальна кількість сторінок на основі видимих елементів
  const totalUiPages = useMemo(() => {
    if (visible.length === 0) return 1;
    return Math.ceil(visible.length / TARGET_UI_COUNT);
  }, [visible.length]);

  // Clamp uiPage if visible length shrinks (e.g. after Delete)
  useEffect(() => {
    setUiPage((prev) => {
      const maxIndex = totalUiPages - 1;
      return Math.min(prev, maxIndex < 0 ? 0 : maxIndex);
    });
  }, [totalUiPages]);

  // Items to display on current UI page
  const displayedItems = useMemo(() => {
    const start = uiPage * TARGET_UI_COUNT;
    const end = start + TARGET_UI_COUNT;
    return visible.slice(start, end);
  }, [visible, uiPage]);

  // Heuristic: do we likely have more pages on backend?
  const mightHaveMorePages = items.length >= page * PAGE_SIZE_FROM_API;

  // Are we on the last UI page?
  const isLastUiPage = uiPage >= totalUiPages - 1;

  // Show Load more when:
  const shouldShowLoadMore = !isLoading && isLastUiPage && mightHaveMorePages;


  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handlePrev = () => {
    setUiPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setUiPage((prev) => {
      const maxIndex = totalUiPages - 1;
      return Math.min(maxIndex, prev + 1);
    });
  };

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
  };

  const disablePrev = uiPage === 0;
  const disableNext = uiPage >= totalUiPages - 1;

  return (
    <div>
       <h1 className={css.title}>Breweries</h1>
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
              <Link to={`/dashboard/${brewery.id}`}>Details</Link>
              
            </li>
          );
        })}
      </ul>

      {shouldShowLoadMore && (
        <button onClick={handleLoadMore} disabled={isLoading}>
          Load more
        </button>
      )}
      {favourites.length > 0 && (
        <button onClick={handleDeleteAll}>Delete</button>
      )}
      <button onClick={handlePrev} disabled={disablePrev}>Prev</button>
      <button onClick={handleNext} disabled={disableNext}>Next</button>
    </div>
  );
}
