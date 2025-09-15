import Grid from "@mui/material/Grid"
import PokemonCard from "./PokemonCard"

export default function PokemonList({ data }) {
    if (!data || !Array.isArray(data)) {
        return null
    }

    return (
        <section>
            <h1>Pokemon</h1>

            <Grid container spacing={3}>
                {data.map((props, k) => <PokemonCard key={k} {...props} />)}
            </Grid>
        </section>
    )
}

