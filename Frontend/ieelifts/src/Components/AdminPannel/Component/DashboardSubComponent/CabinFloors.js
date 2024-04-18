import React from "react";
import { GrGallery } from "react-icons/gr";

const CabinFloors = ({serviceId}) => {
  console.log('serviceId',serviceId)

  return (
    <div className="McRoom">
      <h5>All areas are working well</h5>
      <div className="McRoomCard">
        <GrGallery className="gallery" />
      </div>
    </div>
  );
};

export default CabinFloors;
