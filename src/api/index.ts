import axios, { AxiosInstance } from "axios";
import { pokemonInfosProps, pokemonInterface, pokemonListInterface, pokemonSpecie } from "./pokemonInterface";

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

    async listPokemon(page: number = 0, limit: number = 3): Promise<pokemonListInterface>{
        const pokemon = await this.api.get(`/pokemon?offset=${page*limit}&limit=${limit}`)
        return pokemon.data
    }
}

export default new pokemon()