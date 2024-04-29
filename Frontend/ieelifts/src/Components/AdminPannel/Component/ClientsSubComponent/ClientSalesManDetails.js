// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React from 'react';
import AnimatedInput from './ClientsReusableComponent/AnimatedInput';
const ClientSalesManDetails = () => {
  return (
    <div className='client-salesman-details'>
      <h5 className='client-form-details-heading'>Sales Man Details</h5>
      <hr className='client-form-hr' />
      <div className='client-salesman-wrapper client-form-input-wrapper'>
        <div>
          <AnimatedInput
            label={"Salesman ID"}
            name={"Name"}
          />
        </div>
        <div>
          <AnimatedInput
            label={"Name"}
            name={"courseName"}
          />
        </div>
      </div>
      <div className='client-form-input-wrapper quotation'>
        Quotation
      </div>
      <div className='quotation-container client-form-input-wrapper'>
        <div>
          <AnimatedInput
            label={"Quatated"}
            name={"courseName"}
          />
        </div>
        <div>
          <AnimatedInput
            label={"Final Price"}
            name={"courseName"}
            disabled={true}
          />
        </div>
        <div>
          <AnimatedInput
            label={"Discount(Rupees)"}
            name={"courseName"}
            disabled={true}
          />
        </div>
        <div>
          <AnimatedInput
            label={"Discount(%)"}
            name={"courseName"}
            disabled={true}
          />
        </div>

      </div>
      <div className='client-form-input-wrapper quotation'>
        MD-Discount
      </div>
        <div className='md-discount-container'>
        <div>
          <AnimatedInput
            label={"Discount Amount"}
            name={"courseName"}
            disabled={true}
          />
        </div>
      <div>
          <AnimatedInput
            label={"Final Amount"}
            name={"courseName"}
            disabled={true}
          />
        </div>
        </div>

    </div>
  );
};

export default ClientSalesManDetails;