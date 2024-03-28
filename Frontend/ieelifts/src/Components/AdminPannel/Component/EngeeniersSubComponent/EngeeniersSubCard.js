import React from "react";
import { useState } from "react";

const EngeeniersSubCard = (props) => {

  const [singleClickTimeout, setSingleClickTimeout] = useState(null);
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const [isActive ,setIsActive]=useState(null);
const{isFirst,setIsFirst,isSecond,setIsSecond}=props;

  const data = [
    {
      Spare: 15,
      Cash: 150000,
      NAME: "Jack",
      ID: "1111",
    
      RATING: "A",
      ADDRESS: "123 Main St",
      LEAVES: "2",
      DOOR: "Blue",
    },
    {
      Spare: 15,
      Cash: 150000,
      NAME: "Alice",
      ID: "789012",
      RATING: "B",
      ADDRESS: "456 Elm St",
      LEAVES: "3",
      DOOR: "Red",
    },
    {
      Spare: 15,
      Cash: 150000,
      NAME: "Bob",
      ID: "345678",
      RATING: "C",
      ADDRESS: "789 Oak St",
      LEAVES: "1",
      DOOR: "Green",
    },
    {
      Spare: 15,
      Cash: 150000,
      NAME: "Emily",
      ID: "901234",
      RATING: "A+",
      ADDRESS: "567 Pine St",
      LEAVES: "4",
      DOOR: "Yellow",
    },
    {
      Spare: 15,
      Cash: 150000,
      NAME: "Michael",
      ID: "567890",
      RATING: "B-",
      ADDRESS: "890 Cedar St",
      LEAVES: "2",
      DOOR: "Purple",
    },
    {
      Spare: 15,
      Cash: 150000,
      NAME: "Sarah",
      ID: "234567",
      RATING: "A-",
      ADDRESS: "345 Walnut St",
      LEAVES: "3",
      DOOR: "Orange",
    },
    {
      Spare: 15,
      Cash: 150000,
      NAME: "David",
      ID: "678901",
      RATING: "C+",
      ADDRESS: "901 Maple St",
      LEAVES: "1",
      DOOR: "Pink",
    },
    {
      Spare: 15,
      Cash: 150000,
      NAME: "Emma",
      ID: "345678",
      RATING: "A-",
      ADDRESS: "234 Oak St",
      LEAVES: "2",
      DOOR: "Brown",
    },
    {
      Spare: 15,
      Cash: 150000,
      NAME: "William",
      ID: "890123",
      RATING: "B",
      ADDRESS: "678 Elm St",
      LEAVES: "3",
      DOOR: "Gray",
    },
    {
      Spare: 15,
      Cash: 150000,
      NAME: "Olivia",
      ID: "456789",
      RATING: "A",
      ADDRESS: "123 Birch St",
      LEAVES: "1",
      DOOR: "White",
    },
  ];
  



  const handleSingleClick = (index) => {

    if (!isDoubleClick) {
      setIsDoubleClick(false);
      clearTimeout(singleClickTimeout);
      setSingleClickTimeout(null);
    }

    setIsDoubleClick(false);
    const timeout = setTimeout(() => {
     setIsFirst(true);
      setSingleClickTimeout(null);
    }, 200);
 
    setSingleClickTimeout(timeout);
    setIsActive(index);
 
  }

  const handleDoubleClick = (index) => {
    setIsDoubleClick(true);
    clearTimeout(singleClickTimeout);
    setSingleClickTimeout(null);
    setIsSecond(true);
  

  };



  return (
    <div className="EngeeniersSubCard" style={{ cursor: "pointer",display:isSecond&&'none' }}>
      <div className= "AllCards" style={{gridTemplateColumns:isFirst&&'1fr 1fr'}} >
        {data.map((e, index) => (
          <div className="EngCards" onDoubleClick={()=>handleDoubleClick()} onClick={()=> handleSingleClick (index)} style={{ boxShadow: isActive === index ? '1px 2px 5px #F8AC1D80' : '2px 4px 10px #00000029' }}>
            <div className="EngCardDetails">
              <div className="EngCardDetailsL">
              </div>
              <div className="EngCardDetailsR">
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
            <div className="EngCardCash">
              <h5>
                Spare Parts: <span>{e.Spare}</span>
              </h5>
              <span className="HoriZontalLine"></span>
              <h5>
                Cash:<span>{e.Cash}</span>
              </h5>
            </div>
            <div className="EngCardMessage"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngeeniersSubCard;