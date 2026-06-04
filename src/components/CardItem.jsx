import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getImageUrl, fallbackImage } from "../utils/images";

export const CardItem = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();

  const isFavorite = store.favorites.some(
    fav => fav.uid === item.uid && fav.type === type
  );

  return (
    <div
      className="card mx-2 starwars-card"
      style={{
        minWidth: "18rem",
        backgroundColor: "#000",
        color: "#fff",
        border: "1px solid #df6a0b"
      }}
    >
      <img
        src={getImageUrl(type, item.uid)}
        alt={item.name}
        className="card-img-top"
        style={{
          height: "250px",
          objectFit: "cover",
          backgroundColor: "#000"
        }}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallbackImage;
        }}
      />

      <div className="card-body">
        <h5
          className="card-title"
          style={{
            color: "#df6a0b",
            minHeight: "48px"
          }}
        >
          {item.name}
        </h5>

        <div className="d-flex justify-content-between align-items-center">
          <Link
            to={`/details/${type}/${item.uid}`}
            className="btn btn-outline-warning"
          >
            Learn more
          </Link>

          <button
            className={`btn ${
              isFavorite ? "btn-warning" : "btn-outline-warning"
            }`}
            onClick={() =>
              dispatch({
                type: "toggle_favorite",
                payload: {
                  uid: item.uid,
                  name: item.name,
                  type
                }
              })
            }
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
};