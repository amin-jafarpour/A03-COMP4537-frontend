function resolvePokeImgLink(pokeId) {
    let parsedPokeId = undefined;
    if (pokeId < 10) {
        parsedPokeId = "00" + pokeId;
    } else if (pokeId < 100) {
        parsedPokeId = "0" + pokeId;
    } else {
        parsedPokeId = "" + pokeId;
    }
    return `https://github.com/fanzeyi/pokemon.json/raw/master/images/${parsedPokeId}.png`;
}


module.exports = { resolvePokeImgLink };