import React from "react";
import "./sidebar.css";
import Icon from "@mdi/react";
import { mdiContentSave, mdiFileImport, mdiPlay } from "@mdi/js";

function importFile(setScript, setFilename) {
  var input = document.createElement("input");
  input.type = "file";
  input.onchange = (e) => {
    var file = e.target.files[0];

    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    console.log(file);
    reader.onload = (readerEvent) => {
      var content = readerEvent.target.result;
      setFilename(file.name);
      setScript(content);
    };
  };
  input.click();
}

function Sidebar({ run, setScript, setFilename }) {
  return (
    <div className="sidebar">
      <button onClick={run}>
        <Icon path={mdiPlay} size={1.4} />
      </button>
      <button>
        <Icon path={mdiContentSave} size={1.4} />
      </button>
      <button onClick={() => importFile(setScript, setFilename)}>
        <Icon path={mdiFileImport} size={1.4} />
      </button>
      <button>
        <Icon path={mdiContentSave} size={1.4} />
      </button>
    </div>
  );
}

export default Sidebar;
