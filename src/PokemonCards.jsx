
export const PokemonCards = ({ data }) => {
    const { name, weight, height, base_experience, abilities , types} = data;
    return (
        <li className="pokemon-card">
            <figure>
                <img
                    src={data.sprites.other.dream_world.front_default}
                    alt={name}
                    className="pokemon-image"
                />
            </figure>
            <h1 className="pokemon-name">{name}</h1>
            <div className="pokemon-info pokemon-highlight">
                <p>
                    {types.map((curType) => curType.type.name).join(", ")}
                </p>
            </div>

            <div className="grid-three-cols">
                <p className="pokemon-info">
                    <span> Height:</span> {height}
                </p>
                <p className="pokemon-info">
                    <span> Weight:</span> {weight}
                </p>
                <p className="pokemon-info">
                    <span> speed:</span> {data.stats[5].base_stat}
                </p>
            </div>

            <div className="grid-three-cols">
                <div className="pokemon-info">
                    <p>{base_experience}</p>
                    <span> Experience:</span>
                </div>
                <div className="pokemon-info">
                    <p>{data.stats[1].base_stat}</p>
                    <span>Attack:</span>
                </div>
                <div className="pokemon-info">
                    <p>
                        {abilities
                            .map((abilityInfo) => abilityInfo.ability.name)
                            .slice(0, 1)
                            .join(", ")}
                    </p>
                    <span> Abilities: </span>
                </div>
            </div>
        </li>
    )
}
