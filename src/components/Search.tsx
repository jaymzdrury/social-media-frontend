import { useEffect, useState } from 'react'
import MasonryLayout from './MasonryLayout'
import { data, feedQuery, searchQuery } from '../utils/data'
import { client} from '../client'
import Spinner from './Spinner'

function Search({searchTerm}:{searchTerm: string}) {
    const [pins, pinsSet] = useState([])
    const [loading, loadingSet] = useState(true)

    useEffect(() => {
        if (searchTerm !== ''){
            const query = searchQuery(searchTerm.toLowerCase())
            client.fetch(query).then(data => pinsSet(data))
        } else {
            client.fetch(feedQuery).then(data => pinsSet(data))
        }
        loadingSet(false)
    },[searchTerm])

    if(loading) return <Spinner message='Searching pins' />
    
    return (
        <div>
            {pins.length ? <MasonryLayout pins={pins} /> : <div className='mt-10 text-center text-xl'>No Pins Found!</div>}
        </div>
    )
}

export default Search