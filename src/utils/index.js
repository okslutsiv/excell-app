export const capitalize = (str) => {
  if (typeof str !== "string") {
    throw Error("This function takes a string as the argument");
  }
  return `${str[0].toUpperCase()}${str.substr(1)}`;
};

export const storage = (key, data) => {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
};

export const isEqual = (v1, v2) => {
  return JSON.stringify(v1) === JSON.stringify(v2);
};

export const objToString = (obj) => {
  const camelToDashCase = (str) => {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
  };
  return Object.keys(obj)
    .map((key) => {
      return `${camelToDashCase(key)}:${obj[key]}`;
    })
    .join(";");
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// `wait` milliseconds.
export const debounce = (cb, wait) => {
  let timeout;

  return (...args) => {
    const later = () => {
      clearTimeout(timeout);
      cb(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const parse = (value) => {
  if (value && value.startsWith("=")) {
    value = value.substr(1);
    return eval(value);
  }
  return value;
};
