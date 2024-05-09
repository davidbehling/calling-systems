import { useState, createContext, useEffect } from "react"
import { auth, db } from "../services/firebaseConnection"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const AuthContext = createContext({})  

function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  const navegate = useNavigate()

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem("@ticketsPRO")

      if (storageUser) {
        setUser(JSON.parse(storageUser))
        setLoading(false)
      }

      setLoading(false)
    }

    loadUser()
  }, [])

  async function signIn(email, password) {
    setLoadingAuth(true)

    await signInWithEmailAndPassword(auth, email, password).then(async (value) => {
      let uid = value.user.uid

      const docRef = doc(db, "users", uid)

      const docSnap = await getDoc(docRef)

      dashboard_access(uid, docSnap.data().name, value, docSnap.data().avatarUrl)
    }).catch((error) => {
      console.log({error: error, action: "login email and password"})
      setLoadingAuth(false)
      toast.error("Ops!!! Something went wrong.")
    })
  }

  async function signUp(email, password, name) {
    setLoadingAuth(true)

    await createUserWithEmailAndPassword(auth, email, password).then(async (value) => {
      let uid = value.user.uid

      await setDoc(doc(db, "users", uid), {
        name: name,
        avatarUrl: null,
      }).then(() => {
        dashboard_access(uid, name, value, null)
      })
    }).catch((error) => {
      console.log({error: error, action: "register email and password"})
      setLoadingAuth(false)
    })
  }

  async function logout() {
    await signOut(auth)
    setUser(null)
    localStorage.removeItem("@ticketsPRO")
  }

  function dashboard_access(uid, name, value, avatarUrl) {
    let data = {
      uid: uid,
      name: name,
      email: value.user.email,
      avatarUrl: avatarUrl
    }

    setUser(data)

    storageUser(data)

    setLoadingAuth(false)

    toast.success("Welcome to the system!")

    navegate("/dashboard")
  }

  function storageUser(data) {
    localStorage.setItem('@ticketsPRO', JSON.stringify(data))
  }

  return(
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        setUser,
        signIn,
        signUp,
        logout,
        loadingAuth,
        loading,
        storageUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider