import React from "react";

function useLocalStorage<T>(key: string) {
  const [data, setData] = React.useState<T | null>(() => {
    const backup = localStorage.getItem(key);
    return typeof backup === "string" ? (JSON.parse(backup) as T) : backup;
  });

  function updateState() {
    const backup = localStorage.getItem(key);
    setData(typeof backup === "string" ? (JSON.parse(backup) as T) : backup);
  }

  function get() {
    updateState();
    return data;
  }

  function remove() {
    localStorage.removeItem("key");
    updateState();
  }

  function put(data: T) {
    localStorage.setItem(key, JSON.stringify(data));
    updateState();
  }

  function patch(callback: (callbackData: typeof data) => typeof data) {
    localStorage.setItem(key, JSON.stringify(callback(data)));
    updateState();
  }

  return {
    get,
    patch,
    put,
    remove,
  };
}

export { useLocalStorage };
