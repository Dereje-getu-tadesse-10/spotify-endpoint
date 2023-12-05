
export const getAccessToken = async (): Promise<{ access_token: string }> => {
    const refresh_token: string = ""

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic xx`,
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
    return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            Authorization: `Bearer ${access_token}`
       }
   });
};