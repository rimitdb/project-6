
const searchMobile = () => {
    const searchBox = document.getElementById("search-box");
    const searchText = searchBox.value;
    searchBox.value = '';
    if (searchText == '') {
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'block'
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
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'block'
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

const loadMobileDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMobileDetail(data.data));
}

const displayMobileDetail = mobile => {
    const mobileDetail = document.getElementById('mobile-detail');
    mobileDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${mobile.image}" class="mx-auto my-5 w-30 rounded" alt="...">
        <div class="card-body">
        <p class="card-text fs-5">Name: ${mobile.name}</p>
        <p class="card-text fs-5">Brand: ${mobile.brand}</p>
        <p class="card-text fs-5">Release Date: ${mobile.releaseDate ? mobile.releaseDate : 'No release date found'}</p>
        <p class="card-text fs-5 ">Main Fetures: <p class="fs-6">Storage: ${mobile.mainFeatures.storage}<br> Display: ${mobile.mainFeatures.displaySize}<br> Chipset: ${mobile.mainFeatures.chipSet}<br> Memory: ${mobile.mainFeatures.memory}<br> Sensors: ${mobile.mainFeatures.sensors[0]} , ${mobile.mainFeatures.sensors[1]} , ${mobile.mainFeatures.sensors[2]} ,  ${mobile.mainFeatures.sensors[3]} , ${mobile.mainFeatures.sensors[4]} , ${mobile.mainFeatures.sensors[5]}</p></p>
        <p class="card-text fs-5 ">Others: <p class="fs-6">WLAN: ${mobile.others.WLAN}<br> Bluetooth: ${mobile.others.Bluetooth}<br> GPS: ${mobile.others.GPS}<br> NFC: ${mobile.others.NFC}<br> Radio: ${mobile.others.Radio}<br> USB: ${mobile.others.USB}</p></p>
        </div>

    `;
    mobileDetail.appendChild(div);
};