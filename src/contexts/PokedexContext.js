import React from 'react'

let pokedex = {
  'homeItems': [],
  'pokemonData': [],
  'loadedPages': []
}

const PokedexContext = React.createContext(pokedex);

export default PokedexContext;