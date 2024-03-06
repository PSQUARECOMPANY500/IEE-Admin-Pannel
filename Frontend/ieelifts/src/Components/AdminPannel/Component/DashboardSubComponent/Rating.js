import React from "react";
import { CiStar } from "react-icons/ci";

const Rating = () => {
  return (
    <div className="Rating">
      <div className="RatingStar">
        <CiStar className="Yellow_Color" />
        <CiStar className="Yellow_Color" />
        <CiStar className="Yellow_Color" />
        <CiStar className="Yellow_Color" />
        <CiStar className="Yellow_Color" />
      </div>
      <div className="RatingContainer">
        <div className="RatingContainerRow">
          <div className="RatingContainerRowL">
            <h5>Was the service agent polite ?</h5>
          </div>

          <div className="RatingButton">
            <button>yes</button>
            <button>No</button>
          </div>
        </div>

        <div className="RatingContainerRow">
          <div className="RatingContainerRowL">
            <h5>Was the service agent wearing clean cloths ?</h5>
          </div>
          <div className="RatingButton">
            <button>yes</button>
            <button>No</button>
          </div>
        </div>

        <div className="RatingContainerRow">
          <h5>Was the service agent professional ?</h5>
          <div className="RatingButton">
            <button>yes</button>
            <button>No</button>
          </div>
        </div>

        <div className="RatingContainerRow">
          <h5>Were all the issues resolved ?</h5>
          <div className="RatingButton">
            <button>yes</button>
            <button>No</button>
          </div>
        </div>

        <div className="RatingContainerRow">
          <h5>Would you recommend us ?</h5>
          <div className="RatingButton">
            <button>yes</button>
            <button>No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
