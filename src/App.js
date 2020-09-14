import React, { useEffect, useRef } from "react";
import "./styles/main.scss";

import { useFetch } from "./helpers/fetchData";
import { render } from "./helpers/chart";

export default function App() {
  const WIDTH = 1260;
  const HEIGHT = 600;
  const DATA_LINK =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
  const [data, loading] = useFetch(DATA_LINK);
  const ref = useRef();

  useEffect(() => {
    if (data.length !== 0) {
      render(data, ref, WIDTH, HEIGHT);
    }
  }, [loading]);

  return (
    <div className="app">
      <div className="viz-container">
        <svg className="graph" ref={ref} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} />
      </div>
    </div>
  );
}
