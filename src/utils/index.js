export const capitalize = (str) => {
  if (typeof str !== "string") {
    throw Error("This function takes a string as the argument");
  }
  return `${str[0].toUpperCase()}${str.substr(1)}`;
};
