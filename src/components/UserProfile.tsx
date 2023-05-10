import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom'
import MasonryLayout from './MasonryLayout';
import useToken from '../hooks/useToken';
import Spinner from './Spinner';

import {client} from '../client'
import {userQuery, userCreatedPinsQuery, userSavedPinsQuery} from '../utils/data'
import {UserProfile as UserProfileType} from '../utils/types'
import UserProfileLoaded from './UserProfile-Loaded';

function UserProfile() {
    const [userProfile, updateUserProfile] = useReducer(
        (data: UserProfileType, partialData: Partial<UserProfileType>) => ({
            ...data,
            ...partialData
        }),
        {pins: [], profile: {image: '', userName: ''}, text: 'Created'}
    )

    const { user } = useToken()
    const { userId } = useParams()

    useEffect(() => {
        if(userId !== 'me' && userId !== undefined){
            client.fetch(userQuery(userId)).then(data => updateUserProfile({profile: data[0]}))
            userProfile.text === 'Created' ? client.fetch(userCreatedPinsQuery(userId)).then(data => updateUserProfile({pins: data})) : client.fetch(userSavedPinsQuery(userId)).then(data => updateUserProfile({pins: data}))
        }
    },[userId, userProfile.text])

    const changeText = (target: EventTarget) => {
        if(target instanceof HTMLElement) updateUserProfile({ text: target.innerText })
    }

    if(!userProfile.profile.userName.length && !user) return <Spinner message='Loading profile' /> 

    return (
        <UserProfileLoaded userProfile={userProfile} user={user} changeText={changeText}>
            <MasonryLayout pins={userProfile.pins} />
        </UserProfileLoaded>
    )
}

export default UserProfile