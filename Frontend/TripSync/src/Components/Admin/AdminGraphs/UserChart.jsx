import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import './UserChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UserChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/getUserReg",
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        );
        const data = response.data;

        // Improved date formatting
        const labels = data.map((item) => {
          const date = new Date(item.date);
          return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });
        });
        const userCounts = data.map((item) => item.usercount);

        setChartData({
          labels,
          datasets: [
            {
              label: "Number of Users",
              data: userCounts,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.4,
              pointBackgroundColor: "white",
              pointBorderColor: "rgba(75, 192, 192, 1)",
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="user-chart-container">
      <h2 className="user-chart-title">Website Users Over Time</h2>
      <div className="user-chart-wrapper">
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
                labels: {
                  font: {
                    size: 14,
                    family: "'Arial', sans-serif"
                  },
                  padding: 20
                }
              },
              title: {
                display: true,
                text: "Number of Users Over Time",
                font: {
                  size: 16,
                  weight: 'bold',
                  family: "'Arial', sans-serif"
                },
                padding: 20
              },
              tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#2c3e50',
                bodyColor: '#2c3e50',
                borderColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                callbacks: {
                  title: function(context) {
                    return `Date: ${context[0].label}`;
                  },
                  label: function(context) {
                    return `Users: ${context.parsed.y.toLocaleString()}`;
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(0, 0, 0, 0.05)'
                },
                ticks: {
                  callback: value => value.toLocaleString()
                }
              },
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  maxRotation: 45,
                  minRotation: 45,
                  padding: 10,
                  font: {
                    size: 12
                  },
                  autoSkip: true,
                  maxTicksLimit: 10 // Limit the number of x-axis labels shown
                }
              }
            },
            layout: {
              padding: {
                bottom: 20 // Add padding for rotated labels
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default UserChart;