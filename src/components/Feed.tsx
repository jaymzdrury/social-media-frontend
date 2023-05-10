import {useParams} from 'react-router-dom'
import MasonryLayout from "./MasonryLayout"
import { useEffect, useState } from 'react'
import Spinner from './Spinner'

import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'

function Feed() {
  const [pins, pinsSet] = useState([])
  const [loading, loadingSet] = useState(true)
  const {categoryId} = useParams()

  useEffect(() => {
    if(categoryId){
      client.fetch(searchQuery(categoryId)).then(data => pinsSet(data))
    } else {
      client.fetch(feedQuery).then(data => pinsSet(data))
    }
    loadingSet(false)
  },[categoryId])

  if(loading) return <Spinner message={`We are adding ${categoryId ?? 'new'} ideas to your feed`} />
  
  return (
    <div>
      <MasonryLayout pins={pins} />
    </div>
  )
}

export default Feed