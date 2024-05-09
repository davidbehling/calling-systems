import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { FiPlusCircle } from "react-icons/fi"
import { toast } from "react-toastify"
import { AuthContext } from "../../contexts/auth"
import { db } from "../../services/firebaseConnection"
import { collection, getDocs, getDoc, doc, query, where, addDoc, updateDoc } from "firebase/firestore"
import Header from "../../components/Header"
import Title from "../../components/Title"
import "./newcall.css"

const listRef = collection(db, "customers")

export default function NewCall() {
  const { user } = useContext(AuthContext)
  const { id } = useParams()

  const navigate = useNavigate()

  const { register, handleSubmit, setValue, formState: { errors} } = useForm({
    defaultValues: {
      status: "Open"
    },
    mode: "onChange"
  })

  const [subjects, setSubjects] = useState(["Support", "Technical visit", "Financial"])
  const [customers, setCustomers] = useState([])
  const [loadCustomer, setLoadCustomer] = useState(true)
  const [editCall, setEditCall] = useState(false)

  useEffect(() => {
    async function loadCustomers() {
      await getDocs(query(listRef, where("userUid", "==", user.uid))).then((snapshot) => {
        let list = []

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            name: doc.data().name
          })
        })

        if(snapshot.docs.size === 0) {
          setCustomers([{id: '1', name: "Freela" }])
          setLoadCustomer(false)
          return
        } 

        setCustomers(list)
        setLoadCustomer(false)

        if(id) {
          loadId(list)
        }
      }).catch((error) => {
        console({error: error, action: 'loadCustomers'})
        setLoadCustomer(false)
        setCustomers([{id: '1', name: "Freela" }])
      })
    }

    loadCustomers()
  }, [id])

  const onSubmit = async (data) => {
    if(editCall) {
      update(data)
      return;
    }

    await addDoc(collection(db, 'calls'), {
      created: new Date(),
      customerName: customers[data.customerIndex].name,
      customerId: customers[data.customerIndex].id,
      subject: data.subject,
      complement: data.complement,
      status: data.status,
      userUid: user.uid
    }).then(() => {
      toast.success("Register Success.")
      resetFilds()
    }).catch((error) => {
      console.log({error: error, action: 'onSubmit'})
    })    
  }

  async function update(data) {
    const docRef = doc(db, "calls", id)
    await updateDoc(docRef, {
      subject: data.subject,
      complement: data.complement,
      status: data.status
    }).then(() => {
      toast.success("Update Success.")
      resetFilds()
      navigate('/dashboard')
    }).catch((error) => {
      console.log({error: error, action: 'update'})
    })
  }

  async function loadId(list) {
    const docRef = doc(db, "calls", id)
    await getDoc(docRef).then((snapshot) => {
      const call = snapshot.data()

      setValue('subject', call.subject)
      setValue('complement', call.complement)
      setValue('status', call.status)

      let customerId = list.findIndex(item => item.id === call.customerId)

      if(customerId !== -1) {
        setValue('customerIndex', customerId)
      } else {
        setValue('customerIndex', 0)
      }

      setEditCall(true)
    }).catch((error) => {
      console.log({error: error, action: 'loadId'})
      setEditCall(false)
    })
  }

  function resetFilds() {
    setValue('customerIndex', 0)
    setValue('subject', subjects[0])
    setValue('complement', '')
    setValue('status', 'Open')
  }

  return (
    <div>
      <Header/>
      <div className="content">
        <Title name={id ? "Edit Ticket" : "Tickets"}>
          <FiPlusCircle size={25}/>
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit(onSubmit)}>
            <label>Clients</label>           
            {
              loadCustomer ? (
                <input type="text" disabled={true} value="Loading..." />
              ) : (
                <select {...register('customerIndex')}>
                  {customers.map((item, index) => {
                    return(<option key={index} value={index}>{item.name}</option>)
                  })}
                </select>
              )
            }           

            <label>Subject</label>
            <select {...register('subject')}>
              {subjects.map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))}
            </select>

            <label>Status</label>
            <div className="status"> 
              <input
                type="radio"
                {...register('status')}
                value="Open"
              />
              <span>Open</span>

              <input
                type="radio"
                {...register('status')}              
                value="Progress"
              />
              <span>Progress</span>

              <input
                type="radio"
                {...register('status')}
                value="Serviced"
              />
              <span>Serviced</span>
            </div>

            <label>Complement</label>
            <textarea
              placeholder="Describe your problem (optional)."
              {...register('complement')}
            />

            <button type="submit"> Register </button>
          </form>
        </div>
      </div>
    </div>
  )
}