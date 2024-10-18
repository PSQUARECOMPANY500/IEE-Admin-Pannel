import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignSoSRequest, findAvailableEngineerForSOS, updateSOSStatus } from '../../../../ReduxSetup/Actions/AdminActions';
import SoSEngineersDropdown from './SoSEngineersDropdown';
import toast from "react-hot-toast";

const SoSSentEngineerModal = ({ jobOrderNumber, closeModal }) => {
    const dispatch = useDispatch();
    const [selectedEngineer, setSelectedEngineer] = useState('');
    const timeSlots = [
        { slot: "9:00-10:00" },
        { slot: "10:00-11:00" },
        { slot: "11:00-12:00" },
        { slot: "12:00-01:00" },
        { slot: "02:00-03:00" },
        { slot: "03:00-04:00" },
        { slot: "04:00-05:00" },
    ];
    const EngineerDetails = useSelector((state) => {
        return state?.AdminRootReducer?.findAvailableEngineer?.engineers
    });

    async function handleAssignEngineer(SoSId, EnggId) {
        await assignSoSRequest(SoSId, EnggId).then((response) => {
            dispatch(updateSOSStatus(jobOrderNumber?.jon, "Assigned", jobOrderNumber?._id, response.data.name))
            toast.success("Engineer assigned successfully")
            closeModal()
        }).catch((err) => {
            toast.error("Failed to assign engineer")
            console.log(err)
        })
    }

    useEffect(() => {
        const currentTime = new Date().toTimeString().slice(0, 5);
        const currentSlot = timeSlots.find(({ slot }) => {
            const [start, end] = slot.split('-');
            return currentTime >= start && currentTime < end;
        });
        const selectedSlot = currentSlot ? currentSlot.slot : null;
        dispatch(findAvailableEngineerForSOS(jobOrderNumber._id, selectedSlot));
    }, [dispatch, jobOrderNumber._id]);

    return (
        <div className='SOS-SentEngineer-Modal-child'>
            <p>Jon: {jobOrderNumber.jon}</p>
            <p>Name: {jobOrderNumber.name}</p>
            <p>Address: {jobOrderNumber.address}</p>
            <p>Date: {jobOrderNumber.date}</p>
            <p>Time: {jobOrderNumber.time}</p>
            <p>SOS Call Count: {jobOrderNumber.sosCallCount}</p>
            <p><SoSEngineersDropdown EngineerDetails={EngineerDetails} setSelectedEngineer={setSelectedEngineer} selectedEngineer={selectedEngineer} /></p>
            <button onClick={() => handleAssignEngineer(jobOrderNumber._id, selectedEngineer)}>Sent Engineer</button>
        </div>
    );
};

export default SoSSentEngineerModal;
