const express = require('express');
const axios = require('axios')
const app = express();
const PORT = 3000;
const cors = require('cors')


const pokeApi = (name = '', offset = 10, limit = 15) => {
    if (name == '') {
        return `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    }
    return `https://pokeapi.co/api/v2/pokemon/${name}`;
}


app.use(cors({ origin: 'http://localhost:5173' }))


app.get('/', (req, res) => {
    res.send('<h1>Hello, there!</h1><p>Server is running (for now).</p>');
});



async function getPokemonList(req, res) {
    try {
        let apiUrl = pokeApi(req.params['name'], req.query.offset, req.query.limit)
        const response = await axios.get(apiUrl)
        res.json(response.data)
    } catch (error) {
        console.error('Error getting Poke API data: ', error.message)
        res.status(500).json({ error: "Poke API has failed on request." })
    }
}


async function getPokemonInfo(name, after) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        console.log('GET POKEMON response', response)
        after(response)
        return JSON.parse(response)

    } catch (error) {

    }
}


app.get('/pokemon', getPokemonList)
app.get('/pokemon/:name', getPokemonList)


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
