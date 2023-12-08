import { io } from "socket.io-client";
import config from "./config";

const options = {
    path: '/socket.io/',
    rememberUpgrade: true,
    transports: ["websocket"],
    secure: true,
    rejectUnauthorized: false,
};

export const HostingURI = `${config.server}:${config.port}`;
// export const HostingURI = "https://api.sungames777.com:8443";

let isInited = false;

export const setSocketInited = () => {
    isInited = true;
}

export const getSocketInited = () => isInited;

const socket = io.connect(HostingURI, options);

// console.log(socket);

export default socket;
