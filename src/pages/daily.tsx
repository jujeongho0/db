import { Calendar, Checkbox, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import moment from "moment";
import axios from "axios";

const StyleDaily = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .chart {
    margin-top: 20px;
  }
  p {
    font-size: 1.4rem;
  }
  text-align: center;
`;

function getColor() {
  return (
    "hsl(" +
    360 * Math.random() +
    "," +
    (35 + 70 * Math.random()) +
    "%," +
    (65 + 10 * Math.random()) +
    "%)"
  );
}
const randomColor = [
  getColor(),
  getColor(),
  getColor(),
  getColor(),
  getColor(),
  getColor(),
  getColor(),
];

//daily_deseased, daily_recovered, daily_vacc_once, daily_vacc_fully, daily_boost
const options = [
  { label: "확진자 수", value: "daily_confirmed" },
  { label: "격리 수", value: "daily_isolated" },
  { label: "사망자 수", value: "daily_deseased" },
  { label: "완치자 수", value: "daily_recovered" },
  { label: "백신 1차 접종 수", value: "daily_vacc_once" },
  { label: "백신 2차 접종 수", value: "daily_vacc_fully" },
  { label: "백신 부스터 샷 접종 수", value: "daily_boost" },
];

const dateFormat = "YYYY-MM-DD";
const todayStr = "2021-11-14";
const sevenDaysStr = moment(todayStr, dateFormat)
  .subtract(7, "days")
  .startOf("day")
  .format(dateFormat);

function DailyPage() {
  const [rangeDate, setRangeDate] = useState({
    start: sevenDaysStr as any,
    end: todayStr as any,
  });
  const [columns, setColumns] = useState(["daily_confirmed"]);
  const [dailyData, setDailyData] = useState<any>({
    range: false,
    data: [],
  });

  useEffect(() => {
    const fetch = async () => {
      if (columns.length == 0) return;
      const response = await axios.get(
        "http://localhost:3001/covid/dailyInfos",
        {
          params: {
            start_date: rangeDate.start,
            end_date: rangeDate.end,
            columns: `update_date, ${columns.join(", ")}`,
          },
        }
      );
      console.log("AA", response);
      setDailyData({
        range: response.data.range,
        data: response.data.data
          .map((v: any) => {
            Object.keys(v).forEach((f) => {
              if (v[f] == null) v[f] = 0;
            });
            return v;
          })
          .map((v: any) => {
            v.update_date = moment(v.update_date.split("T")[0], dateFormat)
              .add(1, "days")
              .startOf("day")
              .format(dateFormat);
            return v;
          }),
      });
    };
    fetch();
  }, [rangeDate, columns]);

  const onChange = (checkedValues: any[]) => {
    setColumns(checkedValues);
  };
  return (
    <StyleDaily>
      <div
        className="chart box"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <AreaChart
          width={1100}
          height={450}
          data={dailyData.data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="update_date" />
          <YAxis />
          <Tooltip />
          {columns.map((col, idx) => {
            return (
              <Area
                key={idx}
                type="monotone"
                dataKey={col}
                stackId="1"
                stroke={randomColor[idx]}
                fill={randomColor[idx]}
              />
            );
          })}
        </AreaChart>
        <p>일별 데이터</p>
        <DatePicker.RangePicker
          value={[
            moment(rangeDate.start, dateFormat),
            moment(rangeDate.end, dateFormat),
          ]}
          ranges={{
            Today: [moment(todayStr, dateFormat), moment(todayStr, dateFormat)],
          }}
          onChange={(e) =>
            e &&
            setRangeDate({
              start: e[0]?.format(dateFormat),
              end: e[1]?.format(dateFormat),
            })
          }
        />
        <Checkbox.Group
          style={{ marginTop: "10px" }}
          options={options}
          defaultValue={columns}
          onChange={onChange}
        />
      </div>
    </StyleDaily>
  );
}

export default DailyPage;
