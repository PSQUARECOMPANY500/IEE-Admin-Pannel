// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React, { useEffect, useMemo, useState,useRef } from "react";
import AnimatedInput from "./ClientsReusableComponent/AnimatedInput";
import ClientDropdown from "./ClientsReusableComponent/ClientDropdown";
import TextInputs from "./ClientsReusableComponent/TextInput";

const ClientFormDetails = ({ onDataChange,initialValues }) => {
 
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
 
  // const { jon, userName, phoneNumber, alternativeNumber, email, reference, referenceName, sourceofLead } = initialValues;
  const [click, setClick] = useState({});
  const sourceOfLead = [
    "Website",
    "Reference",
    "Builder",
    "client",
    "Architect",
  ];
  const [emailError, setEmailError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hadleInputChnage = (e) => {
    const { name, value } = e.target;
    setClientFormData({ ...clientFormData, [name]: value });
    if (name === 'email') {
      if (!emailRegex.test(value)) {
        setEmailError('Invalid email address');
      } else {
        setEmailError('valid email address');
      }
    }
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
   useMemo(()=>{
    setClientFormData(initialValues)
   },[initialValues])
// console.log("emailError===>",emailError);
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
            type={"email"}
          />
        </div>
        <div>
          <ClientDropdown
            label={"Source of Lead"}
            options={sourceOfLead}
            onValueChange={handleDropdown}
            name={"sourceOfLead"}
            value={clientFormData.sourceOfLead}

          />
        </div>
        <div className={`${clientFormData.sourceOfLead==="Reference"?"":"disabled"}`}>
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
        <div className={`${clientFormData.sourceOfLead==="Reference"?"":"disabled"}`}>
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
