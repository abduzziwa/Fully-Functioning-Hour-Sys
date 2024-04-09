import React, { useState, useEffect } from "react";
import DonutChart from "react-donut-chart";
import axios from "axios";
import "./component styles/profile.css";
import Sidebar from "./Sidebar";

// Define an interface for the data returned from the endpoint
interface ProjectData {
  Projectnaam: string;
  TotalWorkedHours: string;
  TotalProjectHours: string;
}

const Don: React.FC = () => {
  const [chartData, setChartData] = useState<ProjectData[]>([]);

  useEffect(() => {
    // Fetch data from the endpoint
    axios
      .get<ProjectData[]>(
        "http://localhost/Projects/backendcode/projectHoursDon.php"
      )
      .then((response) => {
        // Set the chart data with the retrieved data
        setChartData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="d-flex">
      <div>
        <Sidebar />
      </div>
      <div>
        <h2>De Gewerkte uren, Resterende uren en Verliesuren</h2>
        <div className="donut-chart-grid">
          {chartData.map((data, index) => (
            <div key={index} className="donut-chart-container">
              <h3>
                {data.Projectnaam} ({data.TotalWorkedHours} Uren)
              </h3>
              <DonutChart
                data={[
                  {
                    label: "Gewerkte",
                    value: parseFloat(data.TotalWorkedHours),
                    isEmpty: false,
                  },
                  {
                    label: "Resterende",
                    value: Math.max(
                      0,
                      parseFloat(data.TotalProjectHours) -
                        parseFloat(data.TotalWorkedHours)
                    ),
                    isEmpty: false,
                  },
                  {
                    label: "Verlies",
                    value: Math.max(
                      0,
                      parseFloat(data.TotalWorkedHours) -
                        parseFloat(data.TotalProjectHours)
                    ),
                    isEmpty: false,
                  },
                ]}
                className="donut-chart"
                height={300}
                width={400}
                colors={["#00FF00", "#A9A9A9", "#FF0000"]} // Pure green, Pure grey, Pure red
                emptyColor="#A9A9A9" // Pure grey for empty data items
                // Pure red for stroke color
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Don;
