import React, { useState } from 'react'
import EngeeniersSubCard from './EngeeniersSubCard';
import EngChatNav from './EngChatNav';
import { CiVideoOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import Attendance from "./Attendance"
import Ratings from "./Ratings"
import TaskHistory from "./TaskHistory"
import SpareParts from "./SpareParts"

const EngeeniersCard = () => {
  const[isChatOpen,setIsChatOpen]=useState(false);


  const [currentComponent, setCurrentComponent] = useState(null);

  // Render the selected component
  const renderSelectedComponent = () => {
    switch (currentComponent) {
      case 'c1':
        return <TaskHistory/>;
      case 'c2':
        return <Attendance />;
      case 'c3':
        return <Ratings />;
      case 'c4':
        return <SpareParts />;
      default:
        return <TaskHistory/>;
    }
  };


  return (
    <>
  
      <div className={isChatOpen?'EngeeniersCardT':'EngeeniersCardF'}>

        {/* <EngeeniersSubCard isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} /> */}
        <div className='SingleEng'>
        <div className='SubSingleEng'>

        <div className='PDetails'>
        <div className='SubPDetails'>
        <div className='Pimg'></div>
          <h1>Name:    <span>AAyush</span></h1>
        </div>
       
          <h1>ID:    <span>123456</span></h1>
          <h1>Spare Parts:    <span>96</span></h1>
          <h1>Cash In Hand:     <span>10,000</span></h1>
          <FaRegFileAlt  className='Icon_Color'/>
        </div>
        <div className='ODetailsColumn'>
          <h5 onClick={()=>setCurrentComponent('c1')}>Task History</h5>
          <h5 onClick={()=>setCurrentComponent('c2')}>Attendence</h5>
          <h5 onClick={()=>setCurrentComponent('c3')}>Rating</h5>
          <h5 onClick={()=>setCurrentComponent('c4')}>Spare parts</h5>
        </div>
      <div className='ODetails'>
        {renderSelectedComponent()}
      </div>
        </div>
  
        </div>

        <div className={isChatOpen?'EngeeniersChatT':'EngeeniersChatF'}>
          <EngChatNav />
          <div className='EngChatBox'>
            <div className='EngChatBoxHead'>
              <h6>online</h6>
              <div className='EngChatBoxIcons'>
                <IoCallOutline />
                <CiVideoOn />
              </div>
            </div>
            <div className='EngChatMsg'>
      
            </div>
            <div className='EngChatSender'></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EngeeniersCard;