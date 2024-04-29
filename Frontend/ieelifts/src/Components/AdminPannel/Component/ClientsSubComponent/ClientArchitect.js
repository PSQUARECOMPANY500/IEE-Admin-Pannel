// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React from 'react';
import AnimatedInput from './ClientsReusableComponent/AnimatedInput';
import Clientbutton from './ClientsReusableComponent/Clientbutton';
const ClientArchitect = ({}) => {
  return (
    <div className='client-architect'>
       <h5 className='client-form-details-heading'>Architect Details</h5>
      <hr className='client-form-hr' />
      <div className='client-architect-container client-form-input-wrapper'>
      <div>
          <AnimatedInput
            label={"Architect Name"}
            name={"Name"}
          />
        </div>
      <div>
          <AnimatedInput
            label={"Number"}
            name={"Name"}
          />
        </div>
      <div>
          <AnimatedInput
            label={"Contractor Name"}
            name={"Name"}
          />
        </div>
      <div>
          <AnimatedInput
            label={"Name"}
            name={"Name"}
          />
        </div>
      </div>
   
    </div>
  );
};

export default ClientArchitect;