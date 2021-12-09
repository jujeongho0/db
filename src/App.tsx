import React, { useEffect } from "react";
import "./App.css";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import DailyPage from "./pages/daily";
import AreaPage from "./pages/area";
import VaccinePage from "./pages/vaccine";
import UserPage from "./pages/user";
import LoginPage from "./pages/login";

import io from "socket.io-client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { atom, RecoilRoot, useRecoilState } from "recoil";
import RegisterPage from "./pages/register";
import moment from "moment";

const socket = io("/", {
  path: "/api/socket.io/",
}).connect();
export const todayStr = "2021-11-14";
export const dateFormat = "YYYY-MM-DD";

const { Header, Content, Footer } = Layout;

export const loginState = atom({
  key: "loginState", // unique ID (with respect to other atoms/selectors)
  default: null as any, // default value (aka initial value)
});

function App() {
  const [login, setLogin] = useRecoilState(loginState);
  const handleRealtimeData = (data: any) => {
    if (
      login !== null &&
      login.user_area == data.area &&
      login.user_district == data.district
    ) {
      toast(
        `${moment(new Date()).format("YYYY-MM-DD HH:MM:SS")} ${data.area} ${
          data.district
        } ${data.num}명 확진 발생`
      );
      return;
    } else if (login === null) {
      toast(
        `${moment(new Date()).format("YYYY-MM-DD HH:MM:SS")} ${data.area} ${
          data.district
        } ${data.num}명 확진 발생`
      );
      return;
    }
  };
  useEffect(() => {
    socket.on("realtime", handleRealtimeData);
    return () => {
      socket.off("realtime", handleRealtimeData);
    };
  }, []);
  const [menu, setMenu] = React.useState("1");

  return (
    <Layout className="layout">
      <ToastContainer />
      <Router basename="/">
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            selectedKeys={[menu]}
          >
            <Menu.Item key={"1"} onClick={() => setMenu("1")}>
              <Link to={"/"}>지역별 현황</Link>
            </Menu.Item>
            <Menu.Item key={"2"} onClick={() => setMenu("2")}>
              <Link to={"/vaccine"}>백신별 현황</Link>
            </Menu.Item>
            <Menu.Item key={"3"} onClick={() => setMenu("3")}>
              <Link to={"/daily"}>일별 현황</Link>
            </Menu.Item>
            <Menu.Item key={"4"} onClick={() => setMenu("4")}>
              <Link to={"/user"}>유저 정보</Link>
            </Menu.Item>
            {!login && (
              <div
                style={{
                  position: "absolute",
                  right: "120px",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
              >
                <Link to={"/register"}>회원가입</Link>
              </div>
            )}

            <div
              style={{
                position: "absolute",
                right: "40px",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            >
              <Link to={"/login"} onClick={() => login && setLogin(null)}>
                {!login ? "로그인" : "로그아웃"}
              </Link>
            </div>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px", height: "100vh" }}>
          <Routes>
            <Route path="/" element={<AreaPage />} />
            <Route path="/daily" element={<DailyPage />} />
            <Route path="/vaccine" element={<VaccinePage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
