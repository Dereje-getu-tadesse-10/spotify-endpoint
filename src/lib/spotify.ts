import { config } from "../../config";

const API_ENDPOINT = 'https://api.spotify.com/v1/me'
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=time_range%3Dmedium_term&limit=5&offset=5`

export const getAccessToken = async (): Promise<{access_token: string}> => {
    const refresh_token: string = config.SPOTIFY_REFRESH_TOKEN;

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${config.SPOTIFY_BASIC}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token
        })
    });

    return response.json();
};

export const currentlyPlayingSong = async () => {
    const { access_token } = await getAccessToken();

    return fetch(`${API_ENDPOINT}/player/currently-playing`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
};





export const topTracks = async () => {
    const { access_token } = await getAccessToken();

    return fetch(TOP_TRACKS_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
};
