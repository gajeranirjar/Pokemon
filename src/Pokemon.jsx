import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";


export const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const API = "https://pokeapi.co/api/v2/pokemon?limit=750";


    const fetchPokemon = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            const detailedPokemonData = data.results.map(async (cur) => {
                const res = await fetch(cur.url);
                return await res.json();
            })

            const result = await Promise.all(detailedPokemonData)
            setPokemon(result);
            setLoading(false);

        } catch (error) {
            console.error('error :: ', error);
            setLoading(false);
            setError(error);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, [])

    // search functionality

    const searchData = pokemon.filter((cur) => cur.name.toLowerCase().includes(search.toLocaleLowerCase()));

    if (loading) {
        return (<h1> Loading... </h1>) 
    }

    if (error){
        return (<h1> {`Error :: ${error.message}`}</h1>) ;
    } 
        

    return (
        <section className="container">
            <header>
                <h1>Lets Catch Pokemon</h1>
            </header>
            <div className="pokemon-search">
                 <input type="text" placeholder="Search Pokemon" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div>
                <ul className="cards">
                    {searchData.map((cur) => {
                        return <PokemonCards key={cur.id} data={cur} />
                    })}
                </ul>
            </div>
        </section>
    )
}
