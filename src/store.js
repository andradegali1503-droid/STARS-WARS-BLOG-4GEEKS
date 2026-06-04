export const initialStore = () => ({
  people: [],
  planets: [],
  vehicles: [],
  starships: [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || []
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_people":
      return { ...store, people: action.payload };

    case "set_planets":
      return { ...store, planets: action.payload };

    case "set_vehicles":
      return { ...store, vehicles: action.payload };

    case "set_starships":
      return { ...store, starships: action.payload };

    case "toggle_favorite": {
      const exists = store.favorites.some(
        fav => fav.uid === action.payload.uid && fav.type === action.payload.type
      );

      const favorites = exists
        ? store.favorites.filter(
            fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
          )
        : [...store.favorites, action.payload];

      localStorage.setItem("favorites", JSON.stringify(favorites));

      return { ...store, favorites };
    }

    default:
      return store;
  }
}