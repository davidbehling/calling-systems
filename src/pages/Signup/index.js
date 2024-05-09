import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"
import { AuthContext } from '../../contexts/auth'
import '../Signin/signin.css'
import logo from '../../assets/logo.png'

export default function SignUp(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signUp, loadingAuth } = useContext(AuthContext)

  async function handleSubmit(e) {
    e.preventDefault()

    if([name, email, password].includes("")) {
      toast.warn("Fill in all fields")
    } else {
      await signUp(email, password, name)
    }
  }

  return(
    <div className='container-center'>
      <div className='login'>
        <div className='login-area'>
          <img src={logo} alt={'calling systems logo'} />
        </div>

        <form onSubmit={handleSubmit}>
          <h1> Register </h1>
          <input
            type="text"
            placeholder='Input your name'
            value={name}
            onChange={ (e) => setName(e.target.value) }
          />

          <input
            type="text"
            placeholder='email@email.com'
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />

          <input
            type="text"
            placeholder='password'
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />

          <button type="submit"> { loadingAuth ? 'Loading...' : 'Register'} </button>
        </form>

        <Link to="/"> Do you have an account? Log in </Link>
      </div>
    </div>
  )
}
