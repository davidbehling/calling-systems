import { FiX } from 'react-icons/fi'
import './modal.css'

export default function Modal({item, close}) {
  return(
    <div className='modal'>
      <div className='container'>
        <button className='close' onClick={ close }>
          <FiX size={25} color='#FFF' />
          Back
        </button>

        <main>
          <h2> Details </h2>
          <div className='row'>
            <span>
              Customer: <i> {item.customerName} </i>
            </span>
          </div>

          <div className='row'>
            <span>
              Subject: <i> {item.subject} </i>
            </span>

            <span>
              Date: <i> {item.date} </i>
            </span>
          </div>

          <div className='row'>
            <span>
              Status: <i className={`status-badge ${item.status.toLowerCase()}`}> {item.status} </i>
            </span>
          </div>

          {item.complement !== '' && (
            <>
              <h3> Complement </h3>
              <p>
                {item.complement}
              </p>
            </>
          )}          
        </main>
      </div>
    </div>
  )
}
