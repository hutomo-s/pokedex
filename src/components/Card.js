import React from "react";
import { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";

import PokemonDataContext from '../contexts/PokedexContext';

function Card(props) {

  const [pokedex, setPokedex] = useContext(PokemonDataContext)
  const [imgUrl, setImgUrl] = useState('')
  const [name, setName] = useState('')
  const [types, setTypes] = useState([])
  const [pokemonId, setPokemonId] = useState(0)

  const toUppercase = (str) => {
    if (!str)
      return ""

    return str[0].toUpperCase() + str.substring(1)
  }

  useEffect(() => {

    const url = props.url;

    const foundPokemonData = pokedex['pokemonData'].find(e => e.name === props.name);

    if (!foundPokemonData && url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setPokedex((currentContext) => {

            // alternative of currentContext['pokemonData'].concat(data)
            const pokemonData = [...currentContext['pokemonData'], data];

            const homeItems = currentContext['homeItems'];

            const loadedPages = currentContext['loadedPages'];

            return {
              pokemonData,
              homeItems,
              loadedPages
            };
          })
          setImgUrl(data.sprites.other.home.front_default)
          setName(data.name)
          setTypes(data.types)
          setPokemonId(data.order)
        })
    } else {
      setImgUrl(foundPokemonData.sprites.other.home.front_default)
      setName(foundPokemonData.name)
      setTypes(foundPokemonData.types)
      setPokemonId(foundPokemonData.order)
    }

  }, [])

  return (
    <>
      <Link to={`/detail/${props.name}/${pokemonId}`}>
        <img className="img-fluid" src={imgUrl} />
        <h5>{toUppercase(name)}</h5>
        <div>
          {types.map(t => {
            return (
              <span key={t.type.name} className="pill">{toUppercase(t.type.name)}</span>
            )
          })}
        </div>
      </Link>
    </>
  )
}

export default Card;