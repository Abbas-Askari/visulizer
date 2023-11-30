import { useMemo, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Editor from "./Editor";
import "./App.css";
import Sidebar from "./Sidebar";

function App() {
  const [count, setCount] = useState(0);
  const iFrameRef = useRef();
  const [script, setScript] = useState(() => {
    const codeJSON = localStorage.getItem("code");
    if (codeJSON != undefined) {
      return JSON.parse(codeJSON);
    }
    return "";
  });
  const [filename, setFilename] = useState("Untitled.js");

  const doc = ` 
    <html>
      <body></body>
      <script>${script}</script>
    </html>
  `;
  function run() {
    // iFrameRef.current.contentWindow.location.reload(true);
    // iFrameRef.current.srcdoc = doc;
  }

  function handleChange(value) {
    setScript(value);

    localStorage.setItem("code", JSON.stringify(value));
  }

  return (
    <>
      <div className="content">
        {/* <div className="pane editor"> */}
        <Editor
          handleChange={handleChange}
          value={script}
          filename={filename}
        />
        {/* </div> */}
        <div className={"output"}>
          <div className="title">Output</div>
          <iframe ref={iFrameRef} srcDoc={doc}></iframe>
        </div>
        <Sidebar run={run} setScript={setScript} setFilename={setFilename} />
      </div>
    </>
  );
}

export default App;
