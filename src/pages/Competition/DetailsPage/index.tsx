import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { Tabs } from "antd";

import CompetitionHeader from "./CompetitionHeader";
import OverviewTab from "./OverviewTab";
import ScoreboardTab from "./ScoreboardTab";
import { useGetCompetitionById } from "./useGetCompetitionById";

function CompetitionDetailPage() {
  const { id } = useParams();

  const { data } = useGetCompetitionById(Number(id));
  const { formatMessage } = useIntl();

  return (
    <div>
      <CompetitionHeader
        banner={data?.banner ?? "../../../../public/trophy.webp"}
        title={data?.title ?? "Not Specified"}
        date={new Date(data?.startTime).toLocaleString()}
        virtual={data?.participantMode || "Unknown"}
      />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane
          tab={formatMessage({ id: "competition.overview" })}
          key="1"
        >
          <OverviewTab competitionData={data} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={formatMessage({ id: "competition.scoreboard" })}
          key="2"
        >
          <ScoreboardTab />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default CompetitionDetailPage;
