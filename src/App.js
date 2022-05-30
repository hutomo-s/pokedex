import './App.scss';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Detail from './components/Detail';

import PokemonDataContext from './contexts/PokedexContext';

function App() {

  let pokedexDefault = {
    'homeItems': [],
    'pokemonData': [],
    'loadedPages': []
  }

  const [pokedex, setPokedex] = useState(pokedexDefault);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <header>
          <div className="container">
            <NavLink className="logo" to="/">
              Pokedex
            </NavLink>
            <nav>
              <ul>
                <li>
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <div className="container">
          <PokemonDataContext.Provider value={[pokedex, setPokedex]}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detail/:name/:pokemonId" element={<Detail />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </PokemonDataContext.Provider>
        </div>
      </div>
    </Router>
  );
}

export default App;
