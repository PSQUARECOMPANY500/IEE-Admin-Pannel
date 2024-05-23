// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React, { useEffect, useState } from "react";
import AnimatedInput from "./ClientsReusableComponent/AnimatedInput";
import ClientDropdown from "./ClientsReusableComponent/ClientDropdown";
import TextInputs from "./ClientsReusableComponent/TextInput";

const ClientFormDetails = ({ onDataChange }) => {
  const [clientFormData, setClientFormData] = useState({
    jon: "",
    userName: "",
    phoneNumber: "",
    alternativeNumber: "",
    email: "",
    reference: "",
    referenceName: "",
    sourceOfLead: "",
  });

  const [click, setClick] = useState({});
  const sourceOfLead = [
    "Website",
    "Reference",
    "Builder",
    "client",
    "Architect",
  ];

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
  
  const handleDropdown = (name, data) => {
    setClientFormData({ ...clientFormData, [name]: data });
  };

  useEffect(() => {
    onDataChange(clientFormData);
  }, [clientFormData]);

  return (
    <div className="client-form-details">
      <h5 className="client-form-details-heading">Client's Details</h5>
      <hr className="client-form-hr" />
      <div className="client-form-input-wrapper">
        <div className="client-form-input-wrapper-child">
          <TextInputs
            label={"JON"}
            name={"jon"}
            onFocus={handleClick}
            value={clientFormData.jon}
            onChange={hadleInputChnage}
            click={click.jon}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
          <TextInputs
            label={"Name"}
            name={"userName"}
            onFocus={handleClick}
            value={clientFormData.userName}
            onChange={hadleInputChnage}
            click={click.userName}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
          <TextInputs
            label={"Phone number"}
            name={"phoneNumber"}
            onFocus={handleClick}
            value={clientFormData.phoneNumber}
            onChange={hadleInputChnage}
            click={click.phoneNumber}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
          <TextInputs
            label={"Alternative number"}
            name={"alternativeNumber"}
            onFocus={handleClick}
            value={clientFormData.alternativeNumber}
            onChange={hadleInputChnage}
            click={click.alternativeNumber}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
          <TextInputs
            label={"Email"}
            name={"email"}
            onFocus={handleClick}
            value={clientFormData.email}
            onChange={hadleInputChnage}
            click={click.email}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
          <ClientDropdown
            label={"Source of Lead"}
            options={sourceOfLead}
            onValueChange={handleDropdown}
            name={"sourceOfLead"}
          />
        </div>
        <div>
          <TextInputs
            label={"Reference"}
            name={"reference"}
            onFocus={handleClick}
            value={clientFormData.reference}
            onChange={hadleInputChnage}
            click={click.reference}
            onBlur={handleClickFalse}
          />
        </div>
        <div>
          <TextInputs
            label={"Refernce Name"}
            name={"referenceName"}
            onFocus={handleClick}
            value={clientFormData.referenceName}
            onChange={hadleInputChnage}
            click={click.referenceName}
            onBlur={handleClickFalse}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientFormDetails;
