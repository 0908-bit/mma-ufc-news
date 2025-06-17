document.addEventListener('DOMContentLoaded', () => {
    const fighterList = document.getElementById('fighter-list');
    const fighterStats = document.getElementById('fighter-stats');

    fetch('https://0908-bit.github.io/mma-ufc-news/data/fighters.json')
        .then(response => response.json())
        .then(data => {
            // Popola la lista fighter nella homepage
            if (fighterList) {
                data.forEach(fighter => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="fighter.html?id=${fighter.id}">${fighter.name}</a>`;
                    fighterList.appendChild(li);
                });
            }

            // Se siamo in fighter.html, mostra i dettagli
            const urlParams = new URLSearchParams(window.location.search);
            const fighterId = urlParams.get('id');
            if (fighterId && fighterStats) {
                const fighter = data.find(f => f.id === fighterId);
                if (fighter) {
                    fighterStats.innerHTML = `
                        <h2>${fighter.name}</h2>
                        <p><strong>Record:</strong> ${fighter.record}</p>
                        <p><strong>Weight Class:</strong> ${fighter.weightClass}</p>
                        <p><strong>Height:</strong> ${fighter.height}</p>
                        <p><strong>Reach:</strong> ${fighter.reach}</p>
                        <p><strong>Wins:</strong> ${fighter.wins}</p>
                        <p><strong>Losses:</strong> ${fighter.losses}</p>
                        <p><strong>Draws:</strong> ${fighter.draws}</p>
                    `;
                }
            }
        });
});
