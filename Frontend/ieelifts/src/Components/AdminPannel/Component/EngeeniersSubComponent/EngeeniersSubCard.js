import React from 'react'
import { useState } from 'react';



const EngeeniersSubCard = (props) => {
  const { isChatOpen, setIsChatOpen } = props;
  const[isActive,setIsActive]=useState();
const data=[
  {
    "Spare": 15,
    "Cash": 150000,
    "NAME": "John",
    "ID": "123456",
    "RATING": "A",
    "ADDRESS": "123 Main St",
    "LEAVES": "2",
    "DOOR": "Blue"
  },
  {
    "Spare": 15,
    "Cash": 150000,
    "NAME": "Alice",
    "ID": "789012",
    "RATING": "B",
    "ADDRESS": "456 Elm St",
    "LEAVES": "3",
    "DOOR": "Red"
  },
  {
    "Spare": 15,
    "Cash": 150000,
    "NAME": "Bob",
    "ID": "345678",
    "RATING": "C",
    "ADDRESS": "789 Oak St",
    "LEAVES": "1",
    "DOOR": "Green"
  },
  {
    "Spare": 15,
    "Cash": 150000,
    "NAME": "Emily",
    "ID": "901234",
    "RATING": "A+",
    "ADDRESS": "567 Pine St",
    "LEAVES": "4",
    "DOOR": "Yellow"
  },
  {
    "Spare": 15,
    "Cash": 150000,
    "NAME": "Michael",
    "ID": "567890",
    "RATING": "B-",
    "ADDRESS": "890 Cedar St",
    "LEAVES": "2",
    "DOOR": "Purple"
  },
  {
    "Spare": 15,
    "Cash": 150000,
    "NAME": "Sarah",
    "ID": "234567",
    "RATING": "A-",
    "ADDRESS": "345 Walnut St",
    "LEAVES": "3",
    "DOOR": "Orange"
  },
  {
    "Spare": 15,
    "Cash": 150000,
    "NAME": "David",
    "ID": "678901",
    "RATING": "C+",
    "ADDRESS": "901 Maple St",
    "LEAVES": "1",
    "DOOR": "Pink"
  },
  {
    "Spare": 15,
    "Cash": 150000,
    "NAME": "Emma",
    "ID": "345678",
    "RATING": "A-",
    "ADDRESS": "234 Oak St",
    "LEAVES": "2",
    "DOOR": "Brown"
  },
  {
    "Spare": 15,
    "Cash": 150000,
    "NAME": "William",
    "ID": "890123",
    "RATING": "B",
    "ADDRESS": "678 Elm St",
    "LEAVES": "3",
    "DOOR": "Gray"
  },
  {
    "Spare": 15,
    "Cash": 150000,
    "NAME": "Olivia",
    "ID": "456789",
    "RATING": "A",
    "ADDRESS": "123 Birch St",
    "LEAVES": "1",
    "DOOR": "White"
  }
]



  return (


    <div className='EngeeniersSubCard'>
      <div className={isChatOpen?'AllCardsT':'AllCardsF'}>
      
      {data.map((e, index) => (
           <div className='EngCards' onClick={() => setIsChatOpen(false)}>
           <div className='EngCardDetails'>
               <div className='EngCardDetailsL'>

               </div>
               <div className='EngCardDetailsR'>
                   <div class="table-container">
                       <div class="table-item">NAME</div>
                       <div class="table-item">{e.NAME}</div>
                       <div class="table-item">ID</div>
                       <div class="table-item">{e.ID}</div>
                       <div class="table-item">RATING</div>
                       <div class="table-item">{e.RATING}</div>
                       <div class="table-item">LEAVES</div>
                       <div class="table-item">{e.LEAVES}</div>
                   </div>
               </div>
           </div>
           <div className='EngCardCash'>
               <h5>Spare Parts: <span>{e.Spare}</span></h5>
               <span className='HoriZontalLine'></span>
               <h5>Cash:<span>{e.Cash}</span></h5>
           </div>
           <div className='EngCardMessage'></div>
       </div>
))}
      </div>
    </div>

  )
}

export default EngeeniersSubCard