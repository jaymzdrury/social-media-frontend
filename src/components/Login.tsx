import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import jwtDecode from 'jwt-decode';
import {useNavigate} from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const responseGoogle = (res: CredentialResponse) => {
    const decoded = jwtDecode(res.credential ?? '')
    localStorage.setItem('user', JSON.stringify(decoded))
    navigate('/')
  }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin onSuccess={(res) => responseGoogle(res)} onError={() => console.log('log in error')} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login