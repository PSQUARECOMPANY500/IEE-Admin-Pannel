import React, { useState } from 'react'
import EngeeniersSubCard from './EngeeniersSubCard';
import EngChat from './EngChat';
import EngData from './EngData';



const EngeeniersCard = () => {
  const [clickCount, setClickCount] = useState({ num: null, clickC: 0 });






  return (
    <>
      {/* grid-template-columns:  1fr;
    grid-template-areas:'EngeeniersSubCard' ; */}
      {/* // style={{ gridTemplateColumns: clickCount.clickC === 0 ? '1fr' : '2fr 1fr',  gridTemplateAreas: clickCount.clickC === 0 ? 'EngeeniersSubCard' : 'EngeeniersSubCard EngeeniersChat', }}  */}
      <div className='EngeeniersCard' style={{ gridTemplateColumns: clickCount.clickC > 0 ? '2fr 1fr' : '1fr' }} >

        <EngeeniersSubCard clickCount={clickCount} setClickCount={setClickCount}

        />


        <EngChat clickCount={clickCount} setClickCount={setClickCount} />
      </div>
    </>
  )
}

export default EngeeniersCard;