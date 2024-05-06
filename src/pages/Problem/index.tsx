import { ProblemProvider } from "contexts/ProblemContext";

import DescriptionBlock from "./components/DescriptionBlock";
import { CodeBlock } from "./components";

import styles from "./styles.module.scss";

function Problem() {
  return (
    <div className={styles.wrapper}>
      <ProblemProvider>
        <CodeBlock />
        <DescriptionBlock />
      </ProblemProvider>
    </div>
  );
}

export default Problem;
