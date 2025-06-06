function displayRandomPlaylist() {
    fetch('data/data.json')
        .then(response => response.json())
        .then(playlists => {

            const randomId = Math.floor(Math.random() * playlists.length);
            const playlist = playlists[randomId];

            document.querySelector('.playlist-img').innerHTML = `<img src="${playlist.playlist_cover}" alt="${playlist.playlist_name} Cover" />`;
            document.querySelector('.playlist-name').textContent = playlist.playlist_name;

            const songContainer = document.querySelector('.song-list');
            songContainer.innerHTML = '';
            playlist.songs.forEach(song => {
                const songItem = document.createElement('li');
                songItem.classList.add('song-item');
                songItem.innerHTML = `
                    <img src="${song.song_cover}" alt="${song.songTitle} Cover" class="song-img"/>
                        <div class = "songDetail">
                                    <span class="song-title">${song.songTitle}</span>
                                    <span class="song-artist">${song.artistName}</span>
                                    <span class="song-album">${song.albumName}</span>
                                    <span class="song-duration">${song.songDuration}</span>
                        </div>
            `;

                songContainer.appendChild(songItem);
            });
        });

};

document.addEventListener('DOMContentLoaded', displayRandomPlaylist);

