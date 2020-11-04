
const searchButton = document.getElementById("search-button");
searchButton.addEventListener('click', fetchCountryData);
const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('keyup', setInput)

const countryContainer = document.getElementById('countries');

let input;

function setInput(e) {
    input = e.target.value;
    if (e.key == 'Enter') {
        fetchCountryData();
    }
}

async function fetchCountryData() {
    searchBar.value = "";

    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';

    const previousSearchResult = document.getElementById('country');
    if (previousSearchResult) {
        countryContainer.removeChild(previousSearchResult);
    }

    try {
        const result = await axios.get(`https://www.restcountries.eu/rest/v2/name/${input}?fullText=true`);

        const countryInfo = result.data[0];
        console.log(countryInfo);

        const intro = document.createElement("h3");
        intro.textContent = "Here are some facts about the country you searched:";
        countryContainer.appendChild(intro);

        const country = document.createElement('div');
        country.setAttribute('id', 'country');

        const flag = document.createElement('img');
        flag.setAttribute('src', countryInfo.flag);
        flag.setAttribute('id', 'flag')
        country.appendChild(flag);

        const countryName = document.createElement('h1');
        countryName.textContent = countryInfo.name;
        country.appendChild(countryName);

        const population = document.createElement('p');
        population.textContent = `${countryInfo.name} is situated in ${countryInfo.subregion}. It has a population of ${countryInfo.population} people.`;
        country.appendChild(population);

        const capital = document.createElement('p');
        capital.textContent = `The capital is ${countryInfo.capital} ${createCurrencyString(countryInfo.currencies)}.`;
        country.appendChild(capital);

        const languages = document.createElement('p');
        languages.textContent = `${createLanguageString(countryInfo.languages)}.`;
        country.appendChild(languages);

        // fetchCountryData(input).then =
        countryContainer.appendChild(country);


    } catch (e){
        errorMessage.textContent = `${input} doesn't exist. Please try again!`;
    }
}

function createCurrencyString(currencies) {
    return currencies.reduce((acc, currentCurrency, index, array) => {
        if (array.length === 1 || index === 0) {
            return `${acc} ${currentCurrency.name}'s`;
        }
        if (index === array.length - 1) {
            return `${acc} and ${currentCurrency.name}'s`;
        }
        if (index !== array.length - 1 && index !== 0) {
            return `${acc}, ${currentCurrency.name}'s`;
        }
    }, 'and you can pay with');
}

function createLanguageString(languages) {
    return languages.reduce((acc, currentLanguage, index, array) => {
        if (array.length === 1 || index === 0) {
            return `${acc} ${currentLanguage.name}`;
        }
        if (index === array.length - 1) {
            return `${acc} and ${currentLanguage.name}`;
    }
        if (index !== array.length - 1 && index !== 0) {
            return `${acc}, ${currentLanguage.name}`;
        }

    }, 'They speak');
}

// function getInfo(){
//     // const searchBar = document.getElementById("search-bar").value;
//     const infoWindow = document.getElementById("informationWindow");
//     const info = document.createElement("p");
//     fetchCountryData(searchBar).then(x => info.innerHTML = x);
//     infoWindow.appendChild(info);
// }

// const generalInfo = `${countryInfo.name} is situated in ${countryInfo.subregion}. It has a population of ${countryInfo.population} people.
// The capital is ${countryInfo.capital}`;
// const finalResult = `<img height="35px" width="55px" src="${countryInfo.flag}"> ${countryInfo.name} <br>
// ${generalInfo} <br>
// ${currencyString}. ${languageString}.`;
//
// return finalResult;