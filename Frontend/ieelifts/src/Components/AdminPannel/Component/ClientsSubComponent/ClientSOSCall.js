import React from 'react'
import data from "./DatasClientServiceHis.json"
import ClientTableData from './ClientTableData'

// ---------------Raj ---------------------------

const ClientSOSCall = () => {
    const fieldsToShow = ['SrNo', 'Date', 'Time', 'EngAssigned', 'Location', 'Issue', 'Description', 'Status']

    return (
       <div>
        <ClientTableData fieldsToShow={fieldsToShow}/>
       </div>
    )
}

export default ClientSOSCall
