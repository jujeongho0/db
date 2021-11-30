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
    height: 750px;
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
  const [login, setLogin] = useRecoilState(loginState);
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
    console.log(response.data);
  };
  return (
    <StyleUser>
      {!login ? (
        <Navigate to="/login" />
      ) : (
        <div className="box">
          <h1>{"강선규"}님 유저 정보</h1>
          <QRCode
            value={`https://www.google.co.kr/search?q=${encodeURI(
              "강선규,수원,남성,모더나,2차완료,2021.11.04"
            )}`}
          />
          <div>
            백신접종여부
            <p className="vaccine">
              {"모더나"} 2차 완료 ({"2021.11.04"})
            </p>
          </div>

          <div className="info">
            주민등록번호 <p>000104-*******</p>
          </div>
          <div className="info">
            성별 <p>남성</p>
          </div>

          <div className="info">
            지역 <p>수원</p>
          </div>

          <div className="info">
            <div>
              <Dropdown overlay={menu} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  현재상태 <DownOutlined />
                </a>
              </Dropdown>
            </div>
            <div>{status}</div>
          </div>

          <Button
            onClick={handleSave}
            style={{ position: "absolute", bottom: "20px", right: "20px" }}
          >
            저장
          </Button>
        </div>
      )}
    </StyleUser>
  );
}

export default UserPage;
