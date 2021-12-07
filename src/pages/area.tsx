import React, { useEffect, useMemo, useState } from "react";
import Korea, { DistLevel } from "../components/Korea";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import styled from "styled-components";
import areaData from "../test/AREA.json";
import AreaDetailGraph from "../components/AreaDetailGraph";
import { Button, DatePicker } from "antd";
import moment from "moment";
import axios from "axios";

const makeNewKey = (data: any) => {
  let newData: any = {};
  Object.keys(data).forEach((key) => {
    let newKey;
    if (key.includes("(")) newKey = key.split("(")[1].slice(0, -1);
    else newKey = key;
    newData[newKey] = data[key];
  });
  return newData;
};

const StyleArea = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 30px;
  .chart {
    width: 100%;
    height: 500px;
    margin-top: 50px;
    p {
      text-align: center;
    }
  }
  .area_num {
    font-weight: bold;
    margin-bottom: 5px;
  }
  .district {
    display: flex;
    flex-wrap: wrap;

    user-select: none;
    width: 100%;
  }
  .box {
    margin: 10px;
    width: 80px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
`;
const dateFormat = "YYYY-MM-DD";
const todayStr = "2021-11-14";

function AreaPage() {
  const [rangeDate, setRangeDate] = useState({
    start: todayStr as any,
    end: todayStr as any,
  });
  const [area, setArea] = useState("");
  const [areaData, setAreaData] = useState<any>([]);
  const [findData, setFindData] = useState<any>(null);
  const [districtData, setDistrictData] = useState<any>(null);
  const [distData, setDistData] = useState<any>({
    area_dist_level: 0,
    dist_info: "",
    dist_standard: "",
  });

  useEffect(() => {
    const fetch = async () => {
      if (area === "") return;
      const response = await axios.get(
        "http://localhost:3001/covid/distLevels",
        {
          params: {
            date: rangeDate.start,
            area,
          },
        }
      );
      console.log(response.data.data);
      setDistData(response.data.data[0]);
    };
    fetch();
  }, [area]);

  useEffect(() => {
    const fetch = async () => {
      if (area === "") return;
      const response = await axios.get(
        "http://localhost:3001/covid/covidInfos/district",
        {
          params: {
            start_date: rangeDate.start,
            end_date: rangeDate.end,
            area,
          },
        }
      );
      if (response.data.range == false) setDistrictData(response.data);
      else {
        setDistrictData({
          data: response.data.data.map((v: any) => makeNewKey(v)),
        });
      }
    };
    fetch();
  }, [areaData, area]);

  useEffect(() => {
    if (area == "") return;
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3001/covid/covidInfos",
        {
          params: {
            start_date: rangeDate.start,
            end_date: rangeDate.end,
            area,
          },
        }
      );
      if (response?.data?.data !== undefined)
        setFindData(response.data.data[0]);
    };
    fetch();
  }, [rangeDate, area]);

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
      if (response.data.range == false) setAreaData(response.data);
      else {
        setAreaData({
          data: response.data.data.map((v: any) => makeNewKey(v)),
          range: response.data.range,
        });
      }
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
        일별 종합 데이터
      </label> */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {/* <DatePicker
          onChange={(e) => e && setDate(e.format(dateFormat))}
          defaultValue={moment(todayStr, dateFormat)}
          format={dateFormat}
        /> */}
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
      </div>
      <StyleArea className="box">
        <div className="map">
          {areaData?.data?.length > 0 && (
            <>
              <DistLevel
                onAreaClick={setArea}
                top={15}
                areaData={areaData.data}
              />
              <Korea onAreaClick={setArea} areaData={areaData.data} />
            </>
          )}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {area === "" ? (
            <div className="chart">
              <ResponsiveContainer width="99%">
                <BarChart data={areaData.data}>
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
              </ResponsiveContainer>
              <p>지역별 그래프</p>
            </div>
          ) : (
            <div style={{ marginTop: "30px" }}>
              <div
                style={{
                  display: "grid",
                  gridGap: "40px",
                  gridTemplateColumns: "300px 0.9fr",
                }}
              >
                <div
                  className="box"
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    userSelect: "none",
                  }}
                >
                  <h2 style={{ fontWeight: "bold" }}>
                    {area} 코로나 {areaData.range && "평균"} 데이터
                  </h2>
                  <div className="area_num">
                    확진자 수 : {findData?.area_confirmed?.toFixed(0)}명
                  </div>
                  <div className="area_num" style={{ marginBottom: "0px" }}>
                    거리두기 : {findData?.area_dist_level}단계
                  </div>
                  <div>{distData?.dist_info}</div>
                  <div style={{ marginBottom: "5px" }}>
                    {distData?.dist_standard}
                  </div>
                  <div className="area_num">
                    격리자 수 : {findData?.area_recovered?.toFixed(0)}명
                  </div>

                  <div className="area_num">
                    완치자 수 : {findData?.area_recovered?.toFixed(0)}명
                  </div>

                  <div className="area_num">
                    사망자 수 : {findData?.area_deseased?.toFixed(0)}명
                  </div>
                  <div>
                    <BarChart
                      width={250}
                      height={150}
                      data={
                        findData
                          ? Object.entries(findData)
                              .filter(
                                (v) =>
                                  v[0] !== "update_date" &&
                                  v[0] !== "area_name" &&
                                  v[0] !== "area_dist_level"
                              )
                              .map((v) => {
                                let name = v[0];
                                if (name === "area_confirmed") name = "확진자";
                                if (name === "area_isolated") name = "격리자";
                                if (name === "area_deseased") name = "사망자";
                                if (name === "area_recovered") name = "완치자";
                                return {
                                  name,
                                  value: v[1],
                                };
                              })
                          : []
                      }
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <XAxis dataKey="name" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#d88484" />
                    </BarChart>
                  </div>
                </div>
                <div
                  className="box"
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    paddingBottom: "10px",
                  }}
                >
                  <h2 style={{ fontWeight: "bold", marginTop: "10px" }}>
                    자치구별 확진자 {areaData.range ? "날짜 평균 수" : "수"}
                  </h2>
                  <div className="district">
                    {districtData?.data?.map((v: any, idx: number) => (
                      <div className="box district_item">
                        <p
                          style={{
                            fontWeight: "bold",
                            marginTop: "5px",
                            marginBottom: "0px",
                          }}
                        >
                          {v.district}
                        </p>
                        <p
                          style={{ paddingBottom: "3px", marginBottom: "5px" }}
                        >
                          {areaData.range
                            ? v.district_confirmed.toFixed(2)
                            : v.district_confirmed}
                          명
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Button type="primary" size="large" onClick={() => setArea("")}>
                이전 그래프로
              </Button>
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
            </div>
          )}
        </div>
      </StyleArea>
    </div>
  );
}

export default AreaPage;
