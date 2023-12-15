import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";
import { useEffect } from "react";

export default function PostHeatMap({ blogs }: any) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  const weekday = ["일", "월", "화", "수", "목", "금", "토"];
  const day = weekday[today.getDay()];

  //작성일자
  const createPost = blogs.results.map((x: { created_time: string }) => {
    const create = new Date(x.created_time);
    const korDate = new Date(
      create.getTime() - create.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
    return korDate;
  });

  const createPostCount: any = {};
  createPost.forEach((x: string | number) => {
    createPostCount[x] = (createPostCount[x] || 0) + 1;
  });

  // 이번달 1일, 마지막 일
  const firstDay = new Date(year, today.getMonth(), 1);
  const lastDay = new Date(year, month, 0);
  const diffDate = firstDay.getTime() - lastDay.getTime();
  const daysDifference = Math.abs(diffDate / (1000 * 60 * 60 * 24));

  //var yesterday = new Date(now.setDate(now.getDate() - 1));

  let dateArray: any[] = [];
  let firstWeekDate: any[] = [];
  let secondWeekDate: any[] = [];
  let thirdWeekDate: any[] = [];
  let fourthWeekDate: any[] = [];
  let fifthWeekDate: any[] = [];
  let sixthWeekDate: any[] = [];

  useEffect(() => {
    DateArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DateArray = () => {
    dateArray = [];

    for (let i = 1; i <= daysDifference + 1; i++) {
      const monthDate = new Date(year, month - 1, i);

      const korDate = new Date(
        monthDate.getTime() - monthDate.getTimezoneOffset() * 60000
      ).toISOString();

      dateArray.push([korDate.split("T")[0], monthDate.getDay()]);
    }

    const firstWeekDays = dateArray.length > 0 ? 7 - dateArray[0][1] : 0;
    const excaptFirstWeek = (dateArray.length - firstWeekDays) / 7;

    const firstWeekData = dateArray
      ?.slice(0, firstWeekDays)
      .map((_, index) => ({
        x: dateArray[index][0],
        y: createPostCount[dateArray[index][0]]
          ? createPostCount[dateArray[index][0]]
          : 0,
      }));

    const secondWeekData = dateArray
      ?.slice(firstWeekDays, firstWeekDays + 7)
      .map((date) => ({
        x: date[0],
        y: createPostCount[date[0]] ? createPostCount[date[0]] : 0,
      }));

    const thirdWeekData = dateArray
      ?.slice(firstWeekDays + 7, firstWeekDays + 14)
      .map((date) => ({
        x: date[0],
        y: createPostCount[date[0]] ? createPostCount[date[0]] : 0,
      }));

    const fourthWeekData = dateArray
      ?.slice(firstWeekDays + 14, firstWeekDays + 21)
      .map((date) => ({
        x: date[0],
        y: createPostCount[date[0]] ? createPostCount[date[0]] : 0,
      }));

    const fifthhWeekData = dateArray
      ?.slice(firstWeekDays + 21, firstWeekDays + 28)
      .map((date) => ({
        x: date[0],
        y: createPostCount[date[0]] ? createPostCount[date[0]] : 0,
      }));

    if (excaptFirstWeek > 4) {
      const sixthWeekData = dateArray
        ?.slice(firstWeekDays + 28)
        .map((date) => ({
          x: date[0],
          y: createPostCount[date[0]] ? createPostCount[date[0]] : 0,
        }));

      sixthWeekData.forEach((date) => {
        if (!sixthWeekDate.find((item) => item.x === date.x)) {
          sixthWeekDate.push(date);
        }
      });
    }

    // 중복제거
    secondWeekData.forEach((date) => {
      if (!secondWeekDate.find((item) => item.x === date.x)) {
        secondWeekDate.push(date);
      }
    });

    thirdWeekData.forEach((date) => {
      if (!thirdWeekDate.find((item) => item.x === date.x)) {
        thirdWeekDate.push(date);
      }
    });

    fourthWeekData.forEach((date) => {
      if (!fourthWeekDate.find((item) => item.x === date.x)) {
        fourthWeekDate.push(date);
      }
    });

    fifthhWeekData.forEach((date) => {
      if (!fifthWeekDate.find((item) => item.x === date.x)) {
        fifthWeekDate.push(date);
      }
    });

    let currentDay = new Date(firstDay);

    if (firstWeekData && firstWeekData.length < 7) {
      let noneDate: any[] = [];
      for (let i = 0; i < 7 - firstWeekData?.length; i++) {
        const previousMonth = new Date(
          currentDay.setDate(currentDay.getDate() - 1)
        )
          .toISOString()
          .split("T")[0];

        noneDate.push({
          x: previousMonth,
          y: -1,
        });
      }

      const addNoneDate = [...noneDate, ...firstWeekData];

      // 중복제거
      addNoneDate.forEach((date) => {
        if (!firstWeekDate.find((item) => item.x === date.x)) {
          firstWeekDate.push(date);
        }
      });
    } else if (firstWeekData && firstWeekData.length === 7) {
      firstWeekData.forEach((date) => {
        if (!firstWeekDate.find((item) => item.x === date.x)) {
          firstWeekDate.push(date);
        }
      });
    }
  };

  const commonDate = [
    {
      name: "5주",
      data: fifthWeekDate,
    },
    {
      name: "4주",
      data: fourthWeekDate,
    },
    {
      name: "3주",
      data: thirdWeekDate,
    },
    {
      name: "2주",
      data: secondWeekDate,
    },
    {
      name: "1주",
      data: firstWeekDate,
    },
  ];

  const state: ApexOptions = {
    series: sixthWeekDate
      ? [
          {
            name: "6주",
            data: sixthWeekDate,
          },
          ...commonDate,
        ]
      : [...commonDate],
  };

  const options: ApexOptions = {
    chart: {
      type: "heatmap",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    colors: ["#2c82f2"],
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [
            {
              from: -1,
              to: -1,
              color: "#d5d6d8",
            },
            {
              from: 0,
              to: 0,
              color: "#94A3B8",
            },
          ],
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 3,
      colors: ["#F3F4F6"],
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "10px",
        },
      },
    },
    xaxis: {
      type: "category",
      tickPlacement: "between",
      categories: ["일", "월", "화", "수", "목", "금", "토"],
      crosshairs: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

        return (
          "<div class='py-1 px-2 rounded-md'>" +
          "<span class='text-xs'>" +
          data.x.replace(/-/g, ".") +
          "</span>" +
          "<span class='text-xs font-bold'> : " +
          data.y +
          " post" +
          "</span>" +
          "</div>"
        );
      },
    },
  };

  return (
    <>
      <ApexCharts
        options={options}
        series={state.series}
        type="heatmap"
        width={"98%"}
        height={"86%"}
      />
    </>
  );
}
