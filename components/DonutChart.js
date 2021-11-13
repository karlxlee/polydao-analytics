import React from "react";
import Chart from "react-apexcharts";
class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: props.data,
      //   labels: props.labels,
      options: {
        labels: props.labels,
        legend: { show: false },
        chart: {
          type: "donut",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
        />
      </div>
    );
  }
}

export default ApexChart;
