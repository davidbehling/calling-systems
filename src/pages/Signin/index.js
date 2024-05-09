import { useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"
import { AuthContext } from '../../contexts/auth'
import './signin.css'
import logo from '../../assets/logo.png'

export default function SignIn(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn, loadingAuth } = useContext(AuthContext)

  async function handleSignIn(e) {
    e.preventDefault()

    if([email, password].includes("")) {
      toast.warn("Fill in all fields")
    } else {
      await signIn(email, password)
    }
  }

  return(
    <div className='container-center'>
      <div className='login'>
        <div className='login-area'>
          <img src={logo} alt={'calling systems logo'} />
        </div>

        <form onSubmit={handleSignIn}>
          <h1> Login </h1>
          <input
            type="text"
            placeholder='email@email.com'
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />

          <input
            type="password"
            placeholder='********'
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />

          <button type="submit"> { loadingAuth ? 'Loading...' : 'Access'} </button>
        </form>

        <Link to="/register"> Register </Link>
      </div>
    </div>
  )
}
