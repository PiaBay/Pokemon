
/*function renderPokemonCard(pokemon) {
    const cardContainer = document.getElementById("cardContainer");
    const card = document.createElement("div");
    card.classList.add("card");

    // Hintergrundfarbe basierend auf Typ
    const primaryType = pokemon.types[0].type.name;
    card.style.backgroundColor = typeColors[primaryType] || "#A8A878";

    const imageUrl = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;
    card.innerHTML = `
    <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
    <img src="${imageUrl}" alt="${pokemon.name}" onclick="openPokemonModal(this)">
    <p>ID: ${pokemon.id}</p>
`;


    cardContainer.appendChild(card);
}

*/