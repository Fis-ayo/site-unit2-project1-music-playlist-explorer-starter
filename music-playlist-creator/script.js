// Function to display each of the playlist cards


let playlists = [];

const details = document.querySelector(".modal-content");

const heartIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>'
const heartIcon_plain = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>'
const bins = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>'

function renderPlaylists() {
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            playlists = data;
            displayPlaylists(playlists);

        })
        .catch(error => console.error('Error fetching playlist:', error));
}

function displayPlaylists(playlistsToRender) {
    const container = document.querySelector('.playlist-cards');
    container.innerHTML = '';

    if (playlistsToRender.length === 0) {
        container.innerHTML = `<p class="emptyPlaylist"> No Playlist Added </p>`;
        return;
    }

    playlistsToRender.forEach((playlist, index) => {
        const card = document.createElement('div');
        card.className = 'playlist-card';

        card.innerHTML = `
                <img src="${playlist.playlist_cover}" alt="${playlist.playlist_name} Cover" class="cover-img"/>
                <div class = "playlist-info">
                <h3>${playlist.playlist_name}</h3>
                <p>Created by ${playlist.playlist_author}</p>
                    <div class="like-btn" data-index="${index}">
                        <div class="Icon">${heartIcon_plain} </div> <span class="like-cnt">${playlist.playlist_likes}</span>
                    </div>

                    <div class="card-actions">
                        <button class="edit-btn" data-index="${index}" style = "color: white">...</button>
                        <button class="delete-btn" data-index="${index}"> 🗑️</button>
                    </div>

            `;

        container.appendChild(card);

        card.querySelector(".delete-btn").addEventListener('click', () => {
            playlists.splice(index, 1);
            displayPlaylists(playlists);
        });

        card.querySelector(".edit-btn").addEventListener('click', () => {
            document.getElementById("form-title").textContent = "Edit Playlist";
            document.getElementById("createPlaylist").textContent = "Save Changes";
            const current = playlists[index];

            document.getElementById("new-name").value = current.playlist_name;
            document.getElementById("new-author").value = current.playlist_author;

            document.getElementById("songs-container").innerHTML = "";

            playlist.songs.forEach(song => {
                const row = document.createElement("div");
                row.className = "song-row";
                row.innerHTML = `
                <input text="text" value="${song.songTitle}" class="song-name" />
                <input text="text" value="${song.artistName}" class="artist-name" />
                <input text="text" value="${song.albumName}" class="album-name" />
                <input text="text" value="${song.songDuration}" class="song-duration" />
                `;

                document.getElementById("songs-container").appendChild(row);
            });

            document.getElementById("form-overlay").style.display = "flex";

            form.setAttribute("data-edit-index", index);
        });

        const modal = document.querySelector(".modal-overlay");
        const art = card.querySelector(".cover-img");
        art.addEventListener('click', () => {
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
            playlist.songs.forEach((songDetail) => {

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
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });

            const shuffle = document.querySelector(".shuffle-btn");
            shuffle.addEventListener('click', () => {
                const songContainer = document.querySelector('.songs');
                const cards = Array.from(songContainer.children);

                for (let i = cards.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [cards[i], cards[j]] = [cards[j], cards[i]];
                }

                songContainer.innerHTML = "";
                cards.forEach(card => songContainer.appendChild(card));
            });

        });
    });

    document.querySelectorAll('.like-btn').forEach(button => {
        let icon = button.querySelector(".Icon");
        let liked = false;

        icon.addEventListener("click", () => {
            const countSpan = button.querySelector('.like-cnt');
            let likes = parseInt(countSpan.textContent);

            liked = !liked;
            likes += liked ? 1 : -1;

            countSpan.textContent = likes;
            button.classList.toggle('liked');
            console.log(liked)
            if (liked == true) {
                icon.innerHTML = `${heartIcon}`;
            } else {
                icon.innerHTML = `${heartIcon_plain}`;
            }
        });

    });



};


renderPlaylists();



const addPlaylist = document.getElementById('add-playlist-btn');
const formOverlay = document.getElementById('form-overlay');
const closePlaylist = document.querySelector(".closePlaylist");


closePlaylist.addEventListener('click', () => {
    formOverlay.style.display = 'none';
});

addPlaylist.addEventListener("click", () => {
    formOverlay.style.display = 'flex';
    resetSongInputs();
    form.reset();
    form.removeAttribute('data-edit-index');
})

const form = document.querySelector("#playlist-form");


form.addEventListener('submit', function (e) {
    document.querySelector("form-title").textContent = "Create New Playlist";
    document.getElementById("createPlaylist").textContent = "Create";
    e.preventDefault();
    const name = document.getElementById("new-name").value.trim();
    const author = document.getElementById("new-author").value.trim();
    const songRows = document.querySelectorAll(".song-row");
    const songs = [];

    songRows.forEach(row => {
        const title = row.querySelector(".song-name")?.value.trim();
        const artist = row.querySelector(".artist-name")?.value.trim();
        const album = row.querySelector(".album-name")?.value.trim();
        const duration = row.querySelector(".song-duration")?.value.trim();

        if (title && artist) {
            songs.push({
                song_cover: "assets/img/song.png",
                songTitle: title,
                artistName: artist,
                albumName: album,
                songDuration: duration
            })
        };
    });

    const newPlaylist = {
        playlistID: Date.now(),
        playlist_cover: "assets/img/playlist.png",
        playlist_name: name,
        playlist_author: author,
        playlist_likes: 0,
        songs: songs
    };
    // playlists.push(newPlaylist);
    const editIndex = form.getAttribute("data-edit-index");
    if (editIndex !== null) {
        playlists[editIndex] = newPlaylist;
        form.removeAttribute("data-edit-index");
    } else {
        playlists.push(newPlaylist);
    }
    displayPlaylists(playlists);
    console.log(playlists);
    form.reset();
    document.getElementById("form-overlay").style.display = "none";
});

document.querySelector(".newSong").addEventListener("click", () => {
    const songContainer = document.getElementById("songs-container");

    const songRow = document.createElement("div");
    songRow.className = "song-row";

    songRow.innerHTML = `
    <input type="text" placeholder="Song name" class="song-name" />
    <input type="text" placeholder="Artist name" class="artist-name" />
    <input type="text" placeholder="Album name" class="album name" />
    <input type="text" placeholder="Song duration" class="song-duration" />
    <button type="button" class="remove-song" title="Remove">x</button>
    `;

    songContainer.appendChild(songRow);

    songRow.querySelector(".remove-song").addEventListener("click", () => {
        songRow.remove();
    })
})

document.getElementById("clear-search-btn").addEventListener('click', () => {
    document.getElementById("search-input").value = '';
    document.getElementById("sort-dropdown").value = 'none';
    displayPlaylists(playlists);
});


document.getElementById("sort-dropdown").addEventListener('change', filterAndSortPlaylists);
document.getElementById("search-btn").addEventListener('click', filterAndSortPlaylists);

document.getElementById("search-input").addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        filterAndSortPlaylists();
    }
})

function filterAndSortPlaylists() {
    const query = document.getElementById("search-input").value.toLowerCase();
    const sort = document.getElementById("sort-dropdown").value;

    let result = playlists.filter(p =>
        p.playlist_name.toLowerCase().includes(query) ||
        p.playlist_author.toLowerCase().includes(query)
    );

    if (sort === "az") {
        result.sort((a, b) => a.playlist_name.localeCompare(b.playlist_name));
    } else if (sort === "za") {
        result.sort((a, b) => b.playlist_name.localeCompare(a.playlist_name));
    }

    displayPlaylists(result);
}

function resetSongInputs() {
    const container = document.getElementById("songs-container");
    container.innerHTML = "";
}
