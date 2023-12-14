import React, { useState } from "react";
import "./sidebar.css";
import Icon from "@mdi/react";
import {
  mdiContentSave,
  mdiContentSavePlus,
  mdiFileImport,
  mdiPlay,
} from "@mdi/js";

function Sidebar({ run, setScript, setFilename, script }) {
  const [file, setFile] = useState();

  async function importFile() {
    const handles = await window.showOpenFilePicker();
    const newFile = handles[0];
    setFile(newFile);

    const fileData = await newFile.getFile();
    const code = await fileData.text();

    setFilename(newFile.name);
    setScript(code);
  }

  async function saveAs() {
    const file = await window.showSaveFilePicker();
    save(file);
    setFile(file);
  }

  async function save(file) {
    if (!file) return saveAs();
    console.log({ file });
    const writable = await file.createWritable();
    await writable.write(script); // Assuming 'editor' is your editor instance
    await writable.close();
    setFilename(file.name);
  }

  return (
    <div className="sidebar">
      <button onClick={run}>
        <Icon path={mdiPlay} size={1.4} />
      </button>
      <button onClick={importFile}>
        <Icon path={mdiFileImport} size={1.4} />
      </button>
      <button>
        <Icon path={mdiContentSave} size={1.4} onClick={() => save(file)} />
      </button>
      <button>
        <Icon path={mdiContentSavePlus} size={1.4} onClick={saveAs} />
      </button>
    </div>
  );
}

export default Sidebar;
