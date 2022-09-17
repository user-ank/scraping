let searchList = document.getElementById("search-list");
let home = document.getElementById("home");


const showSearchList = (data) => {
    searchList.innerHTML = "";
    data.forEach(dataItem => {
        const divElem = document.createElement('div');
        divElem.classList.add('search-list-item');
        divElem.innerHTML = `
            <img src = "${dataItem.show.image.original ? dataItem.show.image.original : ""}" alt = "">
            <p data-id = "${dataItem.show.id}">${dataItem.show.name}</p>
        `;
        searchList.appendChild(divElem);
    });
}

showHome = (result) => {

    let picDiv = document.getElementById("image");
    let infoDiv = document.getElementById("centerDiv");
    let nameh = document.getElementsByClassName("name");
    let moreDiv = document.getElementById("table");

    let imageUrl = result.show.image.original;
    // console.log(imageUrl);
    picDiv.src = imageUrl
    
    let showName = result.show.name;
    nameh.innerHTML = showName;
    let infoText = result.show.summary;
    infoDiv.innerHTML = infoText;

    let network, genre, rating;

    network = result.show.network.name;
    genre = "";
    result.show.genres.forEach(element => {
        genre += `${element},`
    });
    // genre -= `,`;
    rating = result.show.rating.average;

    table.innerHTML = `<li> <b>Network :</b> ${network}</li><li><b>Genres:</b>${genre}</li><li><b>Rating : </b> ${rating}</li>`;
}
const defaultsearch = "Modern Family";


async function giveHome() {
    let defaultUrl = `https://api.tvmaze.com/search/shows?q=${defaultsearch}`
    try {
        const response = await fetch(defaultUrl);
        alldata = await response.json();
        
        alldata.some(function (item, index) {
            if (item.show.name == "Modern Family") {
                showHome(item);
                return true;
            }

        });

    }
    catch (error) {
        console.log(error);
    }
}

async function searchShows(search) {
    let url = `https://api.tvmaze.com/search/shows?q=${search}`;

    try {
        const response = await fetch(url);
        alldata = await response.json();
        // if(alldata.response == 'success')
        //     console.log(alldata);

        const results = alldata.map(element => element.show.name);
        console.log(alldata);
        showSearchList(alldata);

    }
    catch (error) {
        console.log(error);
    }
}

let timeoutToken = 0;
window.onload = () => {

    giveHome();

    const searchbarElement = document.getElementById("searchbar");

    setTimeout(searchbarElement.onkeyup = (event) => {
    
    
        clearTimeout(timeoutToken);
    
        if(searchbarElement.value.trim().length === 0){
            searchList.innerHTML = "";
            return;
        }
        searchShows(searchbarElement.value);


    }, 500);

    

}




searchList.addEventListener('click', (event) => {
    let searchId = event.target.dataset.id;


    let singleData = alldata.filter(singleData => {
        return searchId == singleData.show.id;
    })

    console.log(singleData[0]);
    searchList.innerHTML = "";
    showHome(singleData[0]);
});

home.addEventListener('click', (event) => {
    giveHome();

})


document.addEventListener('click', (event) => {
    searchList.innerHTML = "";

})