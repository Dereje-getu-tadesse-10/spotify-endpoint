import { Hono } from "hono";
import { currentSong } from "./router/current-song";

const api = new Hono();

api.route("/api", currentSong);

export default api;