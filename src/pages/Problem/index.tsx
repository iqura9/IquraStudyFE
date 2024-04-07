import DescriptionBlock from "./components/DescriptionBlock";
import { CodeBlock } from "./components";

import styles from "./styles.module.scss";

function Problem() {
  return (
    <div className={styles.wrapper}>
      <CodeBlock />
      <DescriptionBlock />
    </div>
  );
}

export default Problem;
