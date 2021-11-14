import React from "react";
import Chart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.data);
    this.state = {
      series: [
        {
          data: props.data,
        },
      ],
      options: {
        chart: {
          id: "area-datetime",
          type: "area",
          zoom: {
            autoScaleYaxis: true,
          },
          background: "#66000000",
          sparkline: {
            enabled: true,
          },
        },

        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: "hollow",
        },
        xaxis: {
          type: "datetime",
          // min: props.minDate,
          tickAmount: 6,
          labels: {
            style: {
              colors: "#ffffff",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#ffffff",
            },
          },
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
          // theme: "dark",
        },
        theme: {
          mode: "dark",
        },
        // fill: {
        //   type: "gradient",
        //   gradient: {
        //     shadeIntensity: 1,
        //     opacityFrom: 0.7,
        //     opacityTo: 0.9,
        //     stops: [0, 100],
        //   },
        // },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <div id="chart-timeline">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="area"
            height={130}
          />
        </div>
      </div>
    );
  }
}

export default ApexChart;
