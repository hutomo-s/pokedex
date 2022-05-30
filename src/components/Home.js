import React from "react";
import { useState, useEffect, useContext } from 'react';
import Card from "./Card";

import PokemonDataContext from '../contexts/PokedexContext';

function Home() {

  const [ pokedex, setPokedex ] = useContext(PokemonDataContext)

  const [items, setItems] = useState([])

  const loadedPages = pokedex['loadedPages'];

  const [currentPage, setCurrentPage] = useState(1)

  const foundLoadedPages = loadedPages.find(l => l === currentPage);

  const limit = 20

  useEffect(() => {

    if(foundLoadedPages) { 
      setItems(pokedex.homeItems)

    } else {

      const calculateOffset = (currentPage, limit) => {
        return (currentPage - 1) * limit
      }
  
      const offset = calculateOffset(currentPage, limit)
  
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setPokedex((currentContext) => {
  
            // merge arrays
            const homeItems = [...currentContext['homeItems'], ...data.results];
  
            const pokemonData = currentContext['pokemonData'];
  
            const loadedPages = currentContext['loadedPages'].concat([currentPage]);
            
            return {
                pokemonData,
                homeItems,
                loadedPages,
            };
          });
  
          setItems((currentItems) => currentItems.concat(data.results))
        });
    }
  }, [currentPage])

  const loadNextPage = () => {
    setCurrentPage(currentPage => currentPage + 1)
  }

  return (
    <>
      <h1>Welcome to Pokedex Home :)</h1>

      <div className="play-container">
        <div className="rows-lg-4">
          {items.map(item => {
            if(item.url) {
              return (
                <div className="col" key={item.name}>
                  <Card url={item.url} name={item.name} />
                </div>
              )
            }
          })}
        </div>
      </div>

      <div className="play-container text-center">
        <button className="btn-primary" onClick={() => loadNextPage()}>Load More</button>
      </div>

    </>    
  )
}

export default Home;