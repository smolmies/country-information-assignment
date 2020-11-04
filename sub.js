//https://restcountries.eu/rest/v2/all

async function getAllCountries() {
    try {
        const result = await axios.get(`https://restcountries.eu/rest/v2/all`);
        console.log(result);

        const { data } = result;

        data.sort((a, b) => {
           return a.population - b.population;
        });

        console.log(data);
        const container = document.getElementById("all-countries");

        data.map((country) => {
            const {name, flag, region, population} = country;
            const countryItem = document.createElement('li');


            const image = document.createElement('img');
            image.setAttribute('src', flag);
            image.setAttribute('id', 'mini-flag');
            image.setAttribute('width', '20px');
            countryItem.appendChild(image);

            const cName = document.createElement('span');
            cName.textContent = name;
            cName.setAttribute('class', getRegionColor(region));
            countryItem.appendChild(cName);


            countryItem.addEventListener('click', populationMessage);

            function populationMessage() {
                const isMessageThere = document.getElementById(`population-${name}`);

                if(isMessageThere) {
                 countryItem.removeChild(isMessageThere);
                }
                else {
                const populationMessage = document.createElement('p');
                populationMessage.setAttribute('id', `population-${name}`);
                populationMessage.textContent = `${population} people live here.`;
                countryItem.appendChild(populationMessage);
                }
            }

            container.appendChild(countryItem);
        });
        container.appendChild(fullList);
    }
    catch (e) {
        console.error(e);
    }
}

getAllCountries();

function getRegionColor(currentRegion) {
    switch (currentRegion) {
        case 'Africa':
            return 'blue';
        case 'Americas':
            return 'green';
        case 'Asia':
            return 'red';
        case 'Europe':
            return 'yellow';
        case 'Oceania':
            return 'purple';
        default:
            return 'black';
    }
}


// const countrylist = result.data;
// countryItem.innerHTML = `<img src="${flag}" width="15px" height="15px"> ${name}`
// const countryFlag = document.createElement('img');
// countryFlag.textContent = flag;
// countryFlag.setAttribute('height', '15px')
// countryFlag.setAttribute('width', '15px')
// fullList.appendChild(countryFlag);
//
// const countryName = document.createElement('li');
// countryName.textContent = name;
// fullList.appendChild(countryName);
//
// const countryPopulation = document.createElement('li');
// countryPopulation.textContent = population;