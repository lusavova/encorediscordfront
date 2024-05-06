import React from "react";
import MessagesCountChart from "../messages-count-chart/messages-count-chart.component";
import TopicMessageCountChart from "../count-per-topic-chart/count-per-topic-chart.component";
import UserSentimentChart from "../user-sentiment/user-sentiment.component";
import "./dashboard.styles.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Community Insights</h1>
      <div className="dashboard-column">
        <MessagesCountChart />
        <TopicMessageCountChart />
      </div>
      <div className="dashboard-row">
        <UserSentimentChart />
      </div>
    </div>
  );
};

export default Dashboard;
