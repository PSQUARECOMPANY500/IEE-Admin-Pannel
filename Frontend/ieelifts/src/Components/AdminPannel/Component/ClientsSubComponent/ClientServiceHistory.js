import React from 'react'
import data from './DatasClientServiceHis.json'
// ---------------Raj ---------------------------

const ClientServiceHistory = () => {
  return (
    <div className="spare-part-table_view">
      <div className="spare-part-sub-table-view">
        <div className="spare-part-table-container" style={{ maxHeight: '60vh' }}>
          <div className="eng-table-shadow"></div>
          <table>
            <thead>
              <tr>
                <th>Sr.no</th>
                <th>Date</th>
                <th>Time</th>
                <th>Eng Assigned</th>
                <th>Service Type</th>
                <th>Location</th>
                <th>Part Replaced</th>
                <th>Service Cost</th>
                <th>Status</th>

              </tr>
            </thead>
            <tbody>

              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.SrNo}</td>
                  <td>{row.Date}</td>
                  <td>{row.Time}</td>
                  <td>{row.EngAssigned}</td>
                  <td>{row.ServiceType}</td>
                  <td>{row.Location}</td>
                  <td>{row.PartReplaced}</td>
                  <td>{row.ServiceCost}</td>
                  <td>{row.Status}</td>

                </tr>

              ))}



            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ClientServiceHistory
