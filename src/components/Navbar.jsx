import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link to="/" className="navbar-brand text-warning fw-bold">
        Star Wars Blog
      </Link>

      <div className="dropdown">
        <button
          className="btn btn-warning dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          Favorites {store.favorites.length}
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
          {store.favorites.length === 0 && (
            <li className="dropdown-item">No favorites</li>
          )}

          {store.favorites.map(fav => (
            <li
              key={`${fav.type}-${fav.uid}`}
              className="dropdown-item d-flex justify-content-between align-items-center gap-3"
            >
              <Link
                to={`/details/${fav.type}/${fav.uid}`}
                className="text-decoration-none"
              >
                {fav.name}
              </Link>

              <button
                className="btn btn-sm btn-danger"
                onClick={() =>
                  dispatch({
                    type: "toggle_favorite",
                    payload: fav
                  })
                }
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};