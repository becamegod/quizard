import { ConfigProvider } from "antd";
// import "antd/dist/antd.min.css";
import "antd/dist/antd.variable.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import BaseRoutes from "./BaseRoutes";
// import { SocketContext, socket } from "./context/socket";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

ConfigProvider.config({
  theme: { primaryColor: "00CC11" }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <SocketContext.Provider value={socket}> */}
    <BrowserRouter>
      <ConfigProvider>
        <BaseRoutes />
      </ConfigProvider>
    </BrowserRouter>
    {/* </SocketContext.Provider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
