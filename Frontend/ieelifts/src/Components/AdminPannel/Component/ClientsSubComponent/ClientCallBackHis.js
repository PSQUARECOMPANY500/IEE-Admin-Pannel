import React from 'react'
import ClientTableData from './ClientTableData';


//---------------------------------Raj-------------------------------

const ClientCallBackHis = () => {


  const fieldsToShow = ['SrNo', 'Date', 'Time', 'IssueReported', 'EngAssigned', 'Status']

  return (

    <div>
      <ClientTableData fieldsToShow={fieldsToShow} />
      
    </div>


  )
}

export default ClientCallBackHis