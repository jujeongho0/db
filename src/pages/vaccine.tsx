import { Calendar, DatePicker } from "antd";
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

const StyleVaccine = styled.div`
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

const dateFormat = "YYYY/MM/DD";
function VaccinePage() {
  const [rangeDate, setRangeDate] = useState({
    start: moment().format(dateFormat) as any,
    end: moment().format(dateFormat) as any,
  });
  const [vaccineData, setVaccineData] = useState<any>([]);

  useEffect(() => {
    console.log("AA", vaccineData);
  }, [vaccineData]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3001/covid/vaccInfos",
        {
          params: {
            date: "2021-11-30",
          },
        }
      );
      setVaccineData(
        response.data.data.map((v: any) => {
          Object.keys(v).forEach((f) => {
            if (v[f] == null) v[f] = 0;
          });
          return v;
        })
      );
    };
    fetch();
  }, []);
  return (
    <StyleVaccine>
      <div className="chart">
        <AreaChart
          width={1200}
          height={600}
          data={vaccineData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="vacc_name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="vacc_once"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="vacc_fully"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="vacc_boost"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>
        <p>백신별 데이터</p>
        <DatePicker.RangePicker
          ranges={{
            Today: [
              moment("2021-11-14", dateFormat),
              moment("2021-11-14", dateFormat),
            ],
          }}
          onChange={(e) =>
            e &&
            setRangeDate({
              start: e[0]?.format(dateFormat),
              end: e[1]?.format(dateFormat),
            })
          }
        />
      </div>
    </StyleVaccine>
  );
}

export default VaccinePage;
