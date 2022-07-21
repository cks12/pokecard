import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import './styles.css'
import api from '../../api';
import { defaultPokemonList, indexInformation, pokemonInfosProps, pokemonListInterface, pokemonProvidersInterface } from '../../api/pokemonInterface';
import PokeCard from '../../components/card';
import { FcPrevious, FcNext } from 'react-icons/fc'
import TinderCard from '../../tinderCards';
import { indexDefault, PokemonContext, pokemonContextDefault, usePokemonContext } from '../../api/pokemonInterfaceProvider';
import Deck from '../../components/deck';

const HomePage: React.FC = () => {
    const pokemonContextValue = usePokemonContext();
    return <PokemonContext.Provider value={pokemonContextValue}>
    <main>
        <div className="cardList">
            <Deck/>
        </div>
    </main>
    </PokemonContext.Provider>
}

export default HomePage