//-------------------------------------Rahul Kumar-------------------------------------
import React, { useEffect, useState } from 'react'
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { TbArrowFork } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { IoCallOutline } from "react-icons/io5";
import { IoIosMan } from "react-icons/io";
import { BiSolidBookmarkAlt } from "react-icons/bi";

const ClientDetails = ({selectedClient}) => {
    console.log("bacjkchood",selectedClient);
  return (
    <div className='service-history-wrapper'>
     <div className='service-history-client-details'>
        <div className='service-history-heading'>
        <h6>Client Details <MdOutlineBookmarkAdded className='service-icon-color'/></h6>
        <div className='service-history-hr hr-client-width'></div>
        </div>
        <div className='service-history-client-details-child-wrappper'>
            <div>
                <div><BiSolidBookmarkAlt className='service-icon-color'/></div>
                <div className='service-history-client-heading'>Date of Handover</div> 
                <div className='service-history-client-child-color'>NA</div>
            </div>
            <div>
            <div><TbArrowFork className='service-icon-color'/></div>
                <div className='service-history-client-heading'>Call Backs</div>
                <div className='service-history-client-child-color'>NA</div>
            </div>
            <div>
            <div><IoIosMan className='service-icon-color'/></div>
                <div className='service-history-client-heading'>Refrence</div>
                <div className='service-history-client-child-color'>NA</div>
            </div>
            <div><div><GoHome className='service-icon-color'/></div>
                <div className='service-history-client-heading'>Address</div>
                <div className='service-history-client-child-color'>{selectedClient?.Address}</div></div>
            <div>
            <div><IoCallOutline className='service-icon-color'/></div>
                <div className='service-history-client-heading'>Phone no</div>
                <div className='service-history-client-child-color'>{selectedClient?.PhoneNumber}</div>
            </div>
        </div>
     </div>
     

     <div className='service-history-client-details'>
        <div className='service-history-heading'>
        <h6>Architect details <MdOutlineBookmarkAdded className='service-icon-color'/></h6>
        <div className='service-history-hr hr-architect-width'></div>
        </div>
        <div className='service-history-client-details-child-wrappper'>
            <div>
                
                <div className='service-history-client-heading'>Name</div>
                <div className='service-history-client-child-color'>NA</div>
            </div>
            <div>
           
                <div className='service-history-client-heading'>Number</div>
                <div className='service-history-client-child-color'>NA</div>
            </div>
            <div>
           
                <div className='service-history-client-heading'>Contractor</div>
                <div className='service-history-client-child-color'>NA</div>
            </div>
            <div>
                <div className='service-history-client-heading'>Name</div>
                <div className='service-history-client-child-color'>NA</div></div>
            <div>
           
                <div className='service-history-client-heading'>Number</div>
                <div className='service-history-client-child-color'>NA</div>
            </div>
        </div>
     </div>

     <div className='service-history-client-details'>
        <div className='service-history-heading'>
        <h6>Salesman Details <MdOutlineBookmarkAdded className='service-icon-color'/></h6>
        <div className='service-history-hr hr-salesman-width'></div>
        </div>
        <div className='service-history-client-details-child-wrappper'>
            <div>
                <div className='service-history-client-heading'>Salesman ID</div>
                <div className='service-history-client-child-color'>NA</div>
            </div>
            <div>
                <div className='service-history-client-heading'>Name</div>
                <div className='service-history-client-child-color'>NA</div>
            </div>
            <div>
                <div className='service-history-client-heading'>Quatated Price</div>
                <div className='service-history-client-child-color'>NA</div>
            </div>
            <div>
                <div className='service-history-client-heading'>Discount amount</div>
                <div className='service-history-client-child-color'>NA</div></div>
            <div>
                <div className='service-history-client-heading'>Final amount</div>
                <div className='service-history-client-child-color'>NA</div>
            </div>
        </div>
     </div>
    </div>
  )
}

export default ClientDetails;
