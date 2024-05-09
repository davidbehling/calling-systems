import { useContext, useState } from "react"
import { FiSettings, FiUpload } from "react-icons/fi"
import { toast } from "react-toastify"
import { AuthContext } from "../../contexts/auth"
import { db, storage } from "../../services/firebaseConnection"
import { doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import Header from "../../components/Header"
import Title from "../../components/Title"
import avatarImg from "../../assets/avatar.png"
import "./profile.css"

export default function Profile() {
  const { user, setUser, logout, storageUser } = useContext(AuthContext)

  const [name, setName] = useState(user && user.name)
  const [email, setEmail] = useState(user && user.email)
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
  const [avatarImage, setAvatarImage] = useState(null)

  function handleFile(e) {
    e.preventDefault()

    if (e.target.files[0]) {
      const image = e.target.files[0]

      if (["image/jpeg", "image/png"].includes(image.type)) {
        setAvatarImage(image)
        setAvatarUrl(URL.createObjectURL(image))
      } else {
        toast.warn("File type not allowed")
        setAvatarImage(null)
        return
      }
    }
  }

  async function handleUplaod() {
    const uploadRef = ref(storage, `images/${user.uid}/${avatarImage.name}`)

    const uploadTask = uploadBytes(uploadRef, avatarImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (downloadUrl) => {
        const docRef = doc(db, "users", user.uid)

        await updateDoc(docRef, {
          avatarUrl: downloadUrl,
          name: name
        }).then(() => {
          let data = {
            ...user,
            name: name,
            avatarUrl: downloadUrl
          }

          setUser(data)
          storageUser(data)
          toast.success("Profile updated successfully")
        })
      })
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (avatarImage === null && name !== '') {
      const docRef = doc(db, "users", user.uid)

      await updateDoc(docRef, {
        name: name
      }).then(() => {
        let data = {
          ...user,
          name: name
        }

        setUser(data)
        storageUser(data)
        toast.success("Name updated successfully")
      })
    } else if (name !== '' && avatarImage !== null) {
      handleUplaod()
    }
  }

  return(
    <div>
      <Header/>
      <div className="content">
        <Title name={"Profile"}>
          <FiSettings size={25}/>
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload color="FFF" size={25} />
              </span>

              <input type="file" accept="image/*" onChange={handleFile} /> <br/>

              <img src={avatarUrl === null ? avatarImg : avatarUrl } alt="Profile Photo" width={250} height={250} />
            </label>

            <label> Name </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

            <label> Email </label>
            <input type="text" value={email} disabled={true} />

            <button type="submit"> Save </button>
          </form>
        </div>

        <div className="container">
          <button className="logout-btn" onClick={() => logout() }> Logout </button>
        </div>
      </div>
    </div>
  )
}