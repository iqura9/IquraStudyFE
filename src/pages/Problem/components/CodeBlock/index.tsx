import React, { useState } from "react";
import { Button, Select } from "antd";
import * as monaco from "monaco-editor";

import styles from "./styles.module.scss";

import { Editor } from "@monaco-editor/react";

const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: "line",
  automaticLayout: true,
  fontFamily: "monaco",
  fontSize: 18,
  minimap: {
    enabled: false,
  },
};

function setEditorTheme(monaco: any) {
  monaco.editor.defineTheme("onedark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      {
        token: "identifier",
        foreground: "9CDCFE",
      },
      {
        token: "identifier.function",
        foreground: "DCDCAA",
      },
      {
        token: "type",
        foreground: "1AAFB0",
      },
      { token: "constant", foreground: "#ffffff" },
    ],

    colors: {
      "editor.background": "#0A0F19",
    },
  });
}

const options = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "Ruby", value: "ruby" },
];

export function CodeBlock() {
  const [code, setCode] = useState("");

  const handleCodeChange = (codeLines: string | undefined) => {
    codeLines && setCode(codeLines);
  };

  const [selectedLanguage, setSelectedLanguage] = useState("typescript");

  const handleChange = (value: string) => {
    setSelectedLanguage(value);
  };

  const handleSubmit = () => {
    console.log(code);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Button onClick={handleSubmit}>Run Code</Button>
        <Select
          className="blackSelect"
          onChange={handleChange}
          value={selectedLanguage}
          options={options}
        />
      </div>
      <Editor
        beforeMount={(monaco) => setEditorTheme(monaco)}
        height={"calc(100vh - 51px)"}
        theme="onedark"
        language={selectedLanguage}
        value={code}
        onChange={handleCodeChange}
        options={editorOptions}
      />
    </div>
  );
}
