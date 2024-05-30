import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const CollectCashModal = ({onClose}) => {
  return (
    <div className="parent-collect-div">
       <IoCloseOutline onClick={onClose} className="closeIconCollectCash" />
      <div className="child-collect-div">
        <div className="collect-body">
          <input type="text" placeholder="Type id" />
          <input type="text" placeholder="Amount Received" />

          <button>Collect Cash</button>
        </div>
      </div>
    </div>
  );
};

export default CollectCashModal;
