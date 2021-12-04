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
  areaData,
}: {
  onAreaClick: Function;
  top: number;
  areaData: any;
}) {
  const transAreaData = useMemo(() => {
    let newData: any = {};

    areaData.forEach((item: any) => {
      newData[item.area_name] = item;
    });
    return newData;
  }, [areaData]);

  return (
    <StyleDistLevel>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("서울")}
        style={{ top: `${180 + top}px`, left: "175px" }}
      >
        <div className="area">서울</div>
        <div className="level">{transAreaData["서울"].area_dist_level}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("경기")}
        style={{ top: `${220 + top}px`, left: "210px" }}
      >
        <div className="area">경기</div>
        <div className="level">{transAreaData["경기"].area_dist_level}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("인천")}
        style={{ top: `${200 + top}px`, left: "134px" }}
      >
        <div className="area">인천</div>
        <div className="level">{transAreaData["인천"].area_dist_level}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("강원")}
        style={{ top: `${190 + top}px`, left: "280px" }}
      >
        <div className="area">강원</div>
        <div className="level">{transAreaData["강원"].area_dist_level}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("충북")}
        style={{ top: `${270 + top}px`, left: "235px" }}
      >
        <div className="area">충북</div>
        <div className="level">{transAreaData["충북"].area_dist_level}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("충남")}
        style={{ top: `${300 + top}px`, left: "150px" }}
      >
        <div className="area">충남</div>
        <div className="level">{transAreaData["충남"].area_dist_level}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("세종")}
        style={{ top: `${300 + top}px`, left: "190px" }}
      >
        <div className="area">세종</div>
        <div className="level">{transAreaData["세종"].area_dist_level}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("대전")}
        style={{ top: `${320 + top}px`, left: "230px" }}
      >
        <div className="area">대전</div>
        <div className="level">{transAreaData["대전"].area_dist_level}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("전북")}
        style={{ top: `${380 + top}px`, left: "190px" }}
      >
        <div className="area">전북</div>
        <div className="level">{transAreaData["전북"].area_dist_level}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("전남")}
        style={{ top: `${450 + top}px`, left: "200px" }}
      >
        <div className="area">전남</div>
        <div className="level">{transAreaData["전남"].area_dist_level}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("광주")}
        style={{ top: `${425 + top}px`, left: "155px" }}
      >
        <div className="area">광주</div>
        <div className="level">{transAreaData["광주"].area_dist_level}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("경북")}
        style={{ top: `${300 + top}px`, left: "320px" }}
      >
        <div className="area">경북</div>
        <div className="level">{transAreaData["경북"].area_dist_level}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("경남")}
        style={{ top: `${420 + top}px`, left: "260px" }}
      >
        <div className="area">경남</div>
        <div className="level">{transAreaData["경남"].area_dist_level}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("대구")}
        style={{ top: `${355 + top}px`, left: "290px" }}
      >
        <div className="area">대구</div>
        <div className="level">{transAreaData["대구"].area_dist_level}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("울산")}
        style={{ top: `${380 + top}px`, left: "350px" }}
      >
        <div className="area">울산</div>
        <div className="level">{transAreaData["울산"].area_dist_level}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("부산")}
        style={{ top: `${430 + top}px`, left: "330px" }}
      >
        <div className="area">부산</div>
        <div className="level">{transAreaData["부산"].area_dist_level}</div>
      </div>
      <div
        className="dist_level"
        onClick={(e: any) => onAreaClick("제주")}
        style={{ top: `${600 + top}px`, left: "140px" }}
      >
        <div className="area">제주</div>
        <div className="level">{transAreaData["제주"].area_dist_level}</div>
      </div>
    </StyleDistLevel>
  );
}

function Korea({
  onAreaClick,
  areaData,
}: {
  onAreaClick: Function;
  areaData: any;
}) {
  const transAreaData = useMemo(() => {
    let newData: any = {};
    areaData.forEach((item: any) => {
      newData[item.area_name] = item;
    });
    return newData;
  }, [areaData]);

  return (
    <svg width="400px" height="550px" viewBox="0 0 800 1200">
      <Seoul
        fill={fillColor[transAreaData["서울"].area_dist_level - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Gyeonggi
        fill={fillColor[transAreaData["서울"].area_dist_level - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Gangwon
        fill={fillColor[transAreaData["강원"].area_dist_level - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Incheon
        fill={fillColor[transAreaData["인천"].area_dist_level - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Chungnam
        fill={fillColor[transAreaData["충남"].area_dist_level - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Chungbuk
        fill={fillColor[transAreaData["충북"].area_dist_level - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Sejong
        fill={fillColor[transAreaData["세종"].area_dist_level - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Daejeon
        fill={fillColor[transAreaData["대전"].area_dist_level - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Gyeongnam
        fill={fillColor[transAreaData["경남"].area_dist_level - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Gyeongbuk
        fill={fillColor[transAreaData["경북"].area_dist_level - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Jeonbuk
        fill={fillColor[transAreaData["전북"].area_dist_level - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Jeonnam
        fill={fillColor[transAreaData["전남"].area_dist_level - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Ulsan
        fill={fillColor[transAreaData["울산"].area_dist_level - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Busan
        fill={fillColor[transAreaData["부산"].area_dist_level - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Daegu
        fill={fillColor[transAreaData["대구"].area_dist_level - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Gwangju
        fill={fillColor[transAreaData["광주"].area_dist_level - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
      <Jeju
        fill={fillColor[transAreaData["제주"].area_dist_level - 1]}
        onClick={(e: any) => onAreaClick(e.target.id)}
      />
    </svg>
  );
}

export default Korea;
