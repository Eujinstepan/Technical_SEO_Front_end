import React, { useState } from "react";
import JSONPretty from "react-json-pretty";
import "./App.css";

const ResultContainer = ({ label, buttonText, isObject, data }) => {
  const [showResult, setShowResult] = useState(false);

  return (
    <>
      <div>
        <div className="result-container-style">
          <span>{label}</span>
          <button className="btn-style" onClick={() => setShowResult(!showResult)}>
            {buttonText}
          </button>
        </div>
        <div
          style={{
            display: showResult ? "block" : "none",
          }}
        >
          <pre className="result-rendering-style" >
            <textarea style={{ display: "flex", justifyContent: "center", width: "100%", height: "200px", fontSize: "18px", fontWeight: "300" }}>
            {isObject ? JSON.stringify(data, null, 2) : data}
            </textarea>
          </pre>
        </div>
      </div>
    </>
  );
};

const App = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = () => {
    fetch(`http://localhost:8000/api/v1/insight?url=${url}`)
      .then((response) => response.json())
      .then(setData);
  };

  return (
    <div className="App">
      <input
        className="input-style"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      <div style={{}}>
        <div className="result-font">Result</div>
        {data && (
          <>
            <ResultContainer
              label="Check your site's loading speed"
              buttonText="show result"
              isObject={true}
              data={data.pagespeed}
            />
            <ResultContainer
              label="Leverage 'Inspect URL' feature in GSC "
              buttonText="show result"
              isObject={true}
              data={data.leverage}
            />
            <ResultContainer
              label="Ensure your website is mobile-friendly "
              buttonText="show result"
              isObject={true}
              data={data.isMobileFriendly}
            />
            <ResultContainer
              label="Check Canonical Tags "
              buttonText="show result"
              isObject={true}
              data={data.canonical}
            />
            <ResultContainer
              label="Make sure you are using HTTPS"
              buttonText="show result"
              isObject={true}
              data={data.Ishttpsurl}
            />
            <ResultContainer
              label="Add structured data"
              buttonText="show result"
              isObject={true}
              data={data.StructureData}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
