import React from 'react'
import data from './DatasClientServiceHis.json';
import InformationTable from '../../../CommonComponenets/InformationTable';


// ---------------Raj ---------------------------

const ClientServiceHistory = () => {

  const fieldsToShow = ['SrNo', 'Date', 'Time', 'EngAssigned', 'ServiceType', 'Location', 'PartReplaced', 'ServiceCost', 'Status']

  return (
   
//Pass the fieldtoshow as props
    <div>
      <InformationTable fieldsToShow={fieldsToShow}/>
    </div>

  )
}

export default ClientServiceHistory
