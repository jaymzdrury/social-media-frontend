import { googleLogout } from "@react-oauth/google"
import { UserProfile } from "../utils/types"
import { useNavigate } from "react-router-dom"
import { AiOutlineLogout } from "react-icons/ai"
import { ReactNode } from "react";
import useLoader from "../hooks/useLoader";
import Spinner from "./Spinner";

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

function UserProfileLoaded({userProfile, user, changeText, children}:{userProfile: UserProfile, user: {name: string, picture: string}, changeText: (target: HTMLButtonElement) => void, children: ReactNode}) {

    const {loading, imgSrc} = useLoader("https://source.unsplash.com/1600x900/?nature,photography,technology", 'string')
    const navigate = useNavigate()
    const logout = () => {
        googleLogout()
        localStorage.clear()
        navigate('/login')
    }

    return (
        !loading ? <div className="relative pb-2 h-full justify-center items-center">
            <div className="flex flex-col pb-5">
                <div className="relative flex flex-col mb-7">
                    <div className="flex flex-col justify-center items-center">
                        <img
                            className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
                            src={imgSrc}
                            alt="user-pic"
                        />
                        <img alt={userProfile.profile.userName.length ? userProfile.profile.userName : user.name} src={userProfile.profile.image.length ? userProfile.profile.image : user.picture} className="rounded-full w-20 h-20 -mt-10 shadow-xl bg-rose-100 object-cover" />
                    </div>
                </div>
                <h1 className="font-bold text-3xl text-center mt-3">{userProfile.profile.userName.length ? userProfile.profile.userName : user.name}</h1>
                <div className="absolute top-0 z-1 right-0 p-2">
                    <button 
                        type="button"
                        className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                        onClick={logout}
                    >
                        <AiOutlineLogout color='red' fontSize={21} />
                    </button>
                </div>
            </div>
            <div className="text-center mb-7">
                <button
                    type="button"
                    onClick={(e) => changeText(e.target as HTMLButtonElement)}
                    className={userProfile.text === 'Created' ? activeBtnStyles : notActiveBtnStyles}
                >
                    Created
                </button>
                <button
                    type="button"
                    onClick={(e) => changeText(e.target as HTMLButtonElement)}
                    className={userProfile.text === 'Saved' ? activeBtnStyles : notActiveBtnStyles}
                >
                    Saved
                </button>
            </div>
            <div className='px-2'>{children}</div>
        </div> : <Spinner message="loading image" />
    )
}

export default UserProfileLoaded