import React from 'react'

const SparePartRequests = () => {
  return (
    <div className='spare-part-req'>
      <div className='spare-part-req-card-container'>
        <div className='spare-part-req-card'>
          <div className='spare-part-req-card-col1 spare-part-colums'>
            <h5 style={{fontWeight:'400'}}>22/04/2024</h5>
          </div>
          <div className='spare-part-req-card-col2 spare-part-colums'>
            <div className='spare-part-req-col2-head'>
              <h5>Spare Part Name</h5>
            </div>
            <div className='spare-part-req-col2-text-table'>
              <div className='spare-part-text-table-row'>
                <div className='spare-part-text-table-row-left'>
                  <p>Spare Part Id :</p>
                </div>
                <div className='spare-part-text-table-row-right'>
                  <p>Spare Part Id</p>
                </div>
              </div>
              <div className='spare-part-text-table-row'>
                <div className='spare-part-text-table-row-left'>
                  <p>Quantity:</p>
                </div>
                <div className='spare-part-text-table-row-right'>
                  <p>Quantityhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
                </div>
              </div>
              <div className='spare-part-text-table-row'>
                <div className='spare-part-text-table-row-left'>
                  <p>Required:</p>
                </div>
                <div className='spare-part-text-table-row-right'>
                  <p>Type</p>
                </div>
              </div>
            </div>
          </div>
          <div className='spare-part-req-card-col3 spare-part-colums'>
            <h5>Description</h5>
            <textarea disabled>optional</textarea>
          </div>
          <div className='spare-part-req-card-col4 spare-part-colums'>
            <h5>Request Type</h5>
            <div className='spare-part-req-type'>
              <p>Special</p>
            </div>
          </div>
          <div className='spare-part-req-card-col5 spare-part-colums'>
            <div className='spare-part-buttons'>
            <button>Approve</button>
            <button>Deny</button>
            </div>
            
          </div>

        </div>
      </div>
    </div>
  )
}

export default SparePartRequests