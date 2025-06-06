// @ts-nocheck
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button, notification, Select } from "antd";
import { api } from "api/index";
import { createProblemSubmittion } from "api/problem.api";
import axios from "axios";
import { useProblem } from "contexts/ProblemContext";
import { VerifySubmittionRequest } from "generated-api/api";
import * as monaco from "monaco-editor";
import { useGetPerticipation } from "pages/Competition/ViewCompetitionSidebar/useGetPerticipation";

import styles from "./styles.module.scss";

import { Editor } from "@monaco-editor/react";
import { useMutation } from "@tanstack/react-query";

function removeSpaces(str: string) {
  return str.replace(/\s+/g, "");
}

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
      base: "vs", // Light theme base
      inherit: true,
      rules: [
        {
          token: "identifier",
          foreground: "3B4C96", // soft indigo
        },
        {
          token: "identifier.function",
          foreground: "6A3E8E", // muted purple
        },
        {
          token: "type",
          foreground: "007B9C", // cyan blue for types
        },
        {
          token: "constant",
          foreground: "D35400", // rich orange
        },
        {
          token: "string",
          foreground: "008000", // green
        },
        {
          token: "keyword",
          foreground: "AF005F", // ruby pink
          fontStyle: "bold",
        },
        {
          token: "comment",
          foreground: "999999",
          fontStyle: "italic",
        },
      ],
      colors: {
        "editor.background": "#FAFAFA", // off-white, very soft
        "editor.foreground": "#2E2E2E",
        "editorLineNumber.foreground": "#B0B0B0",
        "editorLineNumber.activeForeground": "#333333",
        "editorCursor.foreground": "#4A4A4A",
        "editor.selectionBackground": "#D0E8FF",
        "editor.inactiveSelectionBackground": "#EAF3FF",
        "editorIndentGuide.background": "#E0E0E0",
        "editorIndentGuide.activeBackground": "#C0C0C0",
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
  const { data: participation } = useGetPerticipation();
  const lastSubmission = participation?.submissions
    ?.filter((submission) => submission.problemId == id)
    ?.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))?.[0];

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
    mutationFn: (data) => createProblemSubmittion(data).then((res) => res.data),
    onSuccess: () => {},
    onError: (error) => {
      notification.error({ message: error.name, description: error.message });
    },
  });

  const { mutate: createProblemSubmittionCompetitionFn } = useMutation<
    void,
    Error,
    VerifySubmittionRequest
  >({
    mutationKey: ["createProblemSubmittionCompetitionFn"],
    mutationFn: (data) => {
      return api.apiProblemVerifySubmittionPost(data).then((res) => res.data);
    },
    onSuccess: () => {},
    onError: (error) => {
      notification.error({
        message: "Error Creating Competition",
        description: error.message,
      });
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
    const participationId = Number(searchParams.get("participationId"));

    if (participationId) {
      createProblemSubmittionCompetitionFn({
        competitionId: Number(searchParams.get("competitionId")),
        participationId,
        problemId: Number(id),
        sourceCode: code,
        score,
      });
      return;
    }

    createProblemSubmittionFn({
      sourceCode: code,
      score: score,
      groupTaskId: Number(searchParams.get("taskId")),
      problemId: Number(id),
    });
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
              if (res?.status?.description !== "Accepted") {
                notification.error({ message: res?.status?.description });
              }

              setIsLoading(false);
              clearInterval(intervalId);
            }
            if (res?.status?.description === "Accepted") {
              const output = res.stdout.split("\n");
              let allTrue = true;
              data.testCases.forEach(
                (res: { expectedResult: any }, index: string | number) => {
                  const expected = res.expectedResult;

                  const expectedData = removeSpaces(JSON.stringify(expected));
                  const outputData = removeSpaces(
                    JSON.stringify(output[index]),
                  );

                  if (outputData !== expectedData) {
                    console.log("output", outputData);
                    console.log("expected", expectedData);

                    allTrue = false;
                  }
                },
              );
              const score = allTrue === true ? 100 : 0;
              notification.success({
                message: `Score: ${score}`,
                description: `Output: ${res?.stdout}`,
              });

              setSubmittionStatus && setSubmittionStatus(allTrue);
              saveSubmittion(score);
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

  const defaultCodeEditorState = lastSubmission?.sourceCode
    ? lastSubmission?.sourceCode
    : data?.initFunc ??
      `const solutionFunction = (...args: unknown[]): unknown => {
  // write your solution here
  return;
}`;
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Button   className="blackSelect" onClick={() => navigate(-1)}>
          <FormattedMessage id="code.go.back" />
        </Button>
        <Select
          className="blackSelect"
          onChange={handleChange}
          value={selectedLanguage}
          options={options}
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={code.length === 0}
          loading={isLoading}
        >
          <FormattedMessage id="code.run" />
        </Button>
       
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
  const testCase = testCases?.map(
    (testCase) => `\n console.log(${functionName}(${testCase.input}))`,
  );
  const testCode = code + testCase?.join("");

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



