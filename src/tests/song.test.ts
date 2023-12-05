import app, { Song } from '..'

describe('Test the application for current song', () => {
    it('Should correctly handle the current song state', async () => {
        const res = await app.request('http://localhost');
        const data: Song = await res.json();

        if (data.current_song) {
            expect(data.current_song.is_playing).toBe(true);
        } else {
            expect(data.current_song).toBeUndefined();
            expect(data.is_playing).toBe(false);
        }
    });
});
