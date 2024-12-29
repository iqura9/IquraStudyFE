import { Tabs } from "antd";

import CompetitionHeader from "./CompetitionHeader";
import OverviewTab from "./OverviewTab";
import ScoreboardTab from "./ScoreboardTab";

const competitionData = {
  title: "Two Pointers Technique",
  description:
    "This is a training contest to introduce students to the technique of two pointers, understanding its fundamentals, and mastering its implementation in programming.",
  date: "November 2, 2024, 3:00 PM",
  duration: "3 hours",
  problems: 14,
  difficulty: "Easy",
  format: "IOI, 14 problems, 3 hours",
  ended: "Ended 2 months ago",
  virtual: "Virtual",
  banner: "https://via.placeholder.com/64x64?text=Banner",
};

function CompetitionDetailPage() {
  return (
    <div>
      <CompetitionHeader
        banner={competitionData.banner}
        title={competitionData.title}
        date={competitionData.date}
        virtual={competitionData.virtual}
      />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Overview" key="1">
          <OverviewTab competitionData={competitionData} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Scoreboard" key="2">
          <ScoreboardTab />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default CompetitionDetailPage;
