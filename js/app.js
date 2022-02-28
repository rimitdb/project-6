
const searchMobile = () => {
    const searchBox = document.getElementById("search-box");
    const searchText = searchBox.value;
    searchBox.value = '';
    if (searchText == '') {
        alert('Please Type a Valid Mobile Name')
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayMobiles(data.data));
    }

};

const displayMobiles = mobiles => {
    const mobilesData = document.getElementById('mobileDiv');
    mobilesData.textContent = '';
    if (mobiles == null) {
        alert("Nothing Found !!")
    } else {
        mobiles.forEach(mobile => {
            const div = document.createElement('div');
            div.className = 'col-lg-4 mb-5';
            div.innerHTML = `
            <div class="card">
                <img src="${mobile.image}" class="mx-auto my-5 w-50 img-fluid rounded" alt="...">
            <div class="card-body">
                <h5 class="card-title">${mobile.phone_name}</h5>
                <p class="card-text">Brand: ${mobile.brand}</p>
                <button onclick="loadMobileDetail('${mobile.slug}')" class="btn btn-success" type="button">More Info</button>
            </div >
            </div >
                `;
            mobilesData.appendChild(div);
        })
    }

};

const loadMobileDetail = mobileId => {
    console.log(mobileId);
}


// const details = (id) => {
//     const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
//     fetch(url)
//         .then((res) => res.json())
//         .then((data) => setDetails(data.players[0]));
// };

// const setDetails = (info) => {
//     document.getElementById("playerDetails").innerHTML = `
//     <div class="modal" id="myModal">
//     <div class="modal-dialog">
//         <div class="modal-content">
//             <div class="modal-header">
//                 <h5 class="modal-title">${info.strPlayer}</h5>
//                 <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
//             </div>
//             <div class="modal-body">
//             <p class="card-text">Nationality: ${info.strNationality}</p>
//             <p class="card-text">Sports: ${info.strSport}</p>
//             <p class="card-text">Club: ${info.strTeam}</p>
//             <p class="card-text">Nationality: ${info.strNationality}</p>
//             <p class="card-text">Sports: ${info.strSport}</p>
//             <p class="card-text">Club: ${info.strTeam}</p>
//             <p class="card-text">Nationality: ${info.strNationality}</p>
//             <p class="card-text">Sports: ${info.strSport}</p>
//             <p class="card-text">Club: ${info.strTeam}</p>
//             </div>
//         </div>
//     </div>
// </div>
//       `;
// };