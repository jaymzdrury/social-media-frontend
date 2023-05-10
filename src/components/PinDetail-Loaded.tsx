import { MdDownloadForOffline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Pins } from '../utils/types'
import Spinner from './Spinner'
import useLoader from '../hooks/useLoader'

function LoadedPinDetail({pinDetail, userPic}:{pinDetail: Pins, userPic: string}){
    const {loading, imgSrc} = useLoader(pinDetail.image, 'sanity')

    return (
        !loading 
        ?         
        <div className="flex xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
            <div className="flex justify-center items-center md:items-start flex-initial">
                <img
                    className="rounded-t-3xl rounded-b-lg"
                    src={imgSrc}
                    alt="user-post"
                />
            </div>
            <div className="w-full p-5 flex-1 xl:min-w-620">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                        <a
                            href={`${pinDetail.image.asset.url}?dl=`}
                            download
                            className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                        >
                            <MdDownloadForOffline />
                        </a>
                    </div>
                    <a href={pinDetail.destination} target='_blank' rel='noreferrer'>
                        {pinDetail.destination.slice(0,27)}
                    </a>
                </div>
                <div>
                    <h1 className='text-4xl font-bold break-words mt-3'>{pinDetail.title}</h1>
                    <p className='mt-3'>{pinDetail.about}</p>
                </div>
                <Link to={`/user-profile/${pinDetail.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg">
                    <img src={pinDetail.postedBy.image} className="w-10 h-10 rounded-full object-cover" alt="user-profile" />
                    <p className="font-bold">{pinDetail.postedBy.userName}</p>
                </Link>
                <h2 className="mt-5 text-2xl">Comments</h2>
                {pinDetail.comments && <div className="max-h-370 overflow-y-auto">
                    {pinDetail.comments.map((comment, i) => (
                        <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={i}>
                            <img 
                                src={comment.postedBy.image}
                                className='w-10 h-10 rounded-full cursor-pointer object-cover'
                                alt='user-profile'
                            />
                            <div className="flex flex-col">
                                <p className='font-bold'>{comment.postedBy.userName}</p>
                                <p>{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>} 
                <div className="flex flex-wrap mt-6 gap-3">
                    <Link to='/user-profile/me'>
                        <img src={userPic} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
                    </Link>
                    <input
                        className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                        type="text"
                        placeholder="Add a comment"
                    />
                    <button
                        type="button"
                        className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                    >
                        Done
                    </button>
                </div> 
            </div>
        </div> 
        : 
        <Spinner message='loading image' />
    )
}

export default LoadedPinDetail