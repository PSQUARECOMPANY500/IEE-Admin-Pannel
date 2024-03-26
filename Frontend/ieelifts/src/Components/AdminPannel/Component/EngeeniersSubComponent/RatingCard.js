import React from 'react'
import { FaRegStar } from "react-icons/fa";

const RatingCard = (props) => {
  const {isClick,setIsClick}=props;
 
  

  return (
    <div className="rating-card">
            <div className="rating-sub-card" onClick={()=>setIsClick(true)}>
              <div className="rating-sub-card-row">
                <div className="rating-sub-card-row-right">
                  <h5>Name:</h5>
                </div>
                <div className="rating-sub-card-row-left medium_dark_font"><h5>Aayush AAyisjh aayush aayush aayush</h5></div>
              </div>
              <div className="rating-sub-card-row">
                <div className="rating-sub-card-row-right">
                  <h5>ADD:</h5>
                </div>
                <div className="rating-sub-card-row-left two-line-text"><h5>bhopal bhopal bhopal bhopal bhopalbhopal bhopal bhopal bhopal bhopal bhopal bhopal bhop bhopalbhopal bhopal hopal bhopal bhopal bhopal bhopalbhopal bhopal bhopal bhopal bhopal bhopal bhopal bhop bhopalbhopal bhopal</h5></div>
              </div>
              <div className="rating-sub-card-row footer-rating">
                <h5>3:00</h5>
                <h5>5:00</h5>
                <h5> <span>5:00</span> <FaRegStar className='rating_star rating_gap'/></h5>
              </div>
            </div>
          </div>
  )
}

export default RatingCard