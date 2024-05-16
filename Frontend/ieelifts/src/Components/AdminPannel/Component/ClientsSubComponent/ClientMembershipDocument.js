// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React, { useState } from 'react';
import AnimatedInput from './ClientsReusableComponent/AnimatedInput';
import FileUploader from './ClientsReusableComponent/FileUploader';
const ClientMembershipDocument = () => {

  const [selectedMembership, setSelectedMembership] = useState("Warranty");

  return (
    <div className='client-membership-document'>
      <h5 className='client-form-details-heading'>Client's Membership</h5>
      <hr className='client-form-hr' />
      <div className='client-warranty-container'>
        <div className={`warranty-button ${selectedMembership === 'Warranty' ? 'selected' : ''}`}
          onClick={() => setSelectedMembership('Warranty')}>Warranty</div>
        <div className={`warranty-button ${selectedMembership === 'Silver' ? 'selected' : ''}`}
          onClick={() => setSelectedMembership('Silver')}>Silver</div>
        <div className={`warranty-button ${selectedMembership === 'Gold' ? 'selected' : ''}`}
          onClick={() => setSelectedMembership('Gold')}>Gold</div>
        <div className={`warranty-button ${selectedMembership === 'Platinum' ? 'selected' : ''}`}
          onClick={() => setSelectedMembership('Platinum')}>Plantinum</div>
      </div>
      <h5 className='client-form-details-heading client-document'>Document</h5>
      <hr className='client-form-hr' />
      <div className='client-document-child-wrapper client-form-input-wrapper'>
        <div>

          <FileUploader label={"Signed Quotation"} />
        </div>
        <div>
          <AnimatedInput
            label={"Payment Form"}
            name={"courseName"}
          />
        </div>
        <div>
          <AnimatedInput
            label={"Check form"}
            name={"courseName"}
          />
        </div>
        <div>
          <AnimatedInput
            label={"Sales Order"}
            name={"courseName"}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientMembershipDocument;
