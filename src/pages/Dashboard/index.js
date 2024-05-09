import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/auth"
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi"
import { db } from "../../services/firebaseConnection"
import { collection, getDocs, getDoc, doc, query, where, addDoc, orderBy, startAfter, limit, QuerySnapshot } from "firebase/firestore"
import { format } from "date-fns"
import Header from "../../components/Header"
import Modal from  "../../components/Modal"
import Title from "../../components/Title"
import "./dashboard.css"

const listRef = collection(db, "calls")

export default function Dashboard(){
  const { logout, user } = useContext(AuthContext)

  const [calls, setCalls] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEmpty, setIsEmpty] = useState(false)
  const [lastCall, setLastCall] = useState()
  const [loadingMore, setLoadingMore] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [detail, setDetail] = useState()

  useEffect(() => {
    async function loadCalls() {
      const query_ = query(listRef, where("userUid", "==", user.uid), orderBy("created", "desc"), limit(5))
      const snapshot = await getDocs(query_)
      setCalls([]) //retirnar depois
      await updateState(snapshot)
      setLoading(false)
    }

    loadCalls()

    return () => {}
  }, [])

  async function updateState(snapshot) {
    let list = []

    if(snapshot.size !== 0) {
      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          created: doc.data().created,
          date: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          customerName: doc.data().customerName,
          customerId: doc.data().customerId,
          subject: doc.data().subject,
          complement: doc.data().complement,
          status: doc.data().status,
          userUid: doc.data().userUid          
        })
      })

      setLastCall(snapshot.docs[snapshot.docs.length - 1])
      setCalls(calls => [...calls, ...list])
    } else {
      setIsEmpty(true)
    }

    setLoadingMore(false)
  }

  async function handleLogout() {
    await logout()
  }

  async function handleMore() {
    setLoadingMore(true)

    const query_ = query(listRef, where("userUid", "==", user.uid), orderBy("created", "desc"), startAfter(lastCall), limit(5))
    const snapshot = await getDocs(query_)

    await updateState(snapshot)
    setLoadingMore(false)
  }

  function toogleModal(item) {
    setShowModal(!showModal)
    setDetail(item)
  }

  if (loading) {
    return(
      <div>
        <Header/>
        <div className="content">
          <Title name={"Tickets"}>
            <FiMessageSquare size={25}/>
          </Title>

          <div className="container dashboard">
              <span> Loading calls.. </span>
          </div>
        </div>
      </div>
    )
  }

  return(
    <div>
      <Header/>
      <div className="content">
        <Title name={"Tickets"}>
          <FiMessageSquare size={25}/>
        </Title>

        <>
          {calls.length === 0 ? (
            <div className="container dashboard">
              <span> Calls Not Found. </span>
              <Link to="/newcall" className="new">
                <FiPlus color="#FFF" size={25} />
                New Call
              </Link>
            </div>
          ) : (
            <>
              <Link to="/newcall" className="new">
                <FiPlus color="#FFF" size={25} />
                New Call
              </Link>

              <table>
                <thead>
                  <tr>
                    <th scope="col">Customer</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Status</th>
                    <th scope="col">Registration Date</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    calls.map((item, index) => {
                      return(
                        <tr key={index}>
                        <td data-label="Customer"> {item.customerName}</td>
                        <td data-label="Subject"> {item.subject}</td>
                        <td data-label="Status"> 
                          <span className={`badge ${item.status.toLowerCase()}`}>
                            {item.status}
                          </span>
                        </td>
                        <td data-label="Register"> {item.date} </td>
                        <td data-label="#">
                          <button className="action" style={{ backgroundColor: '#3583f6'}} onClick={() => toogleModal(item)}>
                            <FiSearch color="#FFF" size={17} />
                          </button>

                          <Link to={`/newcall/${item.id}`} className="action" style={{ backgroundColor: '#f6a935'}}>
                            <FiEdit2 color="#FFF" size={17} />
                          </Link>
                        </td>
                      </tr> 
                      )
                    })
                  }
                </tbody>
              </table>

              {loadingMore && <h3> Search more calls </h3>}
              {!loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}> More calls </button>}
            </>
          )}

          
        </>
      </div>

      {showModal && <Modal item={detail} close={ () => setShowModal(!showModal) } />} 
    </div>
  )
}