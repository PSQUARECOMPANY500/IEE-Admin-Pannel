import React from 'react'
import { FaRegStar } from "react-icons/fa";
const RatingQContainer = () => {
  return (
   <>
     <div className="rating-quetions-container-head">
          <h5><span>Client Name:</span>Aayush</h5>
          <span  className="rating_gap"><FaRegStar className='rating_star' /> 
          <FaRegStar className='rating_star' /> 
          <FaRegStar className='rating_star' />
          <FaRegStar className='rating_star'/>
          <FaRegStar className='rating_star'/>
          </span>
        </div>
        <div className="rating-quetions-container-textarea">
        <textarea disabled >aaaaaaa</textarea>
        </div>
        <div className="rating-quetions-container-quiz" >
          <div className='rating-quiz-row'>
            <div className='rating-quiz-row-text'>
              <p>Was the service agent polite ?</p>
            </div>
            <div className='rating-quiz-row-buttons'>
              <button>Yes</button>
              <button>No</button>
            </div>
          </div>

          <div className='rating-quiz-row'>
            <div className='rating-quiz-row-text'>
              <p>Was the service agent polite ?</p>
            </div>
            <div className='rating-quiz-row-buttons'>
              <button>Yes</button>
              <button>No</button>
            </div>
          </div>
     
          <div className='rating-quiz-row'>
            <div className='rating-quiz-row-text'>
              <p>Was the service agent polite ?</p>
            </div>
            <div className='rating-quiz-row-buttons'>
              <button>Yes</button>
              <button>No</button>
            </div>
          </div>

          <div className='rating-quiz-row'>
            <div className='rating-quiz-row-text'>
              <p>Was the service agent polite ?</p>
            </div>
            <div className='rating-quiz-row-buttons'>
              <button>Yes</button>
              <button>No</button>
            </div>
          </div>

          <div className='rating-quiz-row'>
            <div className='rating-quiz-row-text'>
              <p>Was the service agent polite ?</p>
            </div>
            <div className='rating-quiz-row-buttons'>
              <button>Yes</button>
              <button>No</button>
            </div>
          </div>

        </div>
   </>
  )
}

export default RatingQContainer