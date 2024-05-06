import React, { useState, useEffect, useCallback, Fragment } from "react";
import { Chart } from "react-google-charts";

const UserSentimentChart = () => {
  const [positiveSentimentData, setPositiveSentimentData] = useState([]);
  const [negativeSentimentData, setNegativeSentimentData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://staging-encorediscord-tmii.encr.app/get-user-sentiment",
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
      formatChartData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const formatChartData = (data) => {
    const positiveChartData = [["User", "Score"]];
    const negativeChartData = [["User", "Score"]];

    if (data.positiveSentiments) {
      for (const user in data.positiveSentiments) {
        positiveChartData.push([user, data.positiveSentiments[user]]);
      }
    }
    if (data.negativeSentiments) {
      for (const user in data.negativeSentiments) {
        negativeChartData.push([user, data.negativeSentiments[user]]);
      }
    }

    setPositiveSentimentData(positiveChartData);
    setNegativeSentimentData(negativeChartData);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const commonOptions = {
    titleTextStyle: {
      color: "black",
      fontSize: 24,
    },
    hAxis: {
      gridlines: {
        color: "transparent",
      },
    },
    vAxis: {
      gridlines: {
        color: "transparent",
      },
      viewWindow: {
        min: 0,
        max: 1,
      },
    },
    bar: { groupWidth: "50px" },
  };

  return (
    <Fragment>
      <Chart
        chartType="ColumnChart"
        width="750px"
        height="400px"
        data={positiveSentimentData}
        options={{
          ...commonOptions,
          title: "Happiest Users",
          colors: ["00A86B"],
        }}
      />
      <Chart
        chartType="ColumnChart"
        width="750px"
        height="400px"
        data={negativeSentimentData}
        options={{
          ...commonOptions,
          title: "Unhappiest Users",
          colors: ["7C0902"],
        }}
      />
    </Fragment>
  );
};

export default UserSentimentChart;
