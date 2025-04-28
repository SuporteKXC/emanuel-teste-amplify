import { io } from "socket.io-client";
import { eventBus } from "services";

const environment = {
  local: {
    ws: "http://localhost:3335",
  },
  production: {
    ws: process.env.REACT_APP_URL_BROADCAST as string,
  },
};

const baseURL =
  process?.env?.NODE_ENV === "development"
    ? environment.local
    : environment.production;

const socket = io(baseURL.ws, {});

socket.on("connect", () => {
  const engine = socket.io.engine;
  console.log("Socket engine:", engine.transport.name);
  engine.once("upgrade", () => {
    console.log("Socket engine upgraded:", engine.transport.name);
  });
});

socket.on("logout", (data) => {
  eventBus.dispatch<number>("logoutUserById", data?.userId);
});
