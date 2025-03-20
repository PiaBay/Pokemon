function openPokemonModal(pokemonId) {
    const modal = document.getElementById("modalOverlay");
    if (!modal) {
        console.error("FEHLER: Modal wurde nicht gefunden!");
        return;
    }
    const pokemon = loadedPokemons.find(p => p.id === pokemonId);
    if (!pokemon || !pokemon.sprites) {
        console.error("FEHLER: Pokémon nicht gefunden oder fehlerhafte Daten:", pokemon);
        return;
    }
    
    currentPokemonIndex = loadedPokemons.findIndex(p => p.id === pokemon.id);
    updateModal(pokemon);
    modal.style.display = "flex";
}





function updateModal(pokemon) {
    if (!pokemon || !pokemon.sprites) return; 
    const modal = document.querySelector(".modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalImage = document.getElementById("modalImage");
    const modalId = document.getElementById("modalId");
    const modalDetails = document.getElementById("modalDetails");
    
    if (!modalDetails) {
        console.error("Fehlendes Element: modalDetails");
        return;
    }
    
    modalTitle.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    modalId.textContent = `ID: ${pokemon.id}`;
    modalImage.src = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;
    modalImage.alt = pokemon.name;
    
    const primaryType = pokemon.types[0].type.name;
    modal.style.backgroundColor = typeColors[primaryType] || "#A8A878";
    
    modalDetails.innerHTML = `
    <p>Height: ${pokemon.height}</p>
    <p>Weight: ${pokemon.weight}</p>
    <p>Base Experience: ${pokemon.base_experience}</p>
    `;
}

function navigateModal(direction) {
    currentPokemonIndex += direction;
    if (currentPokemonIndex < 0) currentPokemonIndex = loadedPokemons.length - 1;
    if (currentPokemonIndex >= loadedPokemons.length) currentPokemonIndex = 0;
    updateModal(loadedPokemons[currentPokemonIndex]);
}
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") navigateModal(1);
    if (event.key === "ArrowLeft") navigateModal(-1);
});

function closeModal() {
    document.getElementById("modalOverlay").style.display = "none";
}

