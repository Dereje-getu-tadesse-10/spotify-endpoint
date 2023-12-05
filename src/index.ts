import { Hono } from "hono";
import { currentSong } from "./router/current-song";

const api = new Hono();

api.route("/current-song", currentSong);


api.notFound((c) => { 
    return c.json({
        error: "Not found"
    }, 404);
});
export default api;