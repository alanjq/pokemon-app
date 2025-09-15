import { useEffect, useState } from 'react'
import './App.css'
import PokemonList from './components/PokemonList'
import useListPokemon from './hooks/useListPokemon'
import NotFoundImage from "./assets/whosthatpokemon.webp"
import Grid from '@mui/material/Grid'


function App() {
  const { data, error, isLoading } = useListPokemon()

  return (
    <Grid container spacing={3}>

      <h2>{isLoading ? '...please wait...' : ""}</h2>

      {error ? (
        <section>
          <img src={NotFoundImage} />
        </section>
      )
        :
        <PokemonList data={data.results} />
      }
    </Grid>
  )
}

export default App
