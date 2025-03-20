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


async function fetchAdditionalPokemons(count) {
    const cardContainer = document.getElementById("cardContainer");
    for (let i = 0; i < count; i++) {
        try {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentIndex}`);
            let data = await response.json();
            loadedPokemons.push(data);
            renderPokemonCard(data);
            currentIndex++;
        } catch (error) {
            console.error("Fehler beim Laden von Pokémon:", error);
        }
    }
}


function loadMorePokemons() {
    const loadMoreButton = document.getElementById("loadMoreButton");
    const loadingScreen = document.getElementById("loadingScreen");
    if (!loadMoreButton || !loadingScreen) {
        console.error("FEHLER: loadMoreButton oder loadingScreen wurde nicht gefunden!");
        return;
    }
    loadMoreButton.disabled = true; 
    loadingScreen.style.display = "flex"; 
    fetchAdditionalPokemons(loadMoreCount).then(() => {
        loadMoreButton.disabled = false; // Button wieder aktivieren
        loadingScreen.style.display = "none"; // Ladeanimation ausblenden
        if (loadedPokemons.length >= initialLoad + loadMoreCount) {
            loadMoreButton.style.display = "none";
        }
    });
}









