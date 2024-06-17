// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import { useState,useEffect } from "react";
import React from "react";
import AnimatedInput from "./ClientsReusableComponent/AnimatedInput";
import TextInput from "./ClientsReusableComponent/TextInput";
const ClientSalesManDetails = () => {
  const [clientFormData, setClientFormData] = useState({salesmanId:'',salesmanName:''
    ,finalPrice:'',quotatedPrice:'',finalPrice:'',discountInRupees:'',discountInPercentage:'',discountAmount:'',finalAmount:''
  });
  const [click, setClick] = useState({});
  const hadleInputChnage = (e) => {
    const { name, value } = e.target;
    setClientFormData({ ...clientFormData, [name]: value });
  };

  const handleClick = (e) => {
    const { name } = e.target;
    setClick({ ...click, [name]: true });
  };

  const handleClickFalse = (e) => {
    const { name } = e.target;
    setClick({ ...click, [name]: false });
  };

  useEffect(() => {
  }, [clientFormData]);

  return (
    <div className="client-salesman-details">
      <h5 className="client-form-details-heading">Sales Man Details</h5>
      <hr className="client-form-hr" />
      <div className="client-salesman-wrapper client-form-input-wrapper">
        <div>
          <TextInput
            label={"Salesman ID"}
            name={"salesmanId"}
            // name paste here from useState

            onFocus={handleClick}
            // same name paste here from useState
            value={clientFormData.salesmanId}
            onChange={hadleInputChnage}
            // name paste here from useState
            click={click.salesmanId}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
        <TextInput
            label={"Name"}
            name={"salesmanName"}
            // name paste here from useState

            onFocus={handleClick}
            // same name paste here from useState
            value={clientFormData.salesmanName}
            onChange={hadleInputChnage}
            // name paste here from useState
            click={click.salesmanName}
            onBlur={handleClickFalse}
          />
        </div>
      </div>
      <div className="client-form-input-wrapper quotation">Quotation</div>
      <div className="quotation-container client-form-input-wrapper">
        <div>
          <TextInput
            label={"Quotated Price"}
            name={"quotatedPrice"}
            // name paste here from useState

            onFocus={handleClick}
            // same name paste here from useState
            value={clientFormData.quotatedPrice}
            onChange={hadleInputChnage}
            // name paste here from useState
            click={click.quotatedPrice}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
        <TextInput
            label={"Final Price"}
            name={"finalPrice"}
            // name paste here from useState

            onFocus={handleClick}
            // same name paste here from useState
            value={clientFormData.finalPrice}
            onChange={hadleInputChnage}
            // name paste here from useState
            click={click.finalPrice}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
        <TextInput
            label={"Discount(Rupees)"}
            name={"discountInRupees"}
            // name paste here from useState

            onFocus={handleClick}
            // same name paste here from useState
            value={clientFormData.discountInRupees}
            onChange={hadleInputChnage}
            // name paste here from useState
            click={click.discountInRupees}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
        <TextInput
            label={"Discount(%)"}
            name={"discountInPercentage"}
            // name paste here from useState

            onFocus={handleClick}
            // same name paste here from useState
            value={clientFormData.discountInPercentage}
            onChange={hadleInputChnage}
            // name paste here from useState
            click={click.discountInPercentage}
            onBlur={handleClickFalse}
          />
        </div>
      </div>
      <div className="client-form-input-wrapper quotation">MD-Discount</div>
      <div className="md-discount-container">
        <div>
        <TextInput
            label={"Discount Amount"}
            name={"discountAmount"}
            // name paste here from useState

            onFocus={handleClick}
            // same name paste here from useState
            value={clientFormData.discountAmount}
            onChange={hadleInputChnage}
            // name paste here from useState
            click={click.discountAmount}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
        <TextInput
            label={"Final Amount"}
            name={"finalAmount"}
            // name paste here from useState

            onFocus={handleClick}
            // same name paste here from useState
            value={clientFormData.finalAmount}
            onChange={hadleInputChnage}
            // name paste here from useState
            click={click.finalAmount}
            onBlur={handleClickFalse}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientSalesManDetails;
