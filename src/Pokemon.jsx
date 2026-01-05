import { useEffect, useState, useRef, useCallback } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";
import { PokemonSkeleton } from "./PokemonSkeleton";

const LIMIT = 500;
const MAX_CACHE = 1500;

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);


  const observer = useRef(null);

  const slimPokemon = (p) => ({
    id: p.id,
    name: p.name,
    height: p.height,
    weight: p.weight,
    base_experience: p.base_experience,
    abilities: p.abilities,
    types: p.types,
    stats: p.stats,
    image:
      p.sprites.other?.dream_world?.front_default ||
      p.sprites.other?.["official-artwork"]?.front_default ||
      p.sprites.front_default,
  });

  const fetchPokemon = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    setError(false);

    const API = `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${page * LIMIT}`;

    try {
      const res = await fetch(API);
      const data = await res.json();

      if (!data.results.length) {
        setHasMore(false);
        return;
      }

      const detailed = await Promise.all(
        data.results.map(async (p) => {
          const res = await fetch(p.url);
          const fullData = await res.json();
          return slimPokemon(fullData);
        })
      );

      setPokemon((prev) => {
        const map = new Map();
        [...prev, ...detailed].forEach((p) => map.set(p.id, p));

        const merged = Array.from(map.values()).slice(-MAX_CACHE);

        try {
          localStorage.setItem("pokemon-cache", JSON.stringify(merged));
        } catch {
          localStorage.removeItem("pokemon-cache");
        }

        return merged;
      });
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setError(true);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cache = localStorage.getItem("pokemon-cache");
    if (cache) {
      const parsed = JSON.parse(cache);
      setPokemon(parsed);
      setPage(Math.floor(parsed.length / LIMIT));
    } else {
      fetchPokemon();
    }
  }, []);

  useEffect(() => {
    if (page !== 0) fetchPokemon();
  }, [page]);

  const lastPokemonRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const filtered = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="container">
      <header>
        <h1>Lets Catch Pokemon</h1>
      </header>

      <div className="pokemon-search">
        <input
          type="text"
          name="search"
          placeholder="Search Pokemon"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul className="cards">
        {pokemon.length === 0 || loading || error
          ?
          Array.from({ length: 9 }).map((_, i) => (
            <li key={i}>
              <div className="pokemon-card skeleton"></div>
            </li>
          ))
          : filtered.map((curElem, i) => (
            <li ref={i === filtered.length - 1 ? lastPokemonRef : null} key={curElem.id}>
              <PokemonCards data={curElem} />
            </li>
          ))}
      </ul>

      {
        error && !loading && (
          <p style={{ textAlign: "center", margin: "2rem 0", color: "red" }}>
            Something went wrong. Please check your API or connection.
          </p>
        )
      }
    </section>
  );
};

