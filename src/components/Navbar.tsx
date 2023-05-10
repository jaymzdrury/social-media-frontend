import { Dispatch, SetStateAction } from 'react';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../hooks/useToken';

function Navbar({ searchTerm, searchTermSet }: {searchTerm: string, searchTermSet: Dispatch<SetStateAction<string>>}) {
    const navigate = useNavigate()
    const { user } = useToken()

    return (
        <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
            <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
                <IoMdSearch fontSize={21} className="ml-1" />
                <input
                    type="text"
                    onChange={e => searchTermSet(e.target.value)}
                    placeholder="Search"
                    value={searchTerm}
                    onFocus={() => navigate('/search')}
                    className="p-2 w-full bg-white outline-none"
                />
            </div>
            <div className="flex gap-3 ">
                {user && <Link to='/user-profile/me' className="hidden md:block">
                    <img src={user.picture} alt='profile' className='w-14 h-12 rounded-lg object-cover bg-rose-100' />
                </Link>}
                <Link to='/create-pin' className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
                    <IoMdAdd />
                </Link>
            </div>
        </div>
    )
}

export default Navbar