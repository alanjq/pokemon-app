import { useEffect, useState } from "react";

export default function usePokemonInfo(name) {
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:3000/pokemon/${name}`, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data=>{
                console.log('pokemon info', data)
                setData(data)
            }))
            .catch(setError)
            .finally(()=>setIsLoading(false))
    }, [])

    return { data, error, isLoading }
}
