import { Dispatch, SetStateAction, Suspense, lazy, useEffect, useRef, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import Sidebar from "../components/Sidebar"
import { Link, Route, Routes } from 'react-router-dom';
import logo from '../assets/logo.png'
import { AiFillCloseCircle } from 'react-icons/ai';
import Spinner from '../components/Spinner';
const UserProfile = lazy(() => import('../components/UserProfile')); 
const Pins = lazy(() => import('./Pins'));

const SmallSidebar = ({toggleSidebarSet}:{toggleSidebarSet: Dispatch<SetStateAction<boolean>>}) => (
  <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
    <div className="absolute w-full flex justify-end items-center p-2">
      <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => toggleSidebarSet(false)} />
    </div>
    <Sidebar />
  </div>
)

function Home() {
  const [toggleSidebar, toggleSidebarSet] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if(ref.current !== null) ref.current.scrollTo(0,0) 
  },[])

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => toggleSidebarSet(true)} />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
        </div>
        {toggleSidebar && <SmallSidebar toggleSidebarSet={toggleSidebarSet} />}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={ref}>
        <Routes>
          <Route path="/user-profile/:userId" element={<Suspense fallback={<Spinner message='loading profile' />}><UserProfile /></Suspense>} />
          <Route path='/*' element={<Suspense fallback={<Spinner message='loading pins' />}><Pins /></Suspense>} />
        </Routes>
      </div>
    </div>
  )
}

export default Home