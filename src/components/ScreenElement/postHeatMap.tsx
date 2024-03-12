import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { PostCountType, PostHeatMapType } from "@/InterfaceGather";
import UseProperties from "libs/useProperties";
import Link from "next/link";
import { BsBoxArrowUpRight } from "react-icons/bs";

export default function PostHeatMap({
  combinedBlogs,
  year,
  month,
}: PostHeatMapType) {
  const { theme } = useTheme();
  const today = new Date(`${year}-${month}`);
  const yearChart = today.getFullYear();
  const monthChart = today.getMonth() + 1;

  //작성일자
  const createPost = combinedBlogs.map(
    (x: { id: string; created_time: string }) => {
      const itemData = UseProperties(x);
      const create = new Date(x.created_time);
      const korDate = new Date(
        create.getTime() - create.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      return { korDate, postId: x.id, postName: itemData.name };
    }
  );

  const createPostCount: PostCountType = {};
  createPost.forEach((x: { korDate: string | number; postId: string }) => {
    createPostCount[x.korDate] = (createPostCount[x.korDate] || 0) + 1;
  });

  // 이번달 1일, 마지막 일
  const firstDay = new Date(yearChart, today.getMonth(), 1);
  const lastDay = new Date(yearChart, monthChart, 0);
  const diffDate = firstDay.getTime() - lastDay.getTime();
  const daysDifference = Math.abs(diffDate / (1000 * 60 * 60 * 24));

  let dateArray: [string, number][] = [];
  let firstWeekDate: { x: string; y: number }[] = [];
  let sixthWeekDate: { x: string; y: number }[] = [];

  useEffect(() => {
    DateArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DateArray = () => {
    dateArray = [];
    for (let i = 1; i <= daysDifference + 1; i++) {
      const monthDate = new Date(year, Number(month) - 1, i);

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
      let noneDate: { x: string; y: number }[] = [];
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

  const todayDate = new Date();
  const todayYear = todayDate.getFullYear();
  const todayMonth = String(todayDate.getMonth() + 1).padStart(2, "0");
  const todayDay = String(todayDate.getDate()).padStart(2, "0");
  const dashDate = `${todayYear}-${todayMonth}-${todayDay}`;
  const [clickDate, setClickDate] = useState(dashDate);
  const todayCount = createPostCount[`${todayYear}-${todayMonth}-${todayDay}`];
  const [clickPostNum, setClickPostNum] = useState(todayCount ? todayCount : 0);

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
      events: {
        click: function (event, chartContext, config) {
          if (
            config &&
            config.dataPointIndex !== undefined &&
            config.seriesIndex !== undefined
          ) {
            const seriesIndex = config.seriesIndex;
            const dataPointIndex = config.dataPointIndex;
            const seriesX = chartContext.w.globals.seriesX;

            if (
              seriesX &&
              Array.isArray(seriesX[seriesIndex]) &&
              seriesX[seriesIndex][dataPointIndex] !== undefined
            ) {
              const xValue =
                chartContext.w.globals.seriesX[seriesIndex][dataPointIndex];

              setClickDate(xValue);
            }

            const seriesY = chartContext.w.globals.series;
            let yValue;
            if (
              seriesY &&
              Array.isArray(seriesY[seriesIndex]) &&
              seriesY[seriesIndex][dataPointIndex] !== undefined
            ) {
              yValue =
                chartContext.w.globals.series[seriesIndex][dataPointIndex];
              setClickPostNum(yValue);
            }
          }
        },
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
        show: false,
      },
      axisTicks: {
        show: false,
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

  const createPostId: any = {};
  createPost.forEach(
    (x: { korDate: string | number; postId: string; postName: string }) => {
      if (!createPostId[x.korDate]) {
        createPostId[x.korDate] = [{ name: x.postName, id: x.postId }];
      } else {
        createPostId[x.korDate].push({ name: x.postName, id: x.postId });
      }
    }
  );
  const clickedId = createPostId[clickDate];

  return (
    <>
      <div className="mt-2 h-[330px] w-full">
        <ApexCharts
          options={options}
          series={state.series}
          type="heatmap"
          width={"100%"}
          height={"90%"}
        />
      </div>
      <div className="w-full h-[200px] flex flex-col rounded-lg bg-gray-100 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <p className="text-xs">Post activity</p>
          <p>총 {clickPostNum}개 포스팅</p>
          <p className="text-xs">{clickDate.replace(/-/g, ".")}</p>
        </div>
        <div className="text-center flex items-center justify-center">
          <div className="flex flex-col gap-3 pt-5 text-left w-full h-full">
            <div className="day-posting-box">
              {clickedId?.length > 0 ? (
                clickedId?.map((content: any) => {
                  return (
                    <Link
                      key={content.id}
                      href={`/blog/${content.id}`}
                      className="day-posting group"
                    >
                      <p className="text-sm group-hover:text-[#2c82f2]">
                        {content.name.length > 25
                          ? content.name.slice(0, 24) + "..."
                          : content.name}
                      </p>
                      <div className="w-8 h-8 flex items-center justify-center">
                        <BsBoxArrowUpRight className="text-lg dark:text-slate-400 group-hover:text-[#2c82f2]" />
                      </div>
                    </Link>
                  );
                })
              ) : (
                <p className="text-sm flex items-center justify-center h-full">
                  포스트 이력이 없습니다.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
