import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button, notification, Select } from "antd";
import { createProblemSubmittion } from "api/problem.api";
import axios from "axios";
import { useProblem } from "contexts/ProblemContext";
import * as monaco from "monaco-editor";

import styles from "./styles.module.scss";

import { Editor } from "@monaco-editor/react";
import { useMutation } from "@tanstack/react-query";

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

const options = [{ label: "TypeScript", value: "typescript" }];

export function CodeBlock() {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [executedToken, setExecutedToken] = useState("");
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { mutate: createProblemSubmittionFn } = useMutation<
    unknown,
    Error,
    {
      sourceCode: string;
      score: number;
      groupTaskId: number;
      problemId: number;
    }
  >({
    mutationKey: ["createProblemSubmittion"],
    mutationFn: (data) => createProblemSubmittion(data),
    onSuccess: () => {},
    onError: (error) => {
      notification.error({ message: error.name, description: error.message });
    },
  });

  const { data, setSubmittionStatus } = useProblem();
  const handleCodeChange = (codeLines: string | undefined) => {
    codeLines && setCode(codeLines);
  };

  const [selectedLanguage, setSelectedLanguage] = useState("typescript");

  const handleChange = (value: string) => {
    setSelectedLanguage(value);
  };

  const handleSubmit = () => {
    executeCode(code, data.testCases).then((token: string) => {
      setExecutedToken(token);
    });
  };

  const saveSubmittion = (score: number) => {
    const DTO = {
      sourceCode: code,
      score: score,
      groupTaskId: Number(searchParams.get("taskId")),
      problemId: Number(id),
    };
    createProblemSubmittionFn(DTO);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (executedToken) {
      setIsLoading(true);
      intervalId = setInterval(() => {
        getSubmission(executedToken)
          .then((res) => {
            if (
              res?.status?.description !== "In Queue" &&
              res?.status?.description !== "Processing"
            ) {
              setIsLoading(false);
              clearInterval(intervalId);
            }
            if (res?.status?.description === "Accepted") {
              const output = res.stdout.split("\n");
              let allTrue = true;
              data.testCases.forEach(
                (res: { expectedResult: any }, index: string | number) => {
                  const expected = res.expectedResult;
                  if (
                    JSON.stringify(output[index]) !== JSON.stringify(expected)
                  ) {
                    console.log("output", JSON.stringify(output[index]));
                    console.log("expected", JSON.stringify(expected));

                    allTrue = false;
                  }
                }
              );
              setSubmittionStatus && setSubmittionStatus(allTrue);
              saveSubmittion(allTrue === true ? 100 : 0);
            }
          })
          .catch(() => {
            setIsLoading(false);
            clearInterval(intervalId);
          });
      }, 1000);
    }
    return () => {
      setIsLoading(false);
      clearInterval(intervalId);
    };
  }, [executedToken, data, setSubmittionStatus]);

  const defaultCodeEditorState =
    data.initFunc ??
    `const solutionFunction = (...args: unknown[]): unknown => {
  // write your solution here
  return;
}`;
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Button type="primary" onClick={() => navigate(-1)}>
          <FormattedMessage id="code.go.back" />
        </Button>
        <Button
          className={styles.runCode}
          onClick={handleSubmit}
          disabled={code.length === 0}
          loading={isLoading}
        >
          <FormattedMessage id="code.run" />
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
        height={"calc(100vh - 52px)"}
        className={styles.override}
        theme="onedark"
        language={selectedLanguage}
        value={code}
        onChange={handleCodeChange}
        options={editorOptions}
      />
    </div>
  );
}

const executeCode = async (code: string, testCases: any[]) => {
  const functionName = code.match(/(?:const|function)\s+([^\s\(]+)/)?.[1] || "";
  const testCase = testCases.map(
    (testCase) => `\n console.log(${functionName}(${testCase.input}))`
  );
  const testCode = code + testCase.join("");

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
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id: 74, //typescript id
      source_code: testCode,
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
