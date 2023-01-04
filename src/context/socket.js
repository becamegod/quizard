import React from "react";
import socketio from "socket.io-client";
import api from "../api";

const sv = `${api}:5000`;
export const socket = socketio.connect(sv);
export const SocketContext = React.createContext();
