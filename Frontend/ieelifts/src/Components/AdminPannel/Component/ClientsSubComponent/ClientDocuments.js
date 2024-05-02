import React from 'react'
import data from './DatasClientServiceHis.json'
import ClientTableData from './ClientTableData'

// ------------------Raj-----------------------------------

const ClientDocuments = () => {

  const fieldsToShow = ['SrNo', 'EngAssigned', 'Location', 'PartReplaced', 'Status']

  return (
    <div>

      <ClientTableData fieldsToShow={fieldsToShow} />
    </div>
  )
}

export default ClientDocuments
