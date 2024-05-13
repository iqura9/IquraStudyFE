import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import axios from "axios";
import { useProblem } from "contexts/ProblemContext";
import * as monaco from "monaco-editor";

import styles from "./styles.module.scss";

import { Editor } from "@monaco-editor/react";

export const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions =
  {
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

export function setEditorTheme(monaco: any) {
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
  // { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  // { label: "Python", value: "python" },
  // { label: "Java", value: "java" },
  // { label: "Ruby", value: "ruby" },
];

export function CodeBlock() {
  const [code, setCode] = useState("");
  const [executedToken, setExecutedToken] = useState("");
  const { data } = useProblem();
  const handleCodeChange = (codeLines: string | undefined) => {
    codeLines && setCode(codeLines);
  };

  const [selectedLanguage, setSelectedLanguage] = useState("typescript");

  const handleChange = (value: string) => {
    setSelectedLanguage(value);
  };

  const handleSubmit = () => {
    executeCode(code).then((token: string) => {
      setExecutedToken(token);
    });
    console.log(code);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (executedToken) {
      intervalId = setInterval(() => {
        getSubmission(executedToken)
          .then((res) => {
            console.log(res);
            if (
              res?.status?.description !== "In Queue" &&
              res?.status?.description !== "Processing"
            ) {
              clearInterval(intervalId);
            }
          })
          .catch(() => clearInterval(intervalId));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [executedToken]);

  const defaultCodeEditorState =
    data.initFunc ??
    `const solutionFunction = (...args: unknown[]): unknown => {
  // write your solution here
  return;
}`;
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Button onClick={handleSubmit} disabled={code.length === 0}>
          Run Code
        </Button>
        <Select
          className="blackSelect"
          onChange={handleChange}
          value={selectedLanguage}
          options={options}
        />
      </div>
      <Editor
        defaultValue={defaultCodeEditorState}
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

const executeCode = async (code: string) => {
  const options = {
    method: "POST",
    url: import.meta.env.VITE_JUDGE0 + "/submissions",
    params: {
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      // "X-RapidAPI-Key": "4e735bea46mshd81bd7cad2d77a5p16d69cjsn77a23e47813a",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id: 74, //typescript id
      source_code: code,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.token;
  } catch (error) {
    console.error(error);
  }
};

const getSubmission = async (token: string) => {
  const options = {
    method: "GET",
    url: import.meta.env.VITE_JUDGE0 + "/submissions/" + token,
    params: {
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      // "X-RapidAPI-Key": "4e735bea46mshd81bd7cad2d77a5p16d69cjsn77a23e47813a",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
