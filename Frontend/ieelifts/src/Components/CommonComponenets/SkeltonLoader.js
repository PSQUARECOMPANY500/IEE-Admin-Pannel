import React from 'react'

const SkeltonLoader = ({width,height}) => {
  return (
    <div class="card">
         <div class="cover-image-skeleton" style={{width:width , height:height}}></div>
    </div>
  )
}

export default SkeltonLoader