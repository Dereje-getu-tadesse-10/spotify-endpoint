import { Hono } from 'hono'
import { currentlyPlayingSong } from "../lib/spotify";

export const currentSong = new Hono();

currentSong.get('/', async (c) => {
    const data = await currentlyPlayingSong()

    if (data.status === 204 || data.status > 400) {
        return c.json({
            is_playing: false,
        }, 200);
    }
    

    const song = await data.json() as any
   
    if (song.item === null) {
        return c.json({
            is_playing: false,
        }, 200);
    }
    
    const current_song = {
        title: song.item.name,
        artist: song.item.artists.map((_artist: any) => _artist.name).join(', '),
        song_url: song.item.external_urls.spotify,
        is_playing: song.is_playing
    };

    return c.json({
        current_song
    });
});
