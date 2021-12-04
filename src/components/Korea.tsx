import { useMemo } from "react";
import styled from "styled-components";
import {
  Seoul,
  Gyeonggi,
  Incheon,
  Gangwon,
  Chungnam,
  Chungbuk,
  Sejong,
  Daejeon,
  Gyeongnam,
  Gyeongbuk,
  Jeonbuk,
  Jeonnam,
  Ulsan,
  Busan,
  Daegu,
  Gwangju,
  Jeju,
} from "../area/all_area";

import areaData from "../test/AREA.json";
// 코로나 단계별 색상
const fillColor = ["#82c9ff", "#52b4ff", "#0091ff", "#4453f2"];

const StyleDistLevel = styled.div`
  .dist_level {
    position: absolute;
    width: 35px;
    height: 40px;
    background: white;
    border-radius: 6px;
    font-size: 0.8rem;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    text-align: center;
    user-select: none;
    cursor: pointer;
    .area {
      color: rgba(0, 0, 0, 0.7);
    }
    .level {
      margin-top: 0px;
      font-weight: bold;
    }
  }
`;

export function DistLevel({
  onAreaClick,
  top,
}: {
  onAreaClick: Function;
  top: number;
}) {
  const transAreaData = useMemo(() => {
    const newObj: { [key: string]: ReturnType<() => typeof areaData.AREA[0]> } =
      {};
    areaData.AREA.forEach((item) => {
      newObj[item.NAME] = item;
      delete newObj.NAME;
    });
    return newObj;
  }, []);
  return (
    <StyleDistLevel>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("서울")}
        style={{ top: `${180 + top}px`, left: "165px" }}
      >
        <div className="area">서울</div>
        <div className="level">{transAreaData["서울"].DIST_LEVEL}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("경기")}
        style={{ top: `${220 + top}px`, left: "200px" }}
      >
        <div className="area">경기</div>
        <div className="level">{transAreaData["경기"].DIST_LEVEL}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("인천")}
        style={{ top: `${200 + top}px`, left: "124px" }}
      >
        <div className="area">인천</div>
        <div className="level">{transAreaData["인천"].DIST_LEVEL}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("강원")}
        style={{ top: `${190 + top}px`, left: "270px" }}
      >
        <div className="area">강원</div>
        <div className="level">{transAreaData["강원"].DIST_LEVEL}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("충북")}
        style={{ top: `${270 + top}px`, left: "225px" }}
      >
        <div className="area">충북</div>
        <div className="level">{transAreaData["충북"].DIST_LEVEL}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("충남")}
        style={{ top: `${300 + top}px`, left: "140px" }}
      >
        <div className="area">충남</div>
        <div className="level">{transAreaData["충남"].DIST_LEVEL}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("세종")}
        style={{ top: `${300 + top}px`, left: "180px" }}
      >
        <div className="area">세종</div>
        <div className="level">{transAreaData["세종"].DIST_LEVEL}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("대전")}
        style={{ top: `${320 + top}px`, left: "220px" }}
      >
        <div className="area">대전</div>
        <div className="level">{transAreaData["대전"].DIST_LEVEL}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("전북")}
        style={{ top: `${380 + top}px`, left: "180px" }}
      >
        <div className="area">전북</div>
        <div className="level">{transAreaData["전북"].DIST_LEVEL}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("전남")}
        style={{ top: `${450 + top}px`, left: "190px" }}
      >
        <div className="area">전남</div>
        <div className="level">{transAreaData["전남"].DIST_LEVEL}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("광주")}
        style={{ top: `${425 + top}px`, left: "145px" }}
      >
        <div className="area">광주</div>
        <div className="level">{transAreaData["광주"].DIST_LEVEL}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("경북")}
        style={{ top: `${300 + top}px`, left: "310px" }}
      >
        <div className="area">경북</div>
        <div className="level">{transAreaData["경북"].DIST_LEVEL}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("경남")}
        style={{ top: `${420 + top}px`, left: "250px" }}
      >
        <div className="area">경남</div>
        <div className="level">{transAreaData["경남"].DIST_LEVEL}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("대구")}
        style={{ top: `${355 + top}px`, left: "280px" }}
      >
        <div className="area">대구</div>
        <div className="level">{transAreaData["대구"].DIST_LEVEL}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("울산")}
        style={{ top: `${380 + top}px`, left: "340px" }}
      >
        <div className="area">울산</div>
        <div className="level">{transAreaData["울산"].DIST_LEVEL}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("부산")}
        style={{ top: `${430 + top}px`, left: "320px" }}
      >
        <div className="area">부산</div>
        <div className="level">{transAreaData["부산"].DIST_LEVEL}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("제주")}
        style={{ top: `${600 + top}px`, left: "130px" }}
      >
        <div className="area">제주</div>
        <div className="level">{transAreaData["제주"].DIST_LEVEL}</div>
      </div>
    </StyleDistLevel>
  );
}

function Korea({ onAreaClick }: { onAreaClick: Function }) {
  const transAreaData = useMemo(() => {
    const newObj: { [key: string]: ReturnType<() => typeof areaData.AREA[0]> } =
      {};
    areaData.AREA.forEach((item) => {
      newObj[item.NAME] = item;
      delete newObj.NAME;
    });
    return newObj;
  }, []);

  return (
    <svg width="400px" height="550px" viewBox="0 0 800 1200">
      <Seoul
        fill={fillColor[transAreaData["서울"].DIST_LEVEL - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Gyeonggi
        fill={fillColor[transAreaData["서울"].DIST_LEVEL - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Gangwon
        fill={fillColor[transAreaData["강원"].DIST_LEVEL - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Incheon
        fill={fillColor[transAreaData["인천"].DIST_LEVEL - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Chungnam
        fill={fillColor[transAreaData["충남"].DIST_LEVEL - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Chungbuk
        fill={fillColor[transAreaData["충북"].DIST_LEVEL - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Sejong
        fill={fillColor[transAreaData["세종"].DIST_LEVEL - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Daejeon
        fill={fillColor[transAreaData["대전"].DIST_LEVEL - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Gyeongnam
        fill={fillColor[transAreaData["경남"].DIST_LEVEL - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Gyeongbuk
        fill={fillColor[transAreaData["경북"].DIST_LEVEL - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Jeonbuk
        fill={fillColor[transAreaData["전북"].DIST_LEVEL - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Jeonnam
        fill={fillColor[transAreaData["전남"].DIST_LEVEL - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Ulsan
        fill={fillColor[transAreaData["울산"].DIST_LEVEL - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Busan
        fill={fillColor[transAreaData["부산"].DIST_LEVEL - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Daegu
        fill={fillColor[transAreaData["대구"].DIST_LEVEL - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Gwangju
        fill={fillColor[transAreaData["광주"].DIST_LEVEL - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Jeju
        fill={fillColor[transAreaData["제주"].DIST_LEVEL - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
    </svg>
  );
}

export default Korea;
