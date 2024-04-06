// DescriptionBlock.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button, Collapse } from "antd";

import styles from "./styles.module.scss";

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const { Panel } = Collapse;

const DescriptionBlock: React.FC = () => {
  const title = "Your Title";
  const description = `
  ## Description
  
  This is your description in Markdown format.
  
  - You can use **bold** or *italic* text.
  - You can create lists:
    - Item 1
    - Item 2
  
  \`inline code\`
  
  \`\`\`javascript
  // Code block
  function hello() {
    console.log("Hello, world!");
  }
  \`\`\`
  `;

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
        <h2 className={styles.title}>{title}</h2>
        <ReactMarkdown components={components} className={styles.description}>
          {description}
        </ReactMarkdown>
      </div>
      <div className={styles.footer}>
        <Collapse bordered={true}>
          <Panel header="Test Cases" key="1" className={styles.panel}>
            123 3
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default DescriptionBlock;
