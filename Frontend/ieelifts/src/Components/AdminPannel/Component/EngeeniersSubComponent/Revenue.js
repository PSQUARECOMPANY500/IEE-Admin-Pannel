import React from 'react'
import SparePartRevenueTable from './SparePartRevenueTable'
import Charts from './Charts'

const Revenue = () => {
  return (
    <div className='revenue'>
  <div className='sub-revenue'>

    <div className='sub-revenue-top'>
      <div className='sub-revenue-top-left'>
      <Charts/>
      </div>
      <div className='sub-revenue-top-right'></div>

    </div>
    <div className='sub-revenue-bottom'>
<SparePartRevenueTable/>
    </div>
  </div>
    </div>

  )
}

export default Revenue