import React, { useState } from "react";
import JSONPretty from "react-json-pretty";
import "./App.css";

const App = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = () => {
    fetch(`http://localhost:8000/api/v1/insight?url=${url}`)
      .then((response) => response.json())
      .then(setData);
  };

  return (
    <div className="App" style={{ width: "900px" }}>
      <input value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>

      <div style={{}}>
        <div style={{ fontSize: "36px" }}>Result:</div>
        {data && (
          <>
            <div>
              <span style={{ fontSize: "26px" }}>pageSpeed: </span>
              <pre>{JSON.stringify(data.pagespeed, null, 2)}</pre>
            </div>
            <div>
              <span style={{ fontSize: "26px" }}>Leverage "Inspect URL" feature in GSC: </span>
              <pre>{data.leverage}</pre>
            </div>
            <div>
              <span style={{ fontSize: "26px" }}>Check Canonical Tags: </span>
              <pre>{JSON.stringify(data.canonical, null, 2)}</pre>
            </div>
            <div>
              <span style={{ fontSize: "26px" }}>Make sure you are using HTTPS: </span>
              <pre>{JSON.stringify(data.Ishttpsurl, null, 2)}</pre>
            </div>
            <div>
              <span style={{ fontSize: "26px" }}>Add structured data: </span>
              <pre>{JSON.stringify(data.StructureData, null, 2)}</pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
