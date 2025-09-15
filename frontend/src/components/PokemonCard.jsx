import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import NotFoundImage from "../assets/whosthatpokemon.webp";
import usePokemonInfo from '../hooks/usePokemonInfo';
import StyledBreadcrumb from './StyledBreadCrumb';


export default function PokemonCard({ name }) {
    const { data, error, isLoading } = usePokemonInfo(name)

    const [types, setTypes] = React.useState([])
    const [image, setImage] = React.useState(NotFoundImage)

    React.useEffect(() => {
        if (!error && !isLoading) {
            if (data.sprites.front_shiny) {
                setImage(data.sprites.front_shiny)
            }

            let typeList = []
            data.types.map(t => {
                typeList.push(t.type.name)
            })
            console.log(typeList)
            setTypes(typeList)
        }
    }, [data])

    return <Grid size={4}>
        {isLoading ? 'loading...' :
            <Card>
                <CardMedia
                    sx={{ height: 140 }}
                    image={image}
                    title={name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {types.map((t) => <StyledBreadcrumb component="a" href="#" label={t} />)}
                    </Typography>
                </CardContent>
            </Card>
        }
    </Grid>
}
