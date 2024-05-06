import React from "react";
import MessagesCountChart from "../messages-count-chart/messages-count-chart.component";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Community Insights</h1>
      <MessagesCountChart />
    </div>
  );
};

export default Dashboard;
