import { useEffect, useState } from "react";
import "./Pokemon.css";
import { PokemonCards } from "./PokemonCard";

export const Pokemon = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")

    const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

    const fetchPokemon = async () => {
        try {
            const res = await fetch(API)
            const data = await res.json();
            // console.log(data);

            const detailedPokemonData = data.results.map(async (curElem) => {
                const res = await fetch(curElem.url)
                const data = await res.json();
                // console.log(data);
                return data;

            })

            const detailedResponses = await Promise.all(detailedPokemonData)
            setPokemon(detailedResponses)
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(error)

        }

    }

    useEffect(() => {
        fetchPokemon();
    }, [])



    //search

    const searchData = pokemon.filter((curPokemon) =>
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    if (error) {
        return (
            <div>
                <h1>Error: {error.message}</h1>
            </div>
        )
    }

    if (loading) {

        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    return (
        <>
            <section className="container">
                <header>
                    <h1>Lets Catch Pokemon</h1>
                </header>

                <div className="pokemon-search">
                    <input type="text" placeholder="search Pokemon" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <div>
                    <ul className="cards">
                        {
                            searchData.map((curElem) => {
                                return <PokemonCards key={curElem.id} pokemonData={curElem} />
                            })
                        }

                    </ul>
                </div>
            </section>
        </>
    )
}
