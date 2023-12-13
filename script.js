const countryInput = document.getElementById("countryInput");
const countryInfo = document.getElementById("countryInfo");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getCountriesByChoice();
  form.reset();
});

// hämtar och visar info om länder,enligt sökning. Error hantering.
async function getCountriesByChoice() {
  const path = document.querySelector(":checked").value;
  const userChoice = document.querySelector("input").value;
  const url = `https://restcountries.com/v3.1/${path}/${userChoice}?fields=capital,population,subregion,name,flags`;

  try {
    const response = await fetch(url);
    console.log(response);

    const data = await response.json();
    console.log(data);
    
    const containerDiv = document.querySelector("#countryInfo");
    containerDiv.innerHTML = "";

    if (response.ok) {
      data.sort((a, b) => b.population - a.population);
      data.forEach( createCountryDiv );
    } else if (response.status === 404) {
      console.log(404);
      containerDiv.innerHTML = "<p>No country was found, try again.</p>";
    } else {
      containerDiv.innerHTML = "<p>Something went wrong, try again later.";
    }
  } catch (error) {
    displayError(error);
  }
}

//skapar och appendar DOM för ett land
function createCountryDiv(countryData) {
  const containerDiv = document.querySelector("#countryInfo");
  const newDiv = document.createElement("div");
  newDiv.classList.add("country-container");

  const flagImg = document.createElement("img");
  flagImg.src = countryData.flags.png;

  const countryName = document.createElement("h2");
  countryName.innerText = countryData.name.official;

  const capitalInfo = document.createElement("p");
  capitalInfo.innerText = `Capital: ${countryData.capital}`;

  const populationInfo = document.createElement("p");
  populationInfo.innerText = `Population: ${countryData.population}`;

  const subregionInfo = document.createElement("p");
  subregionInfo.innerText = `Subregion: ${countryData.subregion}`;

  newDiv.append(flagImg, countryName, capitalInfo, populationInfo, subregionInfo);

  containerDiv.appendChild(newDiv);
}

//visar felmeddelande
function displayError(error) {
  console.error("Error", error);
  const containerDiv = document.querySelector("#countryInfo");
  containerDiv.innerHTML = "<p>Error fetching country data. Try again.</p>";
}
