import React from "react";
import { FormattedMessage } from "react-intl";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Collapse } from "antd";
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
  const { data, submittionStatus } = useProblem();
  const title = data?.title;
  const description = data.description;

  const components = {
    code: ({ inline, className, children, ...props }: CodeProps) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneLight}
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
        <h2 className={styles.title}>{title}</h2>
        <ReactMarkdown components={components} className={styles.description}>
          {description}
        </ReactMarkdown>
      </div>
      <div className={styles.footer}>
        <Collapse bordered={true}>
          <Panel header={<HeaderPanel />} key="1" className={styles.panel}>
            {data?.testCases?.map(
              (testCase: {
                id: React.Key | null | undefined;
                input: string;
                expectedResult: string;
              }) => (
                <TestCase
                  key={testCase.id}
                  input={testCase.input}
                  expectedResult={testCase.expectedResult}
                  isFailed={
                    submittionStatus === undefined
                      ? undefined
                      : !submittionStatus
                  }
                />
              ),
            )}
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default DescriptionBlock;

const HeaderPanel = () => {
  const { data, submittionStatus } = useProblem();
  const testsNum = data?.testCases?.length > 9 ? 10 : data?.testCases?.length;
  const els = [];

  for (let i = 1; i <= testsNum; i++) {
    els.push(<div key={i} className={styles.el} />);
  }

  return (
    <div className={styles.headerPanel}>
      <div className={styles.headerTitle}>
        {" "}
        <FormattedMessage id="test.cases" />
      </div>
      <div className={styles.rightBlock}>
        <div className={styles.numbers}>
          {submittionStatus == true ? testsNum : 0} / {testsNum}
        </div>
        <div className={styles.numGroups}>{els}</div>
      </div>
    </div>
  );
};
interface ITestCase {
  input: string;
  expectedResult: string;
  isFailed: boolean | undefined;
}
const TestCase = ({ input, expectedResult, isFailed }: ITestCase) => {
  return (
    <div
      className={classNames(styles.headerTestCaseWrapper, {
        [styles.failed]: isFailed,
        [styles.success]: isFailed === false,
      })}
    >
      <div className={styles.block}>
        <div className={styles.title}>
          <FormattedMessage id="input" />
        </div>
        <div className={styles.time}>{input}</div>
      </div>
      <div className={styles.block}>
        <div className={styles.title}>
          <FormattedMessage id="expected.output" />
        </div>
        <div className={styles.time}>{expectedResult}</div>
      </div>
      <div className={styles.answer}>
        <FormattedMessage id="passed" />
      </div>
    </div>
  );
};
