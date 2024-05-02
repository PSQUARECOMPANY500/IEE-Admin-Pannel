import React from 'react'
import data from './DatasClientServiceHis.json';
import ClientTableData from './ClientTableData';


// ---------------Raj ---------------------------

const ClientServiceHistory = () => {

  const fieldsToShow = ['SrNo', 'Date', 'Time', 'EngAssigned', 'ServiceType', 'Location', 'PartReplaced', 'ServiceCost', 'Status']

  return (
   
//Pass the fieldtoshow as props
    <div>
      <ClientTableData fieldsToShow={fieldsToShow}/>
    </div>

  )
}

export default ClientServiceHistory
