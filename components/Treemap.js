import React from "react";
import Chart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      series: [
        {
          data: props.data,
        },
      ],
      xaxis: {
        type: "category",
      },
      theme: {
        mode: "dark",
      },
      tooltip: {
        theme: "dark",
      },
      options: {
        legend: {
          show: false,
        },
        chart: {
          height: 350,
          type: "treemap",
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
          type="treemap"
          height={350}
        />
      </div>
    );
  }
}
export default ApexChart;
