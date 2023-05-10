import {Dispatch, ReactNode, SetStateAction} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useLoader from '../hooks/useLoader'

function LoadedPin({
    src, 
    alt, 
    hovered, 
    hoveredSet,
    postedId,
    id,
    userName,
    profile,
    children}
:{
    src: string, 
    alt: string,
    hovered: boolean,
    hoveredSet: Dispatch<SetStateAction<boolean>>,
    postedId: string,
    id: string,
    userName: string,
    profile: string,
    children: ReactNode
}){
    const {loading, imgSrc} = useLoader(src, 'string')
    const navigate = useNavigate()

    return (
        !loading 
        ? 
        <div className="m-2">
            <div onMouseEnter={() => hoveredSet(true)} onMouseLeave={() => hoveredSet(false)} onClick={() => navigate(`/pin-detail/${id}`)} className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out">
                <img src={imgSrc} alt={alt} className='rounded-lg w-full bg-rose-100'  />
                {hovered && children}
            </div>
            <Link to={`/user-profile/${postedId}`} className="flex gap-2 mt-2 items-center">
                <img className="w-8 h-8 rounded-full bg-rose-100 object-cover" alt={userName} src={profile} />
                <p className="font-semibold capitalize">{userName}</p>
            </Link>
        </div> 
        : <span />
    )
}

export default LoadedPin