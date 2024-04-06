import DescriptionBlock from "./components/DescriptionBlock";
import { CodeBlock } from "./components";

import styles from "./styles.module.scss";

function Problem() {
  return (
    <div className={styles.wrapper}>
      <CodeBlock />
      {/* <div className={styles.description}></div> */}
      <DescriptionBlock />
    </div>
  );
}

export default Problem;
