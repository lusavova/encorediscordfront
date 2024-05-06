import React from "react";
import MessagesCountChart from "../messages-count-chart/messages-count-chart.component";
import TopicMessageCountChart from "../count-per-topic-chart/count-per-topic-chart.component";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Community Insights</h1>
      <MessagesCountChart />
      <TopicMessageCountChart />
    </div>
  );
};

export default Dashboard;
