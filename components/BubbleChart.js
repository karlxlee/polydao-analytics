import Chart from "react-apexcharts";
import React from "react";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Bubble1",
          data: [
            ["a1", 2, 3],
            ["a2", 6, 7],
            ["a3", 6, 7],
          ],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "bubble",
        },
        theme: {
          mode: "dark",
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 0.8,
        },
        title: {
          text: "Simple Bubble Chart",
        },
        xaxis: {
          tickAmount: 12,
          type: "category",
          //   categories: ["a1fw", "a2"],
        },
        yaxis: {
          max: 70,
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bubble"
          height={350}
        />
      </div>
    );
  }
}

export default ApexChart;
