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
    const typeButtons = pokemon.types.map(typeInfo => {
        return `<button class="type-button" style="background-color: ${typeColors[typeInfo.type.name] || '#A8A878'}">${typeInfo.type.name.toUpperCase()}</button>`;
    }).join(" ");
    card.innerHTML = `<div>
                <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
                <img src="${imageUrl}" alt="${pokemon.name}">
                <p>ID: ${pokemon.id}</p>
                <div class="type-buttons">${typeButtons}</div>
                </div>
                `;
    card.onclick = () => openPokemonModal(pokemon.id);
    cardContainer.appendChild(card);
}