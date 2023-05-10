import { useParams } from 'react-router-dom'
import { Params, Pins } from '../utils/types' 
import { pinDetailQuery } from '../utils/data'
import { useEffect, useState } from 'react';
import { client } from '../client';
import Spinner from './Spinner';
import useToken from '../hooks/useToken';
import LoadedPinDetail from './PinDetail-Loaded';

function PinDetail() {
    const { pinId } = useParams<Params>()
    const { user } = useToken()
    const [ pinDetail, pinDetailSet] = useState<Pins | undefined>()

    useEffect(() => {
        if(pinId) client.fetch(pinDetailQuery(pinId)).then(data => pinDetailSet(data[0]))
    },[pinId])

    if(!pinDetail) return <Spinner message='Showing pin' />

    return <LoadedPinDetail pinDetail={pinDetail} userPic={user.picture} />
}

export default PinDetail