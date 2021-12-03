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

// const socket = io("http://localhost:3001").connect();

const { Header, Content, Footer } = Layout;

export const loginState = atom({
  key: "loginState", // unique ID (with respect to other atoms/selectors)
  default: null as any, // default value (aka initial value)
});

function App() {
  // const handleRealtimeData = (data: any) => {
  //   toast(`${data.date} ${data.city} ${data.num}명 확진 발생`);
  // };
  // useEffect(() => {
  //   socket.on("realtime", handleRealtimeData);
  //   return () => {
  //     socket.off("realtime", handleRealtimeData);
  //   };
  // }, []);
  const [menu, setMenu] = React.useState("1");
  const [login, setLogin] = useRecoilState(loginState);

  return (
    <Layout className="layout">
      <ToastContainer />
      <Router basename="/db-covid-map">
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
          </Routes>
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
