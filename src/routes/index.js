import { Routes, Route } from 'react-router-dom'
import SignIn from '../pages/Signin'
import SignUp from '../pages/Signup'
import Customer from '../pages/Customer'
import Dashboard from '../pages/Dashboard'
import NewCall from '../pages/NewCall'
import Profile from '../pages/Profile'
import Private from './Private'

function RoutesApp(){
  return(
    <Routes>
      <Route path="/" element={ <SignIn/> } />
      <Route path="/register" element={ <SignUp/> } />
      <Route path="/customer" element={ <Private> <Customer/> </Private> } />
      <Route path="/dashboard" element={ <Private> <Dashboard/> </Private> } />
      <Route path="/newcall" element={ <Private> <NewCall/> </Private> } />
      <Route path="/newcall/:id" element={ <Private> <NewCall/> </Private> } />
      <Route path="/profile" element={ <Private> <Profile/> </Private> } />
    </Routes>
  )
}

export default RoutesApp