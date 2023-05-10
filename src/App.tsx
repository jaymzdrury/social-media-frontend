import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Suspense, lazy } from 'react';
import Spinner from './components/Spinner';
const Login = lazy(() => import('./components/Login')); 
const Home = lazy(() => import('./containers/Home'))

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID ?? ''}>
        <Routes>
          <Route path='login' element={<Suspense fallback={<div className='mt-20'><Spinner message='loading login page' /></div>}><Login /></Suspense>} />
          <Route path='/*' element={<Suspense fallback={<div className='mt-20'><Spinner message='loading main page' /></div>}><Home /></Suspense>} />
        </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
