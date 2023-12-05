import { Hono } from "hono";
import { currentSong } from "./router/current-song";

const api = new Hono();

export type Song = {
  current_song: {
    title: string;
    artist: string;
    song_url: string;
    is_playing: boolean;
  };
  is_playing?: boolean;
};

api.route("/", currentSong);


api.notFound((c) => { 
    return c.json({
        error: "Not found"
    }, 404);
});
export default api;


