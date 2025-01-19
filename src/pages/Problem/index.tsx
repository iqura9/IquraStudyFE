import { useSearchParams } from "react-router-dom";
import { ProblemProvider } from "contexts/ProblemContext";
import ViewCompetitionSidebar from "pages/Competition/ViewCompetitionSidebar";

import DescriptionBlock from "./components/DescriptionBlock";
import { CodeBlock } from "./components";

import styles from "./styles.module.scss";

function Problem() {
  const [searchParams] = useSearchParams();
  const competitionId = searchParams.get("competitionId");
  return (
    <ViewCompetitionSidebar isCompetiton={!!competitionId}>
      <div className={styles.wrapper}>
        <ProblemProvider>
          <CodeBlock />
          <DescriptionBlock />
        </ProblemProvider>
      </div>
    </ViewCompetitionSidebar>
  );
}

export default Problem;
