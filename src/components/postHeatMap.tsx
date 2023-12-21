import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function PostHeatMap({ blogs, year, month }: any) {
  const { theme } = useTheme();
  const today = new Date(`${year}-${month}`);
  const yearChart = today.getFullYear();
  const monthChart = today.getMonth() + 1;

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
  const firstDay = new Date(yearChart, today.getMonth(), 1);
  const lastDay = new Date(yearChart, monthChart, 0);
  const diffDate = firstDay.getTime() - lastDay.getTime();
  const daysDifference = Math.abs(diffDate / (1000 * 60 * 60 * 24));

  let dateArray: any[] = [];
  let firstWeekDate: any[] = [];
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

    const middleWeek = (startWeekDay: number, lastWeekDay: number) => {
      return dateArray
        ?.slice(firstWeekDays + startWeekDay, firstWeekDays + lastWeekDay)
        .map((date) => ({
          x: date[0],
          y: createPostCount[date[0]] ? createPostCount[date[0]] : 0,
        }));
    };

    const secondWeekData = middleWeek(0, 7);
    const thirdWeekData = middleWeek(7, 14);
    const fourthWeekData = middleWeek(14, 21);
    const fifthhWeekData = middleWeek(21, 28);

    if (excaptFirstWeek > 4) {
      sixthWeekDate = dateArray?.slice(firstWeekDays + 28).map((date) => ({
        x: date[0],
        y: createPostCount[date[0]] ? createPostCount[date[0]] : 0,
      }));
    }

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

    return [
      firstWeekDate,
      secondWeekData,
      thirdWeekData,
      fourthWeekData,
      fifthhWeekData,
      sixthWeekDate,
    ];
  };

  const firstWeekDatas = DateArray()[0];
  const secondWeekDatas = DateArray()[1];
  const thirdWeekDatas = DateArray()[2];
  const fourthWeekDatas = DateArray()[3];
  const fifthWeekDatas = DateArray()[4];
  const sixWeekDatas = DateArray()[5];

  const commonDate = [
    {
      name: "5주",
      data: fifthWeekDatas,
    },
    {
      name: "4주",
      data: fourthWeekDatas,
    },
    {
      name: "3주",
      data: thirdWeekDatas,
    },
    {
      name: "2주",
      data: secondWeekDatas,
    },
    {
      name: "1주",
      data: firstWeekDatas,
    },
  ];

  const state: ApexOptions = {
    series:
      sixthWeekDate.length > 0
        ? [
            {
              name: "6주",
              data: sixWeekDatas,
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
      colors: theme === "light" ? ["#F3F4F6"] : ["#1f2937"],
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "10px",
          colors: theme === "light" ? "#000" : "#d5d6d8",
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
      labels: {
        style: {
          colors: theme === "light" ? "#000" : "#d5d6d8",
        },
      },
      axisBorder: {
        show: true,
        color: "#78909C",
      },
    },
    tooltip: {
      enabled: true,

      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

        if (data.y === -1) {
          return "";
        }

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
