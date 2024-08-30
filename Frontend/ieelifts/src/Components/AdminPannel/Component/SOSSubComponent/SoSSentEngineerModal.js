import React from 'react'

const SoSSentEngineerModal = ({ jobOrderNumber }) => {
    return (
        <div>
            <p> Jon: {jobOrderNumber.jon}</p>
            <p> Name: {jobOrderNumber.name} </p>
            <p> Address: {jobOrderNumber.address}</p>
            <p> Date: {jobOrderNumber.date} </p>
            <p> Time: {jobOrderNumber.time} </p>
            <p> SOS Call Count: {jobOrderNumber.sosCallCount} </p>
            <p> Select Engineer</p>
            <p> Sent Engineer</p>
        </div>
    )
}

export default SoSSentEngineerModal