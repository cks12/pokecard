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
    nextPokemon: () => null,
    loading: false,
  }

export const PokemonContext = createContext<pokemonProvidersInterface>(pokemonContextDefault);
export function  usePokemonContext (): pokemonProvidersInterface{
  const [pokeList, setPokeList] = useState<pokemonListInterface>(defaultPokemonList);
  const [staticInformation, setStaticInformation] = useState<pokemonListInterface> (defaultPokemonList);
  const [indexInfomation, setIndexInformation] = useState<indexInformation>(indexDefault); 
  const [pokemonListInformation, setPokeInformationList] = useState<pokemonInfosProps[]> ([]);
  const [loading, setLoading] = useState(false);
  let counter = 0
  const getPokemonList = useCallback(async() => {
      setLoading(true);
      const _pokeList = await api.listPokemon(indexInfomation.page, 3);
      const _pokeInformationList: Promise<pokemonInfosProps>[] = [];
      _pokeList.results.forEach((item, index) => {
          const _pokemonInformation = api.getPokemon(item.name)
          _pokeInformationList.push(_pokemonInformation);
      });
      Promise.all(_pokeInformationList).then((item) => {
        setLoading(false);
          setPokeInformationList(item.reverse())
        });
      setPokeList(_pokeList);
      const load = _pokeList.results.length;
      setIndexInformation({...indexInfomation,load});
      if(!staticInformation)
        setStaticInformation(_pokeList);
    }, [indexInfomation.page]);
    useEffect(() => {
      getPokemonList()

    }, [indexInfomation.page])
    const nextPokemon = useCallback((sw: string) => {
      console.log(sw)
      if  (sw !== 'right')
        return 0
      if( indexDefault.currentIndex>=0 && indexDefault.currentIndex<=staticInformation.count){
        counter += 1; 
        setIndexInformation({...indexInfomation, currentIndex:counter});
      }
    },[indexInfomation]);

    useEffect(() => {
      if((indexInfomation.currentIndex/indexInfomation.load) >= 1){
        const page = indexInfomation.page+1;
        setIndexInformation({...indexInfomation, page})
      }
    }, [indexInfomation.currentIndex]);
    
    const context = {
      ...pokemonContextDefault, 
      index: indexInfomation, 
      getPokemonList, 
      pokemonListInformation,
      nextPokemon,
      loading,
    }

  return useMemo(() => (context),[indexInfomation, pokeList, pokemonListInformation, ])
}