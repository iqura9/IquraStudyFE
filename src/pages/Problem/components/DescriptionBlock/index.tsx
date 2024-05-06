import React from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button, Collapse } from "antd";
import classNames from "classnames";
import { useProblem } from "contexts/ProblemContext";

import styles from "./styles.module.scss";

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const { Panel } = Collapse;

const DescriptionBlock: React.FC = () => {
  const { data } = useProblem();
  const navigate = useNavigate();
  const title = data?.title;
  const description = data.description;

  const components = {
    code: ({ inline, className, children, ...props }: CodeProps) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={materialDark}
          language={match[1]}
          PreTag="div"
          children={String(children).replace(/\n$/, "")}
          customStyle={{ borderRadius: 8 }}
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };
  return (
    <div className={styles.descriptionBlock}>
      <div className={styles.content}>
        <Button className={styles.finishButton} type="primary">
          Finish task
        </Button>
        <Button type="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <h2 className={styles.title}>{title}</h2>
        <ReactMarkdown components={components} className={styles.description}>
          {description}
        </ReactMarkdown>
      </div>
      <div className={styles.footer}>
        <Collapse bordered={true}>
          <Panel header={<HeaderPanel />} key="1" className={styles.panel}>
            {data?.testCases.map((testCase) => (
              <TestCase
                key={testCase.id}
                input={testCase.input}
                expectedResult={testCase.expectedResult}
              />
            ))}
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default DescriptionBlock;

const HeaderPanel = () => {
  const { data } = useProblem();
  const testsNum = data.testCases.length;
  const els = [];

  for (let i = 1; i <= testsNum; i++) {
    els.push(<div key={i} className={styles.el} />);
  }

  return (
    <div className={styles.headerPanel}>
      <div className={styles.headerTitle}>Test Cases</div>
      <div className={styles.rightBlock}>
        <div className={styles.numbers}>0 / {testsNum}</div>
        <div className={styles.numGroups}>{els}</div>
      </div>
    </div>
  );
};
interface ITestCase {
  input: string;
  expectedResult: string;
}
const TestCase = ({ input, expectedResult }: ITestCase) => {
  const isFailed = true;
  return (
    <div
      className={classNames(styles.headerTestCaseWrapper, {
        [styles.failed]: isFailed,
      })}
    >
      <div className={styles.block}>
        <div className={styles.title}>input</div>
        <div className={styles.time}>{input}</div>
      </div>
      <div className={styles.block}>
        <div className={styles.title}>Expected output</div>
        <div className={styles.time}>{expectedResult}</div>
      </div>
      <div className={styles.answer}>Passed</div>
    </div>
  );
};
