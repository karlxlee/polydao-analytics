import React, { useEffect } from "react";
import Chart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data: props.data,
        },
      ],
      theme: {
        mode: "dark",
      },

      options: {
        chart: {
          toolbar: {
            show: true,
            tools: {
              download: false,
            },
          },
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
        },
        // colors: colors,
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        tooltip: {
          theme: "dark",
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        yaxis: {
          labels: {
            style: {
              colors: "#ffffff",
            },
          },
        },
        xaxis: {
          categories: props.categories,
          labels: {
            style: {
              // colors: colors,
              colors: "#ffffff",
              // fontSize: "12px",
            },
          },
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
          type="bar"
          height={350}
        />
      </div>
    );
  }
}

export default ApexChart;
