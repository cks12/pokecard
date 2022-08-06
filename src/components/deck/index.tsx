import React, { useContext, useMemo } from "react";
import { PokemonContext } from "../../api/pokemonInterfaceProvider";
import TinderCard from "../../tinderCards";
import PokeCard from "../card";
import Loading from "../loadingDefault";

const Deck: React.FC = () => {
    const { pokemonListInformation, nextPokemon, loading } = useContext(PokemonContext)

    return useMemo( () => !loading ?<>
    {
        pokemonListInformation.map(( item ) => <><TinderCard 
        key={item.pokemonInformation.name} 
        preventSwipe={["left","up","down"]} 
        className='swipe'
        onSwipe={nextPokemon}
        >
        <PokeCard visible={true} pokemonInfosProps={item}/>
        </TinderCard>
        </>)
    }</>:<Loading/>, [pokemonListInformation, loading])
}

export default Deck