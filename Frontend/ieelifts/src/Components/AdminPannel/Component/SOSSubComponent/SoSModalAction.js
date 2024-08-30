import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { updateSOSStatus } from '../../../../ReduxSetup/Actions/AdminActions';

const SosModal = ({ handleDropDownClick, jobOrderNumber, showCallbackModal, handleSentEngineerModal }) => {
    const dispatch = useDispatch()
    const [firstList, setFirstList] = useState(false);
    const [status, updateStatus] = useState(null);

    useEffect(() => {
        if (status !== null && status !== "RaisedCallback") {
            dispatch(updateSOSStatus(jobOrderNumber.jon, status, jobOrderNumber._id))
        } else if (status === "RaisedCallback") {
            showCallbackModal()
            handleDropDownClick(jobOrderNumber, "RaisedCallback")
        }
    }, [status])

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
                    <div className="uuu" onClick={handleSentEngineerModal}>
                        <p>Send Engineer</p>
                    </div>
                </div>
            ) : (
                <div className="SOS-Action-modal-items">
                    <div className="uuu" onClick={() => updateStatus("falseAlarm")}>
                        <p>False alarm</p>
                    </div>
                    <div className="uuu" onClick={() => updateStatus("ResolvedCall")}>
                        <p>Solved on call</p>
                    </div>
                    <div className="uuu" onClick={() => updateStatus("RaisedCallback")}>
                        <p>Make a callback</p>
                    </div>
                </div>
            )}

        </div>
    );
}

export default React.memo(SosModal);
