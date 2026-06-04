export const fallbackImage =
  "https://dummyimage.com/600x400/000/fff&text=No+Image";

export const getImageUrl = (type, uid) => {
  return `https://github.com/breatheco-de/swapi-images/blob/master/public/images/${type}/${uid}.jpg?raw=true`;
};