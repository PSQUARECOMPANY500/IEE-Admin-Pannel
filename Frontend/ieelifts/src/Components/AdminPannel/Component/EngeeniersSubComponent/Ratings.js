
import React, { useState } from "react";
import RatingCard from "./RatingCard";


import RatingQContainer from "./RatingQContainer";
import RatingCardHead from "./RatingCardHead";

const Ratings = () => {
  const [isClick, setIsClick] = useState(false);
  return <div className="rating">
    <div className="sub-rating" style={{ gridTemplateColumns: isClick ? '1fr 1fr' : '1fr' }}>
      <div className="rating-card-container">
        <RatingCardHead />
        <div className="rating-sub-card-container Yello_Scrollbar" style={{ gridTemplateColumns: isClick ? '1fr 1fr' : '1fr 1fr 1fr 1fr' }}>
          <RatingCard isClick={isClick} setIsClick={setIsClick} />
          <RatingCard isClick={isClick} setIsClick={setIsClick} />
          <RatingCard isClick={isClick} setIsClick={setIsClick} />
          <RatingCard isClick={isClick} setIsClick={setIsClick} />
          <RatingCard isClick={isClick} setIsClick={setIsClick} />
          <RatingCard isClick={isClick} setIsClick={setIsClick} />

        </div>
      </div>

      <div className="rating-quetions-container" style={{ display: isClick ? '' : 'none' }}>
        <RatingQContainer />
      </div>
    </div>
  </div>;
};

export default Ratings;