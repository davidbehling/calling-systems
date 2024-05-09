import { useContext, useRef } from "react"
import { FiUser } from "react-icons/fi"
import { toast } from "react-toastify"
import { db } from "../../services/firebaseConnection"
import { addDoc, collection } from "firebase/firestore"
import { AuthContext } from "../../contexts/auth"
import Header from "../../components/Header"
import Title from "../../components/Title"

export default function Customer() {
  const { user } = useContext(AuthContext)

  const nameRef = useRef(null)
  const cnpjRef = useRef(null)
  const addressRef = useRef(null)

  async function handleRegister(e) {
    e.preventDefault()

    if([nameRef.current?.value, cnpjRef.current?.value, addressRef.current?.value].includes("")) {
      toast.warn("Fill in all fields.")
    } else {
      await addDoc(collection(db, "customers"), {
        name: nameRef.current?.value,
        cnpj: cnpjRef.current?.value,
        address: addressRef.current?.value,
        userUid: user.uid
      }).then(() => {
        nameRef.current.value = null
        cnpjRef.current.value = null
        addressRef.current.value = null
  
        toast.success("Register Success.")
      }).catch((error) => {
        console.log({error: error, action: 'Register Customer'})
        toast.error("Error register.")
      })
    }
  }

  return(
    <div>
      <Header/>
      <div className="content">
        <Title name={"Customer"}>
          <FiUser size={25}/>
        </Title>
        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label> Customer Name </label>
            <input
              type="text"
              placeholder="Name Customer"
              ref={nameRef}
            />

            <label> CNPJ </label>
            <input
              type="text"
              placeholder="CNPJ"
              ref={cnpjRef}
            />

            <label> Address </label>
            <input
              type="text"
              placeholder="Address"
              ref={addressRef}
            />

            <button type="submit"> Save </button>
          </form>
        </div>
      </div>
    </div>
  )
}