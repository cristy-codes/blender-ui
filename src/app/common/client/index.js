import feathers from "@feathersjs/client";
import io from "socket.io-client";

const socket = io("http://localhost:3030");
const client = feathers();
client.configure(feathers.socketio(socket));

window.client = client;

export default client;
