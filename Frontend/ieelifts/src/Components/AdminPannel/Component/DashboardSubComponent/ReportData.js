import React, { useState } from 'react';
import ReportIssue from './ReportIssue';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { GrGallery } from "react-icons/gr";
import CabinFloors from './CabinFloors';
import CartopShift from './CartopShift';
import Invoice from './Invoice';
import MCRoom from './MCRoom';
import PitArea from './PitArea';
import Rating from './Rating';


function ReportTable() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const routes = [<MCRoom/>,<CabinFloors/>,<CartopShift/>,<PitArea/>,<Invoice/>,<Rating/>];
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === routes.length - 1 ? 0 : prevIndex + 1));
  };

  
  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? routes.length - 1 : prevIndex - 1));
  };

  const CurrentComponent = routes[currentIndex];

    return (
        <div className="ReportTable">
           <ReportIssue/>
           {/* <div className='ReportNavigation'>
            <div className='CarouselButtons'>
              <div className='CarouselButtonsL'>
              {currentIndex!==0 ? <FaChevronLeft onClick={goToPrev} className='cursor'/>:''}
              </div>
              <div className='ComponentNames'>
              <div className='ComponentNames'>
  {currentIndex > 0 && (
    <div className='PreviousComponentName'>
      <p>{routes[currentIndex - 1].type.name}</p>
    </div>
  )}
  <div className='CurrentComponentName'>
    <p style={{ color: '#F8AC1D', fontSize: '.9rem', textAlign: 'center' }}>
      {routes[currentIndex].type.name}
    </p>
  </div>
  {currentIndex < routes.length - 1 && (
    <div className='NextComponentName'>
      <p>{routes[currentIndex + 1].type.name}</p>
    </div>
  )}
</div>

</div>

           <div className='CarouselButtonsR'>
           { currentIndex !==routes.length-1 &&<FaChevronRight  onClick={goToNext} className='cursor'/>} 
           </div>
            </div>
            <div className='CarouselScroll'>
              <div className='Progress1'>
              <div
      className='Progress2'
      style={{ marginLeft: `${(currentIndex / (routes.length)) * 100}%` }}
    ></div>
              </div>
            </div>


            {CurrentComponent}

           </div> */}
  
     </div>
   
    );
}

export default ReportTable;



           
               
