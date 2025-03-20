function validateSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchWarning = document.getElementById("searchWarning");
    const closeSearchButton = document.getElementById("closeSearchButton");
    const loadMoreButton = document.getElementById("loadMoreButton");
    const query = searchInput.value.trim().toLowerCase();
    document.getElementById("searchButton").disabled = query.length < 3;
    if (query.length < 3) {
        searchWarning.style.display = "block";
        closeSearchButton.style.display = "none";
        loadMoreButton.style.display = "block";
    } else {
        searchWarning.style.display = "none";
        closeSearchButton.style.display = "block";
        loadMoreButton.style.display = "none";
        filterPokemonImages(query);
    }
}


async function filterPokemonImages(query) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000"); // Holt alle Pokémon-Namen
    const data = await response.json();
    const allPokemons = data.results;
    
    const filteredPokemons = allPokemons.filter(pokemon => pokemon.name.includes(query));
    
    displayFilteredPokemonImages(filteredPokemons);
}


async function displayFilteredPokemonImages(pokemons) {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = ""; // Entfernt alte Pokémon
    if (pokemons.length === 0) return;
    for (const pokemon of pokemons.slice(0, 10)) { // Maximal 10 Pokémon anzeigen
        try {
            let response = await fetch(pokemon.url);
            let data = await response.json();
            renderPokemonCard(data);
        } catch (error) {
            console.error("Fehler beim Laden der Pokémon-Daten:", error);
        }
    }
}


function toggleSearchUI(isSearching) {
    const loadMoreButton = document.getElementById("loadMoreButton");
    const closeSearchButton = document.getElementById("closeSearchButton");
    if (loadMoreButton) {
        loadMoreButton.style.display = isSearching ? "none" : "block"; 
    }
    if (closeSearchButton) {
        closeSearchButton.style.display = isSearching ? "block" : "none"; 
    }
}


async function searchPokemon() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    if (query.length < 3) return;
    toggleSearchUI(true); // UI aktualisieren
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (!response.ok) throw new Error("Pokémon not found");
        let data = await response.json();
        document.getElementById("cardContainer").innerHTML = "";
        renderPokemonCard(data);
    } catch (error) {
        alert("Pokémon not found! Try another name.");
        toggleSearchUI(false); 
    }
}


function resetToHome() {
    document.getElementById("searchInput").value = ""; // Suchfeld leeren
    document.getElementById("cardContainer").innerHTML = ""; // Karten zurücksetzen
    loadedPokemons = []; // Leert das Array, um doppelte Einträge zu vermeiden
    currentIndex = 1; // Setzt den Index zurück
    fetchPokemons(initialLoad); // Startseite neu laden
    const loadMoreButton = document.getElementById("loadMoreButton");
    const closeSearchButton = document.getElementById("closeSearchButton");
    if (loadMoreButton) {
        loadMoreButton.style.display = "block";
    }
    if (closeSearchButton) {
        closeSearchButton.style.display = "none"; // Versteckt den Schließen-Button
    }
}


document.getElementById("searchInput").addEventListener("input", function () {
    const loadMoreButton = document.getElementById("loadMoreButton");
    const closeSearchButton = document.getElementById("closeSearchButton");
    if (this.value.trim() === "") {
        if (loadMoreButton) {
            loadMoreButton.style.display = "block";
        }
        if (closeSearchButton) {
            closeSearchButton.style.display = "none"; // Versteckt den Schließen-Button
        }
    }
});