import feathers from "@feathersjs/client";
import io from "socket.io-client";

const socket = io(
  `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`
);
const client = feathers();
client.configure(feathers.socketio(socket));

window.client = client;

export default client;
