import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import api from ".";
import { defaultPokemonList, indexInformation, pokemonInfosProps, pokemonListInterface, pokemonProvidersInterface } from "./pokemonInterface";

export const indexDefault = {
  currentIndex:0,
  load:0,
  page:0,
}

export const pokemonContextDefault: pokemonProvidersInterface = {
    pokeList:defaultPokemonList,
    index: indexDefault,
    pokemonListInformation:[],
    getPokemonList: () => null,
    getPokemonListInformation: () => null,
    nextPokemon: () => null
  }

export const PokemonContext = createContext<pokemonProvidersInterface>(pokemonContextDefault);
export function usePokemonContext (): pokemonProvidersInterface{
  const [pokeList, setPokeList] = useState<pokemonListInterface>(defaultPokemonList);
  const [staticInformation, setStaticInformation] = useState<pokemonListInterface> (defaultPokemonList);
  const [indexInfomation, setIndexInformation] = useState<indexInformation>(indexDefault); 
  const [pokemonListInformation, setPokeInformationList] = useState<pokemonInfosProps[]> ([])
  let counter = 0
  const getPokemonList = useCallback(async() => {
      const _pokeList = await api.listPokemon(indexInfomation.page, 3);
      const _pokeInformationList: Promise<pokemonInfosProps>[] = [];
      _pokeList.results.forEach((item, index) => {
          const _pokemonInformation = api.getPokemon(item.name)
          _pokeInformationList.push(_pokemonInformation);
      });
      Promise.all(_pokeInformationList).then((item) => setPokeInformationList(item.reverse()));
      setPokeList(_pokeList);
      const load = _pokeList.results.length;
      setIndexInformation({...indexInfomation,load});
      if(!staticInformation)
        setStaticInformation(_pokeList);
    }, [setPokeList, indexInfomation.page]);

    const nextPokemon = useCallback(() => {
      if( indexDefault.currentIndex>=0 && indexDefault.currentIndex<=staticInformation.count){
        counter = counter+1
        setIndexInformation({...indexInfomation, currentIndex:counter});
      }
    },[indexInfomation])
    useEffect(() => {
      if((indexInfomation.currentIndex/indexInfomation.load) >= 1){
        setIndexInformation({...indexInfomation, page:indexInfomation.page+1})
      }
    }, [indexInfomation.currentIndex])

    useEffect(() => {
      getPokemonList()
    },[indexInfomation.page])

    const context = {
      ...pokemonContextDefault, 
      index: indexInfomation, 
      getPokemonList, 
      pokemonListInformation,
      nextPokemon
    }

  return useMemo(() => (context),[indexInfomation, pokeList, pokemonListInformation, ])
}