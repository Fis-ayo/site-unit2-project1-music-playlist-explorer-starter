// Function to display each of the playlist cards
const details = document.querySelector(".modal-content");


function renderPlaylists() {
    fetch('data/data.json')
        .then(response => response.json())
        .then(playlists => {
            const container = document.querySelector('.playlist-cards');
            container.innerHTML = '';

            if(playlists.length === 0){
                container.innerHTML = `<p class="emptyPlaylist"> No Playlist Added </p>`;
                return;
            }

            playlists.forEach((playlist, index) => {
                const card = document.createElement('div');
                card.className = 'playlist-card';

                card.innerHTML = `
                <img src="${playlist.playlist_cover}" alt="${playlist.playlist_name} Cover" class="cover-img"/>
                <h3>${playlist.playlist_name}</h3>
                <p>Created by ${playlist.playlist_author}</p>
                <button class="like-btn" data-index="${index}">
                ❤️ <span class="like-cnt">${playlist.playlist_likes}</span>
                </button>
                `;

                container.appendChild(card);

                const modal = document.querySelector(".modal-overlay");
                card.addEventListener('click', () => {
                    modal.style.display = 'flex';

                    details.innerHTML = `
                    <span class="close"> &times; </span>
                    <div class="playlist-head">
                        <img src="${playlist.playlist_cover}" alt="${playlist.playlist_name} Cover" class="detail-img"/>
                        <div class = "playlist-text">
                            <h3>${playlist.playlist_name}</h3>
                            <p>${playlist.playlist_author}</p>
                        </div>
                    </div>
                    <div>
                    <button class="shuffle-btn">Shuffle</button>
                    </div>

                    <div class="songs"></div>
                    `;
                    const playlistSongs = document.querySelector(".songs");
                    playlist.songs.forEach((songDetail, index) => {

                        const song = document.createElement('div');
                        song.className = 'playlist-song';
                        song.innerHTML = `
                        <img src="${songDetail.song_cover}" alt="${songDetail.songTitle} Cover" class="song-img"/>

                        <div class = "textDetail">
                                <h3>${songDetail.songTitle}</h3>
                                <p>${songDetail.artistName}</p>
                                <p>${songDetail.albumName}</p>
                        </div>

                        <p class="duration">${songDetail.songDuration}</p>
                        `;
                        playlistSongs.appendChild(song);
                    });

                    const closeBtn = document.querySelector(".close");
                    closeBtn.addEventListener('click', () => {
                        modal.style.display = 'none';
                    });

                    window.addEventListener('click', (event) => {
                        if(event.target === modal) {
                            modal.style.display = 'none';
                        }
                    });

                    const shuffle = document.querySelector(".shuffle-btn");
                    shuffle.addEventListener('click', () => {
                        const songContainer = document.querySelector('.songs');
                        const cards = Array.from(songContainer.children);

                        for(let i=cards.length-1; i>0; i--){
                            const j = Math.floor(Math.random() * (i+1));
                            [cards[i], cards[j]] = [cards[j], cards[i]];
                        }

                        songContainer.innerHTML = "";
                        cards.forEach(card => songContainer.appendChild(card));
                    });

                });
            });


            document.querySelectorAll('.like-btn').forEach(button => {
                let liked = false;

                button.addEventListener("click", () => {
                    const countSpan = button.querySelector('.like-cnt');
                    let likes = parseInt(countSpan.textContent);

                    liked = !liked;
                    likes += liked ? 1 : -1;

                    countSpan.textContent = likes;
                    button.classList.toggle('liked');
                });
            });


        })
        .catch(error => console.error('Error fetching playlist:', error));
};

renderPlaylists();


