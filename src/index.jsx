import { ConfigProvider } from "antd";
// import "antd/dist/antd.min.css";
// import "antd/dist/antd.variable.min.css";
import "antd/dist/reset.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import BaseRoutes from "./BaseRoutes";
// import { SocketContext, socket } from "./context/socket";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <SocketContext.Provider value={socket}> */}
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "00CC11",
            colorInfo: "00CC11"
          },
          components: {
            Button: {
              controlHeight: 40,
              fontSize: 16
            }
          }
        }}
      >
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
