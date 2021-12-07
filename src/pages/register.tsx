import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Dropdown,
  message,
  Menu,
  Select,
  DatePicker,
} from "antd";
import styled from "styled-components";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import { toast } from "react-toastify";

const StyleRegister = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  label {
    font-size: 1.4rem;
    margin-top: 6px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 2rem;
    font-weight: bold;
  }
  .RRN {
    display: flex;
  }
  .ant-form-item-control {
    margin-top: 7px;
  }
  label {
    width: 130px;
  }
`;

const all_area = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];

const all_district = {
  서울: [
    "성북구",
    "은평구",
    "송파구",
    "노원구",
    "관악구",
    "강동구",
    "양천구",
    "도봉구",
    "동작구",
    "광진구",
    "강남구",
    "중랑구",
    "서대문구",
    "마포구",
    "구로구",
    "용산구",
    "성동구",
    "종로구",
    "중구",
    "동대문구",
    "강북구",
    "강서구",
    "금천구",
    "영등포구",
    "서초구",
  ],
  부산: [
    "중구",
    "서구",
    "동구",
    "영도구",
    "부산진구",
    "동래구",
    "남구",
    "북구",
    "강서구",
    "해운대구",
    "사하구",
    "금정구",
    "연제구",
    "수영구",
    "사상구",
    "기장군",
  ],
  대구: [
    "남동구",
    "서구",
    "계양구",
    "중구",
    "동구",
    "강화군",
    "미추홀구",
    "연수구",
    "부평구",
    "옹진군",
  ],
  인천: ["중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군"],
  광주: ["북구", "서구", "광산구", "동구", "남구"],
  대전: ["동구", "중구", "서구", "대덕구", "유성구"],
  울산: ["동구", "북구", "중구", "울주군", "남구"],
  세종: ["세종시"],
  경기: [
    "고양시",
    "성남시",
    "용인시",
    "수원시",
    "안산시",
    "안양시",
    "평택시",
    "시흥시",
    "김포시",
    "광명시",
    "하남시",
    "화성시",
    "파주시",
    "군포시",
    "구리시",
    "양평군",
    "의왕시",
    "광주시",
    "안성시",
    "오산시",
    "가평군",
    "연천군",
    "과천시",
    "남양주시",
    "동두천시",
    "부천시",
    "양주시",
    "여주시",
    "의정부시",
    "이천시",
    "포천시",
  ],
  강원: [
    "춘천시",
    "원주시",
    "홍천군",
    "동해시",
    "양구군",
    "고성군",
    "화천군",
    "삼척시",
    "태백시",
    "횡성군",
    "정선군",
    "강릉시",
    "속초시",
    "철원군",
    "평창군",
    "영월군",
    "인제군",
    "양양군",
  ],
  충북: [
    "청주시",
    "충주시",
    "옥천군",
    "제천시",
    "단양군",
    "영동군",
    "보은군",
    "증평군",
    "진천군",
    "괴산군",
    "음성군",
  ],
  충남: [
    "아산시",
    "천안시",
    "홍성군",
    "당진시",
    "서산시",
    "논산시",
    "예산군",
    "보령시",
    "태안군",
    "공주시",
    "계룡시",
    "금산군",
    "부여군",
    "서천군",
    "청양군",
  ],
  전북: [
    "경산시",
    "포항시",
    "울진군",
    "경주시",
    "구미시",
    "청도군",
    "영덕군",
    "김천시",
    "성주군",
    "안동시",
    "영천시",
    "문경시",
    "영양군",
    "영주시",
    "상주시",
    "군위군",
    "의성군",
    "청송군",
    "고령군",
    "칠곡군",
    "예천군",
    "봉화군",
    "울릉군",
  ],
  전남: [
    "양산시",
    "창원시",
    "함안군",
    "거제시",
    "밀양시",
    "창녕군",
    "김해시",
    "진주시",
    "통영시",
    "사천시",
    "거창군",
    "고성군",
    "하동군",
    "합천군",
    "남해군",
    "함양군",
    "산청군",
    "의령군",
  ],
  경북: [
    "전주시",
    "익산시",
    "군산시",
    "남원시",
    "완주군",
    "진안군",
    "정읍시",
    "김제시",
    "고창군",
    "부안군",
    "임실군",
    "순창군",
    "장수군",
    "무주군",
  ],
  경남: [
    "순천시",
    "여수시",
    "광양시",
    "보성군",
    "목포시",
    "나주시",
    "장흥군",
    "담양군",
    "강진군",
    "진도군",
    "무안군",
    "해남군",
    "고흥군",
    "화순군",
    "영암군",
    "영광군",
    "완도군",
    "장성군",
    "신안군",
    "함평군",
    "곡성군",
    "구례군",
  ],
  제주: ["제주"],
};

const { Option } = Select;

function RegisterPage() {
  const [frontNum, setFrontNum] = useState("");
  const [backNum, setBackNum] = useState("");

  const [name, setName] = useState("");
  const [area, setArea] = useState("서울");
  const [district, setDistrict] = useState("");
  const [sex, setSex] = useState("");
  const [vacc, setVacc] = useState("");
  const [isVacc, IsVacc] = useState("");
  const [date, setDate] = useState("");
  const [register, setRegister] = useState(false);
  function handleMenuClick(e: any) {
    setArea(e.key);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {all_area.map((area) => (
        <Menu.Item key={area}>{area}</Menu.Item>
      ))}
    </Menu>
  );
  const handleRegister = async () => {
    const RRN = `${frontNum}${backNum}`;

    try {
      const response = await axios.post("http://localhost:3001/user/addUser", {
        name,
        rrn: RRN,
        sex,
        area,
        district,
        vacc_name: vacc,
        vaccinated: isVacc,
        vaccinated_date: date,
      });
      toast("회원가입 완료");
      setRegister(true);
    } catch (e: any) {
      toast(e.response.data.msg);
    }
  };
  return (
    <StyleRegister>
      {register && <Navigate to="/login" />}
      <h1>COVID-19 알림이 회원가입</h1>
      <div>
        <Form.Item
          label="이름"
          rules={[
            {
              required: true,
              message: "이름을 입력해주세요.",
            },
          ]}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <div className="RRN">
          <Form.Item
            label="주민등록번호"
            rules={[
              {
                required: true,
                message: "주민등록번호 앞자리를 입력해주세요.",
              },
            ]}
          >
            <Input
              value={frontNum}
              onChange={(e) => setFrontNum(e.target.value)}
            />
          </Form.Item>
          <p
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              fontWeight: "bold",
              lineHeight: "40px",
            }}
          >
            -
          </p>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "주민등록번호 뒷자리를 입력해주세요.",
              },
            ]}
          >
            <Input.Password
              value={backNum}
              onChange={(e) => setBackNum(e.target.value)}
              style={{ width: "150px" }}
            />
          </Form.Item>
        </div>
        <Form.Item label="지역">
          <Select
            value={area}
            style={{ width: "100%" }}
            onChange={(e) => {
              setArea(e);
              setDistrict("");
            }}
          >
            {all_area.map((v) => (
              <Option value={v} key={v}>
                {v}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="자치구">
          <Select
            value={district}
            style={{ width: "100%" }}
            onChange={(e) => setDistrict(e)}
          >
            {(all_district as any)[area].map((v: any) => (
              <Option value={v} key={v}>
                {v}
              </Option>
            ))}
          </Select>
        </Form.Item>{" "}
        <Form.Item label="성별">
          <Select
            value={sex}
            style={{ width: "100%" }}
            onChange={(e) => setSex(e)}
          >
            <Option value={"M"}>남</Option>
            <Option value={"W"}>여</Option>
          </Select>
        </Form.Item>
        <Form.Item label="백신종류">
          <Select
            value={vacc}
            style={{ width: "100%" }}
            onChange={(e) => setVacc(e)}
          >
            <Option value={"모더나"}>모더나</Option>
            <Option value={"화이자"}>화이자</Option>
            <Option value={"얀센"}>얀센</Option>
            <Option value={"아스트라제네카"}>아스트라제네카</Option>
          </Select>
        </Form.Item>
        <Form.Item label="접종여부">
          <Select
            value={isVacc}
            style={{ width: "100%" }}
            onChange={(e) => IsVacc(e)}
          >
            <Option value={"미접종"}>미접종</Option>
            <Option value={"1차접종"}>1차접종</Option>
            <Option value={"2차접종"}>2차접종</Option>
            <Option value={"3차접종"}>3차접종</Option>
          </Select>
        </Form.Item>
        <Form.Item label="접종날짜">
          <DatePicker
            style={{ width: "100%" }}
            onChange={(e) => e && setDate(e?.format("YYYY-MM-DD"))}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", height: "46px" }}
            onClick={handleRegister}
          >
            회원가입
          </Button>
        </Form.Item>
      </div>
    </StyleRegister>
  );
}

export default RegisterPage;
