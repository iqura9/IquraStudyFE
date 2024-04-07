import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button, Input, Typography } from "antd";

const { Title } = Typography;

const CreateProblemPage = () => {
  const [problemName, setProblemName] = useState("");
  const [description, setDescription] = useState("");
  const [testCases, setTestCases] = useState("");

  const handleCreateProblem = () => {
    // Handle creating the problem, e.g., send data to backend
    console.log("Creating problem:", problemName, description, testCases);
  };

  return (
    <div>
      <Title level={2}>Create Problem</Title>
      <Input
        placeholder="Problem Name"
        value={problemName}
        onChange={(e) => setProblemName(e.target.value)}
      />
      <Input.TextArea
        placeholder="Description (in Markdown)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        autoSize={{ minRows: 6 }}
      />
      <Input.TextArea
        placeholder="Test Cases"
        value={testCases}
        onChange={(e) => setTestCases(e.target.value)}
        autoSize={{ minRows: 4 }}
      />
      <Button type="primary" onClick={handleCreateProblem}>
        Create Problem
      </Button>

      <div style={{ marginTop: 20 }}>
        <Title level={3}>Preview</Title>
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </div>
  );
};

export default CreateProblemPage;
