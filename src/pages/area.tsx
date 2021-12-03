import React, { useEffect, useMemo, useState } from "react";
import Korea, { DistLevel } from "../components/Korea";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import styled from "styled-components";
import areaData from "../test/AREA.json";
import AreaDetailGraph from "../components/AreaDetailGraph";
import { Button, DatePicker } from "antd";
import moment from "moment";
import axios from "axios";

const StyleArea = styled.div`
  display: flex;
  .chart {
    margin-top: 50px;

    p {
      text-align: center;
    }
  }
  .area_num {
    font-weight: bold;
    font-size: 1.3rem;
    margin-bottom: 5px;
  }
`;
const dateFormat = "YYYY-MM-DD";
function AreaPage() {
  const [rangeDate, setRangeDate] = useState({
    start: moment().format(dateFormat) as any,
    end: moment().format(dateFormat) as any,
  });
  const [area, setArea] = useState("");
  const [areaData, setAreaData] = useState<any>([]);
  const [findData, setFindData] = useState<any>(null);

  useEffect(() => {
    console.log("find", findData);
  }, [findData]);

  useEffect(() => {
    if ((areaData?.data?.length ?? 0) > 0 && area != "")
      setFindData(areaData.data.find((v: any) => v.area_name == area));
  }, [areaData, area]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3001/covid/covidInfos",
        {
          params: {
            start_date: rangeDate.start,
            end_date: rangeDate.end,
          },
        }
      );
      console.log("AA", response.data);
      setAreaData(response.data);
    };
    fetch();
  }, [rangeDate]);

  return (
    <div>
      {/* <label>
        <input type="radio" name="date" value="daily" />
        일별 데이터
      </label>
      <label>
        <input type="radio" name="date" value="summary" />
        일별 종합 데이터
      </label> */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {/* <DatePicker
          onChange={(e) => e && setDate(e.format(dateFormat))}
          defaultValue={moment("2021-11-14", dateFormat)}
          format={dateFormat}
        /> */}
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
      <StyleArea>
        <div className="map">
          <DistLevel onAreaClick={setArea} top={0} />
          <Korea onAreaClick={setArea} />
        </div>
        <div>
          {area === "" ? (
            <div className="chart">
              <BarChart
                width={900}
                height={600}
                data={areaData.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area_name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="area_confirmed" fill="#d88484" />
                <Bar dataKey="area_isolated" fill="#8884d8" />
                <Bar dataKey="area_deseased" fill="#4b4b4b" />
                <Bar dataKey="area_recovered" fill="#82ca9d" />
                <Bar dataKey="area_dist_level" fill="#898dff" />
              </BarChart>
              <p>지역별 전일 대비 그래프</p>
            </div>
          ) : (
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
                {area} 전일 대비 데이터
              </h1>
              <p>{findData?.update_date} 기준</p>
              <div className="area_num">
                확진자 수 : {findData?.area_confirmed}명
              </div>
              <div className="area_num">
                거리두기 : {findData?.area_dist_level}단계
              </div>

              <div className="area_num">
                격리자 수 : {findData?.area_recovered}명
              </div>

              <div className="area_num">
                완치자 수 : {findData?.area_recovered}명
              </div>

              <div className="area_num">
                사망자 수 : {findData?.area_deseased}명
              </div>
              {/* <div className="chart">
                <BarChart
                  width={800}
                  height={250}
                  data={Object.entries(transAreaData[area])
                    .filter(
                      (v) =>
                        v[0] !== "DATE" &&
                        v[0] !== "NAME" &&
                        v[0] !== "DIST_LEVEL"
                    )
                    .map((v) => {
                      let name = v[0];
                      if (name === "CONFIRMED") name = "확진자";
                      if (name === "ISOLATED") name = "격리자";
                      if (name === "DESEASED") name = "사망자";
                      if (name === "RECOVERED") name = "완치자";
                      return {
                        name,
                        value: v[1],
                      };
                    })}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#d88484" />
                </BarChart>
                <p>그래프</p>
              </div> */}
              <Button type="primary" onClick={() => setArea("")}>
                이전 그래프로
              </Button>
            </div>
          )}
        </div>
      </StyleArea>
    </div>
  );
}

export default AreaPage;
