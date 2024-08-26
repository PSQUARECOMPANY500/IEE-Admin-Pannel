import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";

const SosModal = ({ handleDropDownClick, jobOrderNumber }) => {
    const [firstList, setFirstList] = useState(false);

    

    return (
        <div className="SOS-Action-modal-container-outer">
            <div
                className="edit-SOS-Action-modal"
                onClick={(e) => {
                    e.stopPropagation();
                    handleDropDownClick();
                }}
            >
                <IoCloseOutline />
            </div>


            {!firstList ? (
                <div className="SOS-Action-modal-items">
                    <div className="uuu" onClick={() => setFirstList(true)}>
                        <p>Close Request</p>
                    </div>
                    <div className="uuu">
                        <p>Send Engineer</p>
                    </div>
                </div>
            ) : (
                <div className="SOS-Action-modal-items">
                    <div className="uuu" >
                        <p>False alarm</p>
                    </div>
                    <div className="uuu">
                        <p>Solved on call</p>
                    </div>
                    <div className="uuu">
                        <p>Make a callback</p>
                    </div>
                </div>
            )}

        </div>
    );
}

export default React.memo(SosModal);
