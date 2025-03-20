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
    }
}


async function searchPokemon() {
        const query = document.getElementById("searchInput").value.trim().toLowerCase();
        if (query.length < 3) return;
        toggleSearchUI(true);
        const filteredPokemons = loadedPokemons.filter(pokemon => pokemon.name.includes(query));
        if (filteredPokemons.length === 0) {
            alert("Pokémon not found! Try another name.");
            toggleSearchUI(false);
            return;
        }
        displayFilteredPokemonImages(filteredPokemons);
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
    cardContainer.innerHTML = "";
    if (pokemons.length === 0) return;
    pokemons.forEach(pokemon => renderPokemonCard(pokemon));
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


function resetToHome() {
    document.getElementById("searchInput").value = ""; 
    document.getElementById("cardContainer").innerHTML = ""; 
    loadedPokemons.forEach(pokemon => renderPokemonCard(pokemon));
    const loadMoreButton = document.getElementById("loadMoreButton");
    const closeSearchButton = document.getElementById("closeSearchButton");
    if (loadMoreButton) {
        loadMoreButton.style.display = "block";
    }
    if (closeSearchButton) {
        closeSearchButton.style.display = "none"; 
    }
}