
// Spinner toggle function
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
};

//mobile search function

const searchMobile = () => {
    const searchBox = document.getElementById("search-box");
    const searchText = searchBox.value;

    // display spinner
    toggleSpinner('block');

    // empty search box error
    const errorMessage = document.getElementById('error-message');

    searchBox.value = '';

    // empty search box valitation
    if (searchText == '') {
        errorMessage.style.display = 'block';
        toggleSpinner('none');
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayMobiles(data.data));
        errorMessage.style.display = 'none';
    }

};

// display search results

const displayMobiles = mobiles => {
    const twentyMobile = mobiles.slice(0, 20);
    const mobilesData = document.getElementById('mobileDiv');
    const errorMessage2 = document.getElementById('error-message2');
    const mobileDetail = document.getElementById('mobile-detail');
    mobileDetail.textContent = '';
    mobilesData.textContent = '';
    if (twentyMobile == false) {
        errorMessage2.style.display = 'block';
        toggleSpinner('none');
    } else {
        twentyMobile.forEach(mobile => {
            const div = document.createElement('div');
            div.className = 'col-lg-4 mb-5';
            div.innerHTML = `
            <div class="card">
                <img src="${mobile.image}" class="mx-auto my-5 w-50 img-fluid rounded" alt="...">
            <div class="card-body mx-auto">
                <h5 class="card-title">${mobile.phone_name}</h5>
                <p class="card-text">Brand: ${mobile.brand}</p>
                <button onclick="loadMobileDetail('${mobile.slug}')" class="btn btn-success" type="button">More Info</button>
            </div >
            </div >
                `;
            mobilesData.appendChild(div);
        })
        errorMessage2.style.display = 'none';
        toggleSpinner('none');
    }

};

// single Mobile details fetch and Display

const loadMobileDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMobileDetail(data.data));
};

const displayMobileDetail = mobile => {
    const mobileDetail = document.getElementById('mobile-detail');
    mobileDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${mobile.image}" class="mx-auto my-5 w-30 rounded" alt="...">
        <div class="card-body">
        <p class="card-text">Name: ${mobile.name}</p>
        <p class="card-text">Release Date: ${mobile.releaseDate ? mobile.releaseDate : 'Not Available'}</p>
        <p class="card-text">Brand: ${mobile.brand}</p>
        <p class="card-text fs-5 "><p class="fw-bold">Main Fetures</p><p class="fs-6">Storage: ${mobile.mainFeatures.storage}<br> Display: ${mobile.mainFeatures.displaySize}<br> Chipset: ${mobile.mainFeatures.chipSet}<br> Memory: ${mobile.mainFeatures.memory}<br> Sensors: ${mobile.mainFeatures.sensors.join(', ')}</p></p >
    <p class="card-text fs-5 "><p class="fw-bold">Others</p><p class="fs-6">NFC: ${mobile.others?.NFC ? mobile.others?.NFC : 'N/A'}<br>Radio: ${mobile.others?.Radio ? mobile.others?.Radio : 'N/A'}<br>Bluetooth: ${mobile.others?.Bluetooth ? mobile.others?.Bluetooth : 'N/A'}<br>USB: ${mobile.others?.USB ? mobile.others?.USB : 'N/A'}<br>GPS: ${mobile.others?.GPS ? mobile.others?.GPS : 'N/A'}<br>WLAN: ${mobile.others?.WLAN ? mobile.others?.WLAN : 'N/A'}</p></p>
    </div>

        `;
    mobileDetail.appendChild(div);
};