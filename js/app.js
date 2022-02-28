
const searchPlayer = () => {
    const searchBox = document.getElementById("search-box");
    const searchText = searchBox.value;
    searchBox.value = '';
    if (searchText == '') {
        alert('Please Type a Player Name')
    } else {
        const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPlayers(data.player));
    }

};

function displayPlayers(players) {
    const playersData = document.getElementById('playerDiv');
    // playersData.innerHTML = '';
    playersData.textContent = '';
    if (players == null) {
        alert("Nothing Found !!")
    } else {
        for (const player of players) {
            const div = document.createElement('div');
            div.className = 'col-lg-4 mb-5';
            div.innerHTML = `
            <div class="card">
                <img src="${player.strThumb}" class="rounded" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name: ${player.strPlayer}</h5>
                <p class="card-text">Nationality: ${player.strNationality}</p>
                <p class="card-text">Sports: ${player.strSport}</p>
                <p class="card-text">Club: ${player.strTeam}</p>
                <button onclick="details('${player.idPlayer}')" class="btn btn-success" type="button" data-bs-toggle="modal"
                data-bs-target="#myModal">More Info</button>
            </div >
            </div >
                `;
            playersData.appendChild(div);
        }
    }

};


const details = (id) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => setDetails(data.players[0]));
};

const setDetails = (info) => {
    document.getElementById("playerDetails").innerHTML = `
    <div class="modal" id="myModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">${info.strPlayer}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
            <p class="card-text">Nationality: ${info.strNationality}</p>
            <p class="card-text">Sports: ${info.strSport}</p>
            <p class="card-text">Club: ${info.strTeam}</p>
            <p class="card-text">Nationality: ${info.strNationality}</p>
            <p class="card-text">Sports: ${info.strSport}</p>
            <p class="card-text">Club: ${info.strTeam}</p>
            <p class="card-text">Nationality: ${info.strNationality}</p>
            <p class="card-text">Sports: ${info.strSport}</p>
            <p class="card-text">Club: ${info.strTeam}</p>
            </div>
        </div>
    </div>
</div>
      `;
};