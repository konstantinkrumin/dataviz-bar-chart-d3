import { useState, useEffect } from "react";
import addQuarterStringsToArr from "./addDataDescCol";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUrl() {
    const response = await fetch(url);
    const json = await response.json();
    const dataset = await addQuarterStringsToArr(json.data);
    setData(dataset);
    setLoading(false);
  }

  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
}
export { useFetch };
