import axios, { AxiosInstance } from "axios";
import { pokemonInterface, pokemonListInterface, pokemonSpecie } from "./pokemonInterface";

export interface pokemonInfosProps {
    pokemonInformation:pokemonInterface,
    pokemonSpecies:pokemonSpecie 
}


class pokemon {
    baseUrl: string;
    api: AxiosInstance;
    pokemonIndex: number;
    page: number
    constructor(){
        this.baseUrl = 'https://pokeapi.co/api/v2';
        this.api = axios.create({
            baseURL:this.baseUrl
        });
        this.pokemonIndex = 0;
        this.page = 0
    }
    async getPokemon(id: string | number): Promise<pokemonInfosProps> {
        const pokemon = await this.api.get(`/pokemon/${id}`);
        const pokemonSpecies = await this.api.get(`/pokemon-species/${id}/`);
        return {
            pokemonInformation:pokemon.data,
            pokemonSpecies:pokemonSpecies.data,
        }
    }

    async listPokemon(page: number = 0): Promise<pokemonListInterface>{
        console.log("loading...")
        const pokemon = await this.api.get(`/pokemon?offset=${page*20}&limit=20`)
        console.log(pokemon)
        return pokemon.data
    }
}

export default new pokemon()