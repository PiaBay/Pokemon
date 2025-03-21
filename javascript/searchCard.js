function validateSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchWarning = document.getElementById("searchWarning");
    const closeSearchButton = document.getElementById("closeSearchButton");
    const loadMoreButton = document.getElementById("loadMoreButton");
    const query = searchInput.value.trim().toLowerCase();
    document.getElementById("searchButton").disabled = query.length < 3;
    if (query.length === 0) {
        searchWarning.style.display = "none";
        resetToHome();
        return;
    }
    if (query.length < 3) {
        searchWarning.style.display = "block";
        closeSearchButton.style.display = "none";
        loadMoreButton.style.display = "block";
        return;
    }
    searchWarning.style.display = "none";
    closeSearchButton.style.display = "block";
    loadMoreButton.style.display = "none";
    filterLoadedPokemons(query);
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


function filterLoadedPokemons(query) {
    const cardContainer = document.getElementById("cardContainer");
    const filtered = loadedPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(query)
    );
    cardContainer.innerHTML = "";
    if (filtered.length === 0) {
        cardContainer.innerHTML = `<p style="text-align: center; padding: 20px;">Kein Pokémon gefunden.</p>`;
        return;
    }
    filtered.forEach(pokemon => renderPokemonCard(pokemon));
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
