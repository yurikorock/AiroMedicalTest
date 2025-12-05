import css from "./BreweryInfo.module.css";

export default function BreweryInfo({ brewery }) {
  if (!brewery) return null;
  const {
    name,
    brewery_type,
    city,
    country,
    phone,
    website_url,
    state,
    street,
  } = brewery;

  return (
    <div className={css.card}>
      <h2 className={css.title}>{name}</h2>

      <ul className={css.list}>
        <li>
          <strong>Type:</strong> {brewery_type}
        </li>
        <li>
          <strong>City:</strong> {city}
        </li>
        <li>
          <strong>State:</strong> {state}
        </li>
        <li>
          <strong>Country:</strong> {country}
        </li>
        <li>
          <strong>Street:</strong> {street}
        </li>
        <li>
          <strong>Phone:</strong> {phone ? phone : "N/A"}
        </li>
        <li>
          <strong>Website:</strong>{" "}
          {website_url ? (
            <a
              href={website_url}
              target="_blank"
              rel="noopener noreferrer"
              className={css.link}
            >
              {website_url}
            </a>
          ) : (
            "N/A"
          )}
        </li>
      </ul>
    </div>
  );
}
