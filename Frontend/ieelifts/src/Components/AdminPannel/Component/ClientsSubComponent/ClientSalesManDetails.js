import { useState, useEffect } from "react";
import React from "react";
import TextInput from "../ClientsSubComponent/ClientsReusableComponent/TextInput";

const ClientSalesManDetails = ({ onDataChange }) => {
  const [clientFormData, setClientFormData] = useState({
    salesmanId: "",
    salesmanName: "",
    finalPrice: "",
    quotatedPrice: "",
    discountInRupees: "",
    discountInPercentage: "",
    discountAmount: "",
    finalAmount: "",
  });

  const [click, setClick] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientFormData((prevClientFormData) => {
      const updatedFormData = { ...prevClientFormData, [name]: value };
      // valueCalucalte(name, value, updatedFormData); // Pass the updated form data to the calculation function
      return updatedFormData;
    });
  };

  const handleClick = (e) => {
    const { name } = e.target;
    setClick({ ...click, [name]: true });
  };

  const handleClickFalse = (e) => {
    const { name } = e.target;
    setClick({ ...click, [name]: false });
  };

  const calculateValues = (e) => {
    const {
      quotatedPrice,
      finalPrice,
      discountInRupees,
      discountInPercentage,
      discountAmount,
    } = clientFormData;
    const contentname = e.target.name;
    const pricevalue = Number(e.target.value);

    // console.log(">>>>>>>>>>",contentname, pricevalue)

    if (contentname === "quotatedPrice" && finalPrice > 0) {
      const result = pricevalue - finalPrice;
      const percentage = (result / pricevalue) * 100;
      setClientFormData((prev) => ({
        ...prev,
        discountInRupees: result,
        discountInPercentage: percentage,
      }));
    } else if (contentname === "finalPrice") {
      const result = quotatedPrice - pricevalue;
      const percentage = ((result / quotatedPrice) * 100).toFixed(2);
      setClientFormData((prev) => ({
        ...prev,
        discountInRupees: result,
        discountInPercentage: percentage,
      }));
    } else if (contentname === "discountInRupees") {
      const result = quotatedPrice - discountInRupees;
      const percentage = ((discountInRupees / quotatedPrice) * 100).toFixed(2);
      setClientFormData((prev) => ({
        ...prev,
        finalPrice: result,
        discountInPercentage: percentage,
      }));
    } else if (contentname === "discountInPercentage" && pricevalue <= 100) {
      const result = quotatedPrice * (pricevalue / 100);
      const price = quotatedPrice - result;
      setClientFormData((prev) => ({
        ...prev,
        discountInRupees: result,
        finalPrice: price,
      }));
    }

    if (contentname === "discountAmount") {
      const fAmount = finalPrice - discountAmount;
      setClientFormData((prev) => ({
        ...prev,
        finalAmount: fAmount,
      }));
    }
  };
  useEffect(() => {
    onDataChange(clientFormData);
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
            onFocus={handleClick}
            value={clientFormData.salesmanId}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            click={click.salesmanName}
            onBlur={handleClickFalse}
          />
        </div>
      </div>
      <div className="client-form-input-wrapper quotation">Quotation</div>
      <div className="quotation-container client-form-input-wrapper">
        <div >
          <TextInput
            label={"Quotated Price"}
            name={"quotatedPrice"}
            onFocus={handleClick}
            value={clientFormData.quotatedPrice}
            onChange={handleInputChange}
            click={click.quotatedPrice}
            onBlur={(e) => {
              handleClickFalse(e);
              calculateValues(e);
            }}
          />
        </div>
        <div className={`${clientFormData.quotatedPrice===""?"disabled":""}`}>
          <TextInput
            label={"Final Price"}
            name={"finalPrice"}
            onFocus={handleClick}
            value={clientFormData.finalPrice}
            onChange={handleInputChange}
            click={click.finalPrice}
            onBlur={(e) => {
              handleClickFalse(e);
              calculateValues(e);
            }}
          />
        </div>
        <div className={`${clientFormData.quotatedPrice===""?"disabled":""}`} >
          <TextInput
            label={"Discount(Rupees)"}
            name={"discountInRupees"}
            onFocus={handleClick}
            value={clientFormData.discountInRupees}
            onChange={handleInputChange}
            click={click.discountInRupees}
            onBlur={(e) => {
              handleClickFalse(e);
              calculateValues(e);
            }}
          />
        </div>
        <div className={`${clientFormData.quotatedPrice===""?"disabled":""}`}>
          <TextInput
            label={"Discount(%)"}
            name={"discountInPercentage"}
            onFocus={handleClick}
            value={
              clientFormData.discountInPercentage < 0
                ? 0
                : clientFormData.discountInPercentage
            }
            onChange={handleInputChange}
            click={click.discountInPercentage}
            onBlur={(e) => {
              handleClickFalse(e);
              calculateValues(e);
            }}
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
            onChange={handleInputChange}
            click={click.discountAmount}
            onBlur={(e) => {
              handleClickFalse(e);
              calculateValues(e);
            }}
          />
        </div>
        <div className={`${clientFormData.finalAmount===""?"disabled":""}`}>
          <TextInput
            label={"Final Amount"}
            name={"finalAmount"}
            onFocus={handleClick}
            value={clientFormData.finalAmount}
            onChange={handleInputChange}
            click={click.finalAmount}
            onBlur={(e) => {
              handleClickFalse(e);
              calculateValues(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientSalesManDetails;
