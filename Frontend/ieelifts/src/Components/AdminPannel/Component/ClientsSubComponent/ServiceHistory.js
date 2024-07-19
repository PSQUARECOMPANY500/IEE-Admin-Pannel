//-------------------------------------Rahul Kumar-------------------------------------
import React, { useEffect, useState } from 'react'
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { TbArrowFork } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { IoCallOutline } from "react-icons/io5";
import { IoIosMan } from "react-icons/io";
import { BiSolidBookmarkAlt } from "react-icons/bi";

const ServiceHistory = () => {
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
                <div className='service-history-client-child-color'>2022</div>
            </div>
            <div>
            <div><TbArrowFork className='service-icon-color'/></div>
                <div className='service-history-client-heading'>Call Backs</div>
                <div className='service-history-client-child-color'>2</div>
            </div>
            <div>
            <div><IoIosMan className='service-icon-color'/></div>
                <div className='service-history-client-heading'>Refrence</div>
                <div className='service-history-client-child-color'>Vivek singh</div>
            </div>
            <div><div><GoHome className='service-icon-color'/></div>
                <div className='service-history-client-heading'>Adress</div>
                <div className='service-history-client-child-color'>#1235, Phase 5, Sec 73, Mohali</div></div>
            <div>
            <div><IoCallOutline className='service-icon-color'/></div>
                <div className='service-history-client-heading'>Phone no</div>
                <div className='service-history-client-child-color'>9999988889</div>
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
                <div className='service-history-client-child-color'>Deep kumar</div>
            </div>
            <div>
           
                <div className='service-history-client-heading'>Number</div>
                <div className='service-history-client-child-color'>+91 7445512545</div>
            </div>
            <div>
           
                <div className='service-history-client-heading'>Contractor</div>
                <div className='service-history-client-child-color'>Yes</div>
            </div>
            <div>
                <div className='service-history-client-heading'>Name</div>
                <div className='service-history-client-child-color'>Yuvraj</div></div>
            <div>
           
                <div className='service-history-client-heading'>Number</div>
                <div className='service-history-client-child-color'>+91 7884512545</div>
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
                <div className='service-history-client-child-color'>455788</div>
            </div>
            <div>
                <div className='service-history-client-heading'>Name</div>
                <div className='service-history-client-child-color'>Jakes Smith</div>
            </div>
            <div>
                <div className='service-history-client-heading'>Quatated Price</div>
                <div className='service-history-client-child-color'>7,50000</div>
            </div>
            <div>
                <div className='service-history-client-heading'>Discount amount</div>
                <div className='service-history-client-child-color'>10,0000</div></div>
            <div>
                <div className='service-history-client-heading'>Final amount</div>
                <div className='service-history-client-child-color'>7,40000</div>
            </div>
        </div>
     </div>
    </div>
  )
}

export default ServiceHistory;
