import { useContext } from "react"
import { Link } from "react-router-dom"
import { FiHome, FiUser, FiSettings } from "react-icons/fi"
import { AuthContext } from "../../contexts/auth"
import avatarImg from "../../assets/avatar.png"
import './header.css'

export default function Header() {
  const { user } = useContext(AuthContext)

  return(
    <div className="sidebar">
      <div>
        <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl } alt="User Photo" />
      </div>

      <Link to="/dashboard">
        <FiHome color="#FFF" size={24} />
        Calls
      </Link>

      <Link to="/customer">
        <FiUser color="#FFF" size={24} />
        Customers
      </Link>

      <Link to="/profile">
        <FiSettings color="#FFF" size={24} />
        Profile
      </Link>
    </div>
  )
}