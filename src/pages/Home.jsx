import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { CardItem } from "../components/CardItem";

const API = "https://www.swapi.tech/api";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const getData = async (type, actionType) => {
    try {
      const response = await fetch(`${API}/${type}`);
      const data = await response.json();

      dispatch({
        type: actionType,
        payload: data.results
      });
    } catch (error) {
      console.error(`Error loading ${type}:`, error);
    }
  };

  useEffect(() => {
    getData("people", "set_people");
    getData("planets", "set_planets");
    getData("vehicles", "set_vehicles");
    getData("starships", "set_starships");
  }, []);

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-center my-5">
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
    alt="Star Wars"
    className="starwars-logo"
  />
</div>

      <Section title="Characters" items={store.people} type="people" />
      <Section title="Planets" items={store.planets} type="planets" />
      <Section title="Vehicles" items={store.vehicles} type="vehicles" />
      <Section title="Starships" items={store.starships} type="starships" />
    </main>
  );
};

const Section = ({ title, items, type }) => {
  return (
    <>
      <h2 className="text-warning mt-5">{title}</h2>

      <div className="d-flex overflow-auto pb-3">
        {items.map(item => (
          <CardItem
            key={`${type}-${item.uid}`}
            item={item}
            type={type}
          />
        ))}
      </div>
    </>
  );
};