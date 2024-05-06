import React, { useState, useEffect, useCallback } from "react";
import { Chart } from "react-google-charts";

const TopicMessageCountChart = () => {
  const [topicCountData, setTopicCountData] = useState([
    ["Time", "Bug Report", "Feature Request", "Feedback", "Other", "Question"],
  ]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://staging-encorediscord-tmii.encr.app/get-message-counts-per-topic",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hours: 12 }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      transformData(data.timeMessageCountPerTopic);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const transformData = (data) => {
    const headers = [
      "Time",
      "Bug Report",
      "Feature Request",
      "Feedback",
      "Other",
      "Question",
    ];
    const newData = [headers];

    data.forEach((item) => {
      const row = [new Date(item.timestamp)];
      row.push(item.topicCounts["Bug Report"] || 0);
      row.push(item.topicCounts["Feature Request"] || 0);
      row.push(item.topicCounts["Feedback"] || 0);
      row.push(item.topicCounts["Other"] || 0);
      row.push(item.topicCounts["Question"] || 0);
      newData.push(row);
    });

    setTopicCountData(newData);
  };

  return (
    <Chart
      width={"1600px"}
      height={"400px"}
      chartType="LineChart"
      loader={<div>Loading Message Counts Chart...</div>}
      data={topicCountData}
      options={{
        title: "Activity per Topic",
        titleTextStyle: {
          color: "black",
          fontSize: 24,
        },
        hAxis: {
          title: "Time",
          format: "HH:mm",
          gridlines: {
            color: "transparent",
          },
        },
        vAxis: {
          gridlines: {
            color: "transparent",
          },
        },
        series: {
          0: { color: "#FB607F" },
          1: { color: "#00A86B" },
          2: { color: "#FF7F50" },
          3: { color: "#B53389" },
          4: { color: "#0070BB" },
        },
        legend: { position: "right" },
        pointSize: 5,
      }}
      rootProps={{ "data-testid": "1" }}
    />
  );
};

export default TopicMessageCountChart;
