import {Link, NavLink} from 'react-router-dom'
import logo from '../assets/logo.png'
import { RiHomeFill } from 'react-icons/ri';
import {categories} from '../utils/data'
import useToken from '../hooks/useToken';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

function Sidebar() {
    const { user } = useToken()
    return (
        <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
            <div className="flex flex-col">
                <Link
                    to="/"
                    className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
                >
                    <img src={logo} alt="logo" className="w-full" />
                </Link>
                <div className="flex flex-col gap-5">
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                    >
                        <RiHomeFill />
                        Home
                    </NavLink>
                    <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover cateogries</h3>
                    {categories.slice(0, categories.length - 1).map((category) => (
                        <NavLink
                            to={`/category/${category.name}`}
                            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                            key={category.name}
                        >
                            <img src={category.image} className="w-8 h-8 rounded-full shadow-sm" />
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            {user &&
                <Link
                    to='user-profile'
                >
                </Link>
            }
        </div>
    )
}

export default Sidebar