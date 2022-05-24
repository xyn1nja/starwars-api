const apiSearch = "https://swapi.dev/api/";

const sith = "darth vader";
const planetKiller = "death star";
const planet = "alderaan";

let starships;
let info = {};

const getData = async (name) => {
  let res;
  if (name === sith) {
    res = await fetch(`${apiSearch + "people/?search=" + name}`);
  } else if (name === planetKiller) {
    res = await fetch(`${apiSearch + "starships/?search=" + name}`);
  } else if (name === planet) {
    res = await fetch(`${apiSearch + "planets/?search=" + name}`);
  }
  const data = await res.json();
  return data;
};

const getInfo = async () => {
  let vaderData = await getData(sith);
  starships = String(vaderData.results[0].starships);
  let res = await fetch(starships);
  const starshipsData = await res.json();
  if (!starshipsData.length) {
    info["starship"] = {};
  } else {
    info["starship"] = {
      name: starshipsData.name,
      class: starshipsData.starship_class,
      model: starshipsData.model,
    };
  }

  let deathStarData = await getData(planetKiller);
  let deathStarCrew = deathStarData.results[0].crew;
  if (
    deathStarCrew === "" ||
    deathStarCrew === "0" ||
    isNaN(parseInt(deathStarCrew))
  ) {
    info["crew"] = 0;
  } else {
    info["crew"] = parseInt(deathStarCrew.split(",").join(""));
  }

  let alderaanData = await getData(planet);
  let alderaanResidents = alderaanData.results[0].residents;
  for (let i = 0; i < alderaanResidents.length; i++) {
    let res = await fetch(alderaanResidents[i]);
    const data = await res.json();
    if (data.name.includes("Leia")) {
      info["isLeiaOnPlanet"] = true;
      break;
    } else info["isLeiaOnPlanet"] = false;
  }
  console.log(info);
};

getInfo();
