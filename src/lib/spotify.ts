type GetAccessTokenType = {
    refreshToken: string;
    basicToken: string;
};

export const getAccessToken = async ({ refreshToken, basicToken}: GetAccessTokenType ): Promise<{ access_token: string }> => {
    const refresh_token: string = refreshToken;

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basicToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token
        })
    });

    return response.json();
};

export const currentlyPlayingSong = async ({ refreshToken, basicToken}: GetAccessTokenType) => {
    const { access_token } = await getAccessToken({refreshToken, basicToken});

    return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
};