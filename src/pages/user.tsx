import React, { useState } from "react";
import styled from "styled-components";
import QRCode from "react-qr-code";
import { useRecoilState } from "recoil";
import { loginState } from "../App";
import { Navigate } from "react-router";
import { Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";

const StyleUser = styled.div`
  display: flex;
  justify-content: center;

  h1 {
    margin-top: 15px;
  }
  .box {
    position: relative;
    margin-top: 100px;
    width: 400px;
    height: 650px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .vaccine {
    font-size: 1.5rem;
    font-weight: bold;
    color: rgb(0, 131, 254);
  }

  .info {
    font-weight: bold;
    font-size: 1.1rem;
    p {
      margin-bottom: 10px;
      font-weight: lighter;
    }
  }
`;

function UserPage() {
  const [userInfo, setLogin] = useRecoilState(loginState);
  const [status, setStatus] = useState("정상");

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => setStatus("정상")}>
        정상
      </Menu.Item>
      <Menu.Item key="1" onClick={() => setStatus("확진자")}>
        확진자
      </Menu.Item>
    </Menu>
  );

  const handleSave = async () => {
    const response = await axios.post(
      "http://localhost:3001/user_info_change",
      { status }
    );
    console.log(userInfo);
  };
  console.log("AA", userInfo);
  return (
    <StyleUser>
      {userInfo == null ? (
        <Navigate to="/login" />
      ) : (
        <div className="box">
          <h1>{userInfo.user_name}님 유저 정보</h1>
          <QRCode value={JSON.stringify(userInfo)} />
          <div style={{ marginTop: "5px" }}>
            백신접종여부
            <p className="vaccine" style={{ marginBottom: "0px" }}>
              {userInfo.user_vacc_name} {userInfo.user_vaccinated}
            </p>
            <p className="vaccine" style={{ marginBottom: "10px" }}>
              {userInfo.user_vaccinated_date.split("T")[0]} 완료
            </p>
          </div>

          <div className="info">
            주민등록번호 <p>{userInfo.user_rrn.substr(0, 6)}-*******</p>
          </div>
          <div className="info">
            성별 <p>{userInfo.user_sex}</p>
          </div>

          <div className="info">
            지역{" "}
            <p>
              {userInfo.user_area} {userInfo.user_district}
            </p>
          </div>
        </div>
      )}
    </StyleUser>
  );
}

export default UserPage;
