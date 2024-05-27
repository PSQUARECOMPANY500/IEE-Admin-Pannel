// <-----------------------------  Author:- Rahul kumar ----------------------------------->clientFormData
import { useState, useEffect } from "react";
import React from "react";
import AnimatedInput from "./ClientsReusableComponent/AnimatedInput";
import TextInput from "./ClientsReusableComponent/TextInput";
const ClientSalesManDetails = () => {
  const [clientFormData, setClientFormData] = useState({
    salesmanId: "",
    salesmanName: "",
    finalPrice: "",
    quotatedPrice: "",
    finalPrice: "",
    discountInRupees: "",
    discountInPercentage: "",
    discountAmount: "",
    finalAmount: "",
  });
 
  const [click, setClick] = useState({});

  console.log("popopo",click.finalPrice)
  
  const hadleInputChnage = (e) => {
    console.log(e.target.value)
    const { name, value } = e.target;
    setClientFormData({ ...clientFormData, [name]: value });

  
    // if(clientFormData.quotatedPrice && clientFormData.finalPrice){
    //   const newDiscountInRupees = clientFormData.quotatedPrice-clientFormData.finalPrice;
    //   const newDiscountInPercentage = (newDiscountInRupees/clientFormData.quotatedPrice)*100+"%";
    //   {click.finalPrice === 'false' && setClientFormData( prevState=> ({
    //     ...prevState,
    //     discountInRupees:newDiscountInRupees,
    //     discountInPercentage:newDiscountInPercentage
    //   }))}

    // }

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
    if(clientFormData.quotatedPrice && clientFormData.finalPrice){
      const newDiscountInRupees = clientFormData.quotatedPrice-clientFormData.finalPrice;
      const newDiscountInPercentage = (newDiscountInRupees/clientFormData.quotatedPrice)*100+"%";

      setClientFormData({
        discountInRupees: newDiscountInRupees,
        discountInPercentage: newDiscountInPercentage,
      });

    }
    // else if(clientFormData.quotatedPrice && clientFormData.discountInRupees){
    //   const newFinalPrice = clientFormData.quotatedPrice-clientFormData.discountInRupees;
    //   const newDiscountInPercentage = (clientFormData.discountInRupees/clientFormData.quotatedPrice)*100+"%";
    //   setClientFormData(prevState => ({
      //     ...prevState,
      //     finalPrice: newFinalPrice,
      
      //     discountInPercentage: newDiscountInPercentage
      //   }));
    
  },[clientFormData.quotatedPrice, clientFormData.finalPrice]);

  // useEffect(() => {
  //   const quotatedPrice = parseFloat(clientFormData.quotatedPrice) || 0;
  //   const finalPrice = parseFloat(clientFormData.finalPrice) || 0;
  //   const discountInRupees = parseFloat(clientFormData.discountInRupees) || 0;

  //   if (quotatedPrice && finalPrice) {
  //     const newDiscountInRupees = quotatedPrice - finalPrice;
  //     const newDiscountInPercentage = (newDiscountInRupees / quotatedPrice) * 100;

  //     setClientFormData(prevState => ({
  //       ...prevState,
  //       discountInRupees: newDiscountInRupees.toFixed(2),
  //       discountInPercentage: newDiscountInPercentage.toFixed(2)
  //     }));
  //   } 
  // }, [clientFormData.quotatedPrice, clientFormData.finalPrice, clientFormData.discountInRupees]);

  // console.log("heello",clientFormData);

  return (
    <div className="client-salesman-details">
      <h5 className="client-form-details-heading">Sales Man Details</h5>
      <hr className="client-form-hr" />
      <div className="client-salesman-wrapper client-form-input-wrapper">
        <div>
          <TextInput
            label={"Salesman ID"}
            name={"salesmanId"}
            onFocus={handleClick}
            value={clientFormData.salesmanId}
            onChange={hadleInputChnage}
            click={click.salesmanId}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
          <TextInput
            label={"Name"}
            name={"salesmanName"}
            onFocus={handleClick}
            value={clientFormData.salesmanName}
            onChange={hadleInputChnage}
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
            onFocus={handleClick}
            value={clientFormData.quotatedPrice}
            onChange={hadleInputChnage}
            click={click.quotatedPrice}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
          <TextInput
            label={"Final Price"}
            name={"finalPrice"}
            onFocus={handleClick}
            value={clientFormData.finalPrice}
            onChange={hadleInputChnage}
            click={click.finalPrice}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
          <TextInput
            label={"Discount(Rupees)"}
            name={"discountInRupees"}
            onFocus={handleClick}
            value={clientFormData.discountInRupees}
            onChange={hadleInputChnage}
            click={click.discountInRupees}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
          <TextInput
            label={"Discount(%)"}
            name={"discountInPercentage"}
            onFocus={handleClick}
            value={clientFormData.discountInPercentage}
            onChange={hadleInputChnage}
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
            onFocus={handleClick}
            value={clientFormData.discountAmount}
            onChange={hadleInputChnage}
            click={click.discountAmount}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
          <TextInput
            label={"Final Amount"}
            name={"finalAmount"}
            onFocus={handleClick}
            value={clientFormData.finalAmount}
            onChange={hadleInputChnage}
            click={click.finalAmount}
            onBlur={handleClickFalse}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientSalesManDetails;
