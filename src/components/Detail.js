import { useState, useContext, useEffect } from 'react';
import { useParams } from "react-router";

import PokemonDataContext from '../contexts/PokedexContext';

function Detail() {

  const { name, pokemonId } = useParams()

  const [pokedex, setPokedex] = useContext(PokemonDataContext)

  const [imgUrl, setImgUrl] = useState('')

  const [flavorText, setFlavorText] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [types, setTypes] = useState([])
  const [stats, setStats] = useState([])

  const [foundPokemonData, setFoundPokemonData] = useState(pokedex.pokemonData.find(e => e.name === name));

  const toUppercase = (str) => {
    return str[0].toUpperCase() + str.substring(1)
  }

  useEffect(() => {

    if (!foundPokemonData) {

      const detailUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`

      fetch(detailUrl)
        .then(response => response.json())
        .then(data => {
          setPokedex((currentContext) => {

            // alternative of currentContext['pokemonData'].concat(data)
            const pokemonData = [...currentContext['pokemonData'], data];

            const homeItems = currentContext['homeItems'];

            const loadedPages = currentContext['loadedPages']

            return {
              pokemonData,
              homeItems,
              loadedPages,
            };
          })

          setFoundPokemonData(data)
        })

    } else {

      setImgUrl(foundPokemonData.sprites.other.home.front_default)
      setHeight(foundPokemonData.height)
      setWeight(foundPokemonData.weight)
      setTypes(foundPokemonData.types)
      setStats(foundPokemonData.stats)

      const speciesUrl = foundPokemonData.species.url;

      fetch(speciesUrl)
        .then(response => response.json())
        .then(data => {
          setFlavorText(data.flavor_text_entries[0].flavor_text)
        })
    }

  }, [foundPokemonData])

  return (
    <>
      <h1>{toUppercase(name)}</h1>

      <div className="play-container">
        <div className="rows-lg-6">
          <div className="col">
            <img className="img-fluid" src={imgUrl} />
          </div>
          <div className="col">
            <p>{flavorText}</p>

            <div>
              <p>Height: {height}</p>
              <p>Weight: {weight}</p>
            </div>

            <div>
              <p>Type:</p>
              <div>
                {types.map(t => {
                  return (
                    <span key={t.type.name} className="pill-md">{toUppercase(t.type.name)}</span>
                  )
                })}
              </div>
            </div>

            <div>
              <p>Stats</p>
              <ul>
                {stats.map(s => {
                  return (
                    <li key={s.stat.name}>{s.stat.name}: {s.base_stat} </li>
                  )
                })}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Detail;