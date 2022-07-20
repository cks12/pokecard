import React, { useEffect, useMemo, useRef, useState } from 'react';
import './styles.css'
import api, { pokemonInfosProps } from '../../api';
import { pokemonInterface, pokemonListInterface } from '../../api/pokemonInterface';
import PokeCard from '../../components/card';
import { FcPrevious, FcNext } from 'react-icons/fc'

const HomePage: React.FC = () => {
    const [pokeList,setPokeList] = useState<pokemonListInterface>({count:0,next:"",previous:"",results:[]});
    const [pokeInformation, setPokeInformation] = useState< pokemonInfosProps[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [load, setLoad] = useState(0)
   
    async function getPokemonList (page:number=0) {
        const pokemonListInformation = await api.listPokemon(page);
        setPokeList(pokemonListInformation)
        console.log(pokemonListInformation);
    }

    async function getPokemonInformation () {
        if(currentIndex>load)
            return;
        const pokeListInformation:Promise<any>[] = []
        for (let i=currentIndex+1; i<currentIndex + 20; i++) {
            const pokemonInformation = api.getPokemon(i)
            pokeListInformation.push(pokemonInformation)
        }
        setLoad(load+20)
        Promise.all(pokeListInformation).then(promise => {
            setPokeInformation([...pokeInformation,...promise])
        })
    }

    function handlePokemonChange(n: number){
        if((currentIndex + n ) <= (pokeList?.count || 0) && (currentIndex+n) >= 0)
            setCurrentIndex(currentIndex + n )
        console.log(pokeList?.count)
    }

    useEffect(() => {
        if(currentIndex<=load)
            getPokemonList(Math.round(load/20))
    },[currentIndex])
    useEffect(() => {
        getPokemonInformation()
        // setCurrentIndex(pokeList?.results.length||0);    
    },[pokeList])
    useEffect(() => {
        getPokemonList()
    },[])
    return <>
    <main>
        <div className="cardList">
            <div className="list">
            {
                pokeInformation.map((item,index) => <PokeCard visible={index==currentIndex} key={index} pokemonInfosProps={item}/>)
            }
            </div>
        <div className="buttons">
            <FcPrevious onClick={() => handlePokemonChange(-1)} className='previous'></FcPrevious>
            <FcNext onClick={() => handlePokemonChange(1)} className='next'></FcNext>
        </div>
        </div>
    </main>
    </>
}

export default HomePage