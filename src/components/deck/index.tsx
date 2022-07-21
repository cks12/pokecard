import React, { useContext, useEffect, useMemo } from "react";
import { PokemonContext } from "../../api/pokemonInterfaceProvider";
import TinderCard from "../../tinderCards";
import PokeCard from "../card";

const Deck: React.FC = () => {
    const { pokemonListInformation, getPokemonList,nextPokemon } = useContext(PokemonContext)

    useEffect(() => {
        getPokemonList()
    },[])

    return useMemo( () => <>
    {
        pokemonListInformation.map((item,index) => <><TinderCard 
        key={item.pokemonInformation.name} 
        preventSwipe={["top","bottom","left","rigth"]} 
        className='swipe'
        onSwipe={nextPokemon}
        >
        <PokeCard visible={true} pokemonInfosProps={item}/>
        </TinderCard>
        </>)
    }
    <PokeCard visible={true} ></PokeCard>
    </>, [pokemonListInformation])
}

export default Deck