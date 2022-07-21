interface versionBase {
    name: string,
    url: string,
}

export interface abilitie {
    ability: versionBase,
    is_hidden: boolean,
    slot: number
}

export interface forms {
    name: string,
    url: string,
}

export interface game_indices {
    game_index: number,

}

export interface version_details {
    rarity: number,
    version:versionBase,
}

export interface held_items {
    item: {
        name: string,
        url: string
      }
      version_details: version_details[]
}

export interface sprites {
    back_default: null | string,
    back_female: null | string,
    back_shiny: null | string,
    back_shiny_female: null | string,
    front_default: null | string,
    front_female: null | string,
    front_shiny: null | string,
    other: {
      dream_world: {
        front_default: null | string,
        front_female: null | string,
      },
      home: {
        front_default: null | string,
        front_female: null | string,
        front_shiny: null | string,
        front_shiny_female: null | string,
      },
      'official-artwork': {
        front_default: null | string,
      }
    },
}

export interface stats {
    base_stat: number,
    effort: number,
    stat: versionBase
}

export interface types {
    "slot": number,
    "type": versionBase
}

export interface pokemonInterface {
    abilities: abilitie[],
    base_experience: number,
    forms:forms[],
    game_indices: game_indices[],
    height: number,
    held_items: held_items[],
    id: number,
    is_default: boolean,
    location_area_encounters:string,
    name: string,
    order: number,
    species: versionBase,
    sprites:sprites,
    stats: stats[],
    types: types[]
}

export interface pokemonListInterface {
    count: number,
    next: null | string,
    previous: null | string,
    results:versionBase[]
}


export interface flavor_text_entries {
    "flavor_text": string
    "language": versionBase
}

export interface pokemonSpecie {
    "base_happiness": number,
    "capture_rate": number,
    "color": versionBase,
    "egg_groups": versionBase[],
    "evolution_chain": {
        "url": string
    },
    "evolves_from_species": null,
    "flavor_text_entries": flavor_text_entries[] 
}

export const defaultPokemonList = {
    count:0,
    next:"",
    previous:"",
    results:[]
}

export interface indexInformation {
    currentIndex: number,
    load: number,
    page: number,
}

export interface pokemonProvidersInterface {
    pokeList: pokemonListInterface
    pokemonListInformation: pokemonInfosProps[],
    index: indexInformation,
    getPokemonList: () => void,
    getPokemonListInformation: () => void,
    nextPokemon: () => void
}

export interface pokemonInfosProps {
    pokemonInformation:pokemonInterface,
    pokemonSpecies:pokemonSpecie 
}