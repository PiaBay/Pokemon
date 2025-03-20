function validateSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchWarning = document.getElementById("searchWarning");
    const query = searchInput.value.trim().toLowerCase();
    document.getElementById("searchButton").disabled = query.length < 3;
    
    // Zeige Warnung an, wenn weniger als 3 Zeichen eingegeben wurden
    if (query.length < 3) {
        searchWarning.style.display = "block";
    } else {
        searchWarning.style.display = "none";
        filterPokemonList(query); // Filtert die Pokémon-Liste
    }
}

async function filterPokemonList(query) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000"); // Holt alle Pokémon-Namen
    const data = await response.json();
    const allPokemons = data.results;
    
    const filteredPokemons = allPokemons.filter(pokemon => pokemon.name.includes(query));
    
    displayFilteredPokemons(filteredPokemons);
}

function displayFilteredPokemons(pokemons) {
    const suggestionsContainer = document.getElementById("suggestions");
    suggestionsContainer.innerHTML = "";
    
    if (pokemons.length === 0) return;
    
    pokemons.slice(0, 10).forEach(pokemon => {
        const div = document.createElement("div");
        div.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        div.classList.add("suggestion-item");
        div.onclick = () => {
            document.getElementById("searchInput").value = pokemon.name;
            suggestionsContainer.innerHTML = "";
            searchPokemon();
        };
        suggestionsContainer.appendChild(div);
    });
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