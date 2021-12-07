import React, { useState } from "react";
import styled from "styled-components";
import QRCode from "react-qr-code";
import { useRecoilState } from "recoil";
import { loginState } from "../App";
import { Navigate } from "react-router";
import { Button, Dropdown, Menu, Popconfirm } from "antd";
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
    margin-top: 50px;
    width: 400px;
    height: 520px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .vaccine {
    font-size: 1.2rem;
    font-weight: bold;
    color: rgb(0, 131, 254);
  }

  .info {
    font-weight: bold;
    font-size: 0.8rem;
    p {
      margin-bottom: 10px;
      font-weight: lighter;
    }
  }
`;

function UserPage() {
  const [userInfo, setLogin] = useRecoilState(loginState);

  const handleWithdrawal = async () => {
    const response = await axios.delete(
      "http://localhost:3001/user/withdrawal",
      {
        data: {
          rrn: userInfo.user_rrn,
        },
      }
    );
    console.log(response);

    if (response.data.msg == "success") setLogin(null);
  };
  return (
    <StyleUser>
      {userInfo == null ? (
        <Navigate to="/login" />
      ) : (
        <>
          <div className="box">
            <h1>{userInfo.user_name}님 유저 정보</h1>
            <QRCode value={JSON.stringify(userInfo)} size={200} />
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

          <div style={{ position: "absolute", right: "30px", bottom: "30px" }}>
            <Popconfirm
              title="정말 탈퇴하시겠습니까?"
              onConfirm={handleWithdrawal}
              okText="예"
              cancelText="아니오"
            >
              <Button danger size="large">
                회원탈퇴
              </Button>
            </Popconfirm>
          </div>
        </>
      )}
    </StyleUser>
  );
}

export default UserPage;
