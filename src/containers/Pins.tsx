import { Suspense, lazy, useState } from 'react'
import Navbar from '../components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Spinner from '../components/Spinner'

const Feed = lazy(() => import('../components/Feed'))
const PinDetail = lazy(() => import('../components/PinDetail'))
const CreatePin = lazy(() => import('../components/CreatePin'))
const Search = lazy(() => import('../components/Search'))

function Pins() {
  const [searchTerm, searchTermSet] = useState('')

  return (
    <div className="px-2 md:px-5">
        <div className="bg-gray-50">
          <Navbar searchTerm={searchTerm} searchTermSet={searchTermSet} />
        </div>
        <div className="h-full">
          <Routes>
            <Route path='/' element={<Suspense fallback={<Spinner message='loading feed' />}><Feed /></Suspense>} />
            <Route path='/category/:categoryId' element={<Suspense fallback={<Spinner message='loading category' />}><Feed /></Suspense>} />
            <Route path='/pin-detail/:pinId' element={<Suspense fallback={<Spinner message='loading pin' />}><PinDetail /></Suspense>} />
            <Route path='/create-pin' element={<Suspense fallback={<Spinner message='loading create page' />}><CreatePin /></Suspense>} />
            <Route path='/search' element={<Suspense fallback={<Spinner message='loading results' />}><Search searchTerm={searchTerm} /></Suspense>} />
          </Routes>
        </div>
    </div>
  )
}

export default Pins