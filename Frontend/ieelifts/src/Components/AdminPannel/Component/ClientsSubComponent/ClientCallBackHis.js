import React from 'react'
import InformationTable from '../../../CommonComponenets/InformationTable';


//---------------------------------Raj-------------------------------

const ClientCallBackHis = () => {


  const fieldsToShow = ['SrNo', 'Date', 'Time', 'IssueReported', 'EngAssigned', 'Status']

  return (

    <div>
      <InformationTable fieldsToShow={fieldsToShow} maxHeight="60vh" />
    </div>


  )
}

export default ClientCallBackHis