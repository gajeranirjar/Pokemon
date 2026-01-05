
export const PokemonCards = ({ data }) => {
    const { name, weight, height, base_experience, abilities, types, stats, image } = data;
    return (
        <article className="pokemon-card">
            <figure>
                <img
                    src={image}
                    alt={name}
                    className="pokemon-image"
                    loading="lazy"
                    decoding="async"
                />
            </figure>
            <h1 className="pokemon-name">{name}</h1>
            <div className="pokemon-highlight">
                <p>
                    {types.map((curType) => curType.type.name).join(", ")}
                </p>
            </div>

            <div className="pokemon-info">
                <div>
                    <span> Height:</span> <p>{height}</p>
                </div>
                <div>
                    <span> Weight:</span> <p>{weight}</p>
                </div>
                
                <div>
                    <span> Experience:</span>
                    <p>{base_experience}</p>
                </div>
                <div>
                    <span> speed:</span> <p>{stats[5].base_stat}</p>
                </div>
                <div>
                    <span>Attack:</span>
                    <p>{stats[1].base_stat}</p>
                </div>
                <div>
                    <span> Abilities: </span>
                    <p>
                        {abilities
                            .map((abilityInfo) => abilityInfo.ability.name)
                            .slice(0, 1)
                            .join(", ")}
                    </p>
                </div>
            </div>
        </article>
    )
}
