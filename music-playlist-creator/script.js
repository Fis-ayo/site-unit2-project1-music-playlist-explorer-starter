function renderPlaylists() {
    fetch('data/data.json')
    .then(response => response.json())
    .then(playlists => {
        const container = document.querySelector('.playlist-cards');
        container.innerHTML = '';

        playlists.forEach((playlist, index) => {
            const card = document.createElement('div');
            card.className = 'playlist-card';

            card.innerHTML = `
                <img src="${playlist.playlist_cover}" alt="${playlist.playlist_name} Cover" class="cover-img" width = 100px/>
                <h3>${playlist.playlist_name}</h3>
                <p>Created by ${playlist.playlist_author}</p>
                <button class="like-btn" data-index="${index}">
                ❤️ <span class="like-cnt">${playlist.playlist_likes}</span>
                </button>
            `;

            container.appendChild(card);
        });

        document.querySelectorAll('.like-btn').forEach(button => {
            let liked = false;

            button.addEventListener("click", () => {
                const countSpan = button.querySelector('.like-cnt');
                let likes = parseInt(countSpan.textContent);

                liked = !liked;
                likes += liked ? 1: -1;

                countSpan.textContent = likes;
                button.classList.toggle('liked');
            });
        });
    })
    .catch(error => console.error('Error fetching playlist:', error));
}

renderPlaylists();
