import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const MessagesCountChart = () => {
  const [messageCounts, setMessageCounts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://staging-encorediscord-tmii.encr.app/get-message-counts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hours: 12,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("failed to fetch data");
      }

      const data = await response.json();
      setMessageCounts(data.timeCounts);
    } catch (error) {
      console.error("error fetching data:", error);
    }
  };

  const formatChartData = () => {
    debugger;
    const chartData = [["Time", "Count"]];
    messageCounts.forEach((count) => {
      chartData.push([new Date(count.timestamp), count.count]);
    });
    return chartData;
  };

  return (
    <Chart
      width={"100%"}
      height={"400px"}
      chartType="LineChart"
      loader={<div>Loading Count Messages Chart</div>}
      data={formatChartData()}
      options={{
        title: "Activity",
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
          0: { label: "Total Messages" },
        },
        fontName: "Inter",
      }}
      rootProps={{ "data-testid": "1" }}
    />
  );
};

export default MessagesCountChart;
