import React from 'react'
import data from "./DatasClientServiceHis.json"
import InformationTable from '../../../CommonComponenets/InformationTable'

// ---------------Raj ---------------------------

const ClientSOSCall = () => {
    const fieldsToShow = ['SrNo', 'Date', 'Time', 'EngAssigned', 'Location', 'Issue', 'Description', 'Status']

    return (
       <div>
        <InformationTable fieldsToShow={fieldsToShow}/>
       </div>
    )
}

export default ClientSOSCall
