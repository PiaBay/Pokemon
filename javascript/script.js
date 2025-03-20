let currentIndex = 1;
const initialLoad = 35;
const loadMoreCount = 20;
let loadedPokemons = []; // Speichert alle geladenen Pokémon
let currentPokemonIndex = 0; // Speichert das aktuell angezeigte Pokémon im Modal

// Farben für Pokémon-Typen
const typeColors = {
    normal: "#A8A878", fire: "#F08030", water: "#6890F0", electric: "#F8D030",
    grass: "#78C850", ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0",
    ground: "#E0C068", flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
    rock: "#B8A038", ghost: "#705898", dragon: "#7038F8", dark: "#705848",
    steel: "#B8B8D0", fairy: "#EE99AC"
};

async function fetchPokemons(limit) {
    document.getElementById("cardContainer").innerHTML = "";
    for (let i = 0; i < limit; i++) {
        try {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentIndex}`);
            let data = await response.json();
            loadedPokemons.push(data);
            renderPokemonCard(data);
            currentIndex++;
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }
    }
}

function renderPokemonCard(pokemon) {
    const cardContainer = document.getElementById("cardContainer");
    const card = document.createElement("div");
    card.classList.add("card");
    const primaryType = pokemon.types[0].type.name;
    card.style.backgroundColor = typeColors[primaryType] || "#A8A878";
    const imageUrl = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;
    card.innerHTML  = `<div>
                <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
                <img src="${imageUrl}" alt="${pokemon.name}">
                <p>ID: ${pokemon.id}</p>
                </div>
                `;
    card.onclick = () => openPokemonModal(pokemon.id);
    cardContainer.appendChild(card);
}


async function fetchAdditionalPokemons(count) {
    for (let i = 0; i < count; i++) {
        try {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentIndex}`);
            let data = await response.json();
            loadedPokemons.push(data);
            renderPokemonCard(data);
            currentIndex++;
        } catch (error) {
            console.error("❌ Fehler beim Laden von Pokémon:", error);
        }
    }
}

function loadMorePokemons() {
    const loadMoreButton = document.getElementById("loadMoreButton");
    const loadingScreen = document.getElementById("loadingScreen");
    if (!loadMoreButton || !loadingScreen) {
        console.error("❌ FEHLER: loadMoreButton oder loadingScreen wurde nicht gefunden!");
        return;
    }
    loadMoreButton.disabled = true; // Button deaktivieren
    loadingScreen.style.display = "flex"; // Ladeanimation anzeigen
    fetchAdditionalPokemons(loadMoreCount).then(() => {
        loadMoreButton.disabled = false; // Button wieder aktivieren
        loadingScreen.style.display = "none"; // Ladeanimation ausblenden
        if (loadedPokemons.length >= initialLoad + loadMoreCount) {
            loadMoreButton.style.display = "none";
        }
    });
}









