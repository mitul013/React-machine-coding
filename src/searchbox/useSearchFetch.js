import { useCallback, useEffect, useState } from "react";

function debounce(fn, debounceTime) {
  let timeId = null;
  return function (...args) {
    clearTimeout(timeId);
    timeId = setTimeout(() => {
      fn.apply(this, args);
    }, debounceTime);
  };
}

const useSearchFetch = (query, fetchPromiseFn, transformData, debounceWait) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    debounce(async (query, transformData) => {
      setError(null);
      const resJson = await fetchPromiseFn(query);
      const response = await resJson.json();
      const data = transformData(response);
      console.log({ data });
      setData(data);
    }, debounceWait),
    []
  );

  useEffect(() => {
    if (!query) return;
    fetchData(query, transformData);
  }, [query, fetchPromiseFn, transformData, debounceWait]);

  return { data, error, setData };
};

export default useSearchFetch;
