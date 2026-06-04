import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImageUrl, fallbackImage } from "../utils/images";

const API = "https://www.swapi.tech/api";

export const Details = () => {
  const { type, uid } = useParams();
  const [item, setItem] = useState(null);
  const [extraData, setExtraData] = useState({});

  const fetchNameFromUrl = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      return (
        data.result?.properties?.name ||
        data.result?.properties?.title ||
        "Unknown"
      );
    } catch {
      return "Unknown";
    }
  };

  useEffect(() => {
    const getDetails = async () => {
      try {
        setItem(null);
        setExtraData({});

        const response = await fetch(`${API}/${type}/${uid}`);
        const data = await response.json();

        if (!data.result) {
          console.error("No result found:", data);
          return;
        }

        const properties = data.result.properties;
        setItem(properties);

        const extras = {};

        const keysToResolve = [
          "homeworld",
          "films",
          "pilots",
          "people",
          "residents",
          "characters",
          "starships",
          "vehicles",
          "planets"
        ];

        for (const key of keysToResolve) {
          if (properties[key]) {
            if (Array.isArray(properties[key])) {
              extras[key] = await Promise.all(
                properties[key].map((url) => fetchNameFromUrl(url))
              );
            } else {
              extras[key] = await fetchNameFromUrl(properties[key]);
            }
          }
        }

        setExtraData(extras);
      } catch (error) {
        console.error("Error loading details:", error);
      }
    };

    getDetails();
  }, [type, uid]);

  if (!item) {
    return <h1 className="text-center mt-5">Loading...</h1>;
  }

  const formatValue = (key, value) => {
    if (extraData[key]) {
      return Array.isArray(extraData[key])
        ? extraData[key].join(", ")
        : extraData[key];
    }

    if (Array.isArray(value)) {
      return value.length > 0 ? "No data" : "No data";
    }

    if (value === "" || value === null || value === undefined) {
      return "No data";
    }

    return String(value);
  };

  return (
    <main className="container py-5">
      <div className="row">
        <div className="col-md-5">
          <img
            src={getImageUrl(type, uid)}
            alt={item.name || item.title}
            className="img-fluid rounded"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImage;
            }}
          />
        </div>

        <div className="col-md-7">
          <h1>{item.name || item.title}</h1>
          <p className="lead">
            Información obtenida desde SWAPI.tech.
          </p>
        </div>
      </div>

      <hr />

      <div className="row">
        {Object.entries(item)
          .filter(([key]) => !["created", "edited", "url"].includes(key))
          .map(([key, value]) => (
            <div className="col-md-3 mb-3" key={key}>
              <h6 className="text-danger">
                {key.replaceAll("_", " ").toUpperCase()}
              </h6>
              <p>{formatValue(key, value)}</p>
            </div>
          ))}
      </div>
    </main>
  );
};