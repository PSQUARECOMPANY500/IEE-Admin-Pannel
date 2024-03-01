import React from 'react'
import { GrGallery } from "react-icons/gr";

const CartopShift = () => {
  return (
    <div className='CarTopShift'>
<div className='IssueResolved CardShiftCards'>
  <div className='IssueResolvedL'>
    <h5>Issues Resolved</h5>
    <h6>m/c room & motor area check & clean</h6>
  </div>
  <div className='IssueResolvedR'>
  <GrGallery />
  </div>
</div>
<div className='IssueNotResolved CardShiftCards'>
  <div className='IssueNotResolvedL'>
    <h5>Issues Not Resolved</h5>
    <h6>m/c room & motor area check & clean</h6>
  </div>
  <div className='IssueNotResolvedR'>
  <GrGallery />
  </div>
</div>
<div className='SparePartChange CardShiftCards'>
  <h5>Spare Parts Changed</h5>
  <div className='SparePartChangeB'>
    <h5>Type <span> Main Machine</span></h5>
    <h5>Part <span> Break Coil</span></h5>
  </div>
</div>
<div className='SparepartReq CardShiftCards'>
<h5>Spare Parts Requested</h5>
  <div className='SparepartReqB'>
  <h5>Type  <span>Main Machine</span></h5>
    <h5>Part  <span>Break Coil</span></h5>
  </div>
</div>
<div className='Amount CardShiftCards'>
  <h5>Total Amount</h5>
  <h5>Rs. 12000/-</h5>
</div>
    </div>
  )
}

export default CartopShift