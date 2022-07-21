import React, { useEffect } from 'react';
import { pokemonInfosProps } from '../../api/pokemonInterface';
import Icons from '../../utils/importIcons';
import './styles.css'

interface pokemonInformation {
    pokemonInfosProps?:pokemonInfosProps,
    visible:boolean
}

const PokeCard: React.FC<pokemonInformation> = (props) => {
    if (!props.pokemonInfosProps || !props.visible)
        return null
    const {pokemonInformation, pokemonSpecies} = props.pokemonInfosProps;
    const Icon = Icons[`${pokemonInformation.types[0].type.name || "bug"}Icon`]();
    return <>
            <div className={`card ${pokemonSpecies.color.name}`}>
            <header>
                <h1>{pokemonInformation.name.toUpperCase()}</h1>
                <div className="hpGroup">
                    <h3>{pokemonInformation.stats[0].stat.name}: {pokemonInformation.stats[0].base_stat}</h3>
                    {Icon}
                </div>
            </header>
            <main>
                <img src={pokemonInformation.sprites.other['official-artwork'].front_default || ""} alt="" className="mainImage" />    
            </main>
            <footer>
                <div className="types">
                    <div className="type">
                        {Icon}
                    </div>

                    <div className="type">
                        {Icon}
                    </div>

                    <div className="type">
                        {Icon}
                    </div>
                </div>
                <p>{pokemonSpecies.flavor_text_entries[0].flavor_text}</p>
                <div className="Ability">
                    <div className="title">
                        <span>Ability</span>
                    </div>
                    <div className="group">
                    
                    {
                        pokemonInformation.abilities.map((ability,index) => <p key={`${ability.ability.name} - ${index}`}>{ability.ability.name}</p>)
                    }
                   </div> 
                </div>
            </footer>
            <div className="number"><span>{pokemonInformation.id}</span></div>
        </div>
    </>
}

export default PokeCard