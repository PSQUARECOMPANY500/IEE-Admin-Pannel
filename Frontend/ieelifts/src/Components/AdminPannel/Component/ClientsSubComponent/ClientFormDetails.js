// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React, { useEffect, useMemo, useState,useRef } from "react";
import ClientDropdown from "./ClientsReusableComponent/ClientDropdown";
import TextInputs from "./ClientsReusableComponent/TextInput";

const ClientFormDetails = ({ onDataChange,initialValues }) => {
 
  const [clientFormData, setClientFormData] = useState({
    jon: "",
    userName: "",
    phoneNumber: "",
    alternativeNumber: "",
    email: "",
    dateOfHandover:"",
    address:"",
    pincode:"",
    state:"",
    district:"",
    city:"",
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
  const [emailError, setEmailError] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hadleInputChnage = (e) => {
    const { name, value } = e.target;
    setClientFormData({ ...clientFormData, [name]: value });
    if (name === 'email') {
      if (!emailRegex.test(value)) {
        setEmailError(true);
      } else {
        setEmailError(false);
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
  useEffect(() => {
    if (clientFormData.email) {
      setEmailError(!emailRegex.test(clientFormData.email));
    }
  }, [clientFormData.email]);
   useMemo(()=>{
    setClientFormData(initialValues)
   },[initialValues])
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
            emailError={emailError}
          /> 
         
        </div>
        <div>
           <TextInputs
            label={"Date of handover"}
            name={"dateOfHandover"}
            onFocus={handleClick}
            value={clientFormData.dateOfHandover}
            onChange={hadleInputChnage}
            click={click.dateOfHandover}
            onBlur={handleClickFalse}
          />        
        </div>
        <div className="address-container">
           <TextInputs
            label={"address"}
            name={"address"}
            onFocus={handleClick}
            value={clientFormData.address}
            onChange={hadleInputChnage}
            click={click.address}
            onBlur={handleClickFalse}
       
          /> 
         
        </div>
        <div>
           <TextInputs
            label={"pincode"}
            name={"pincode"}
            onFocus={handleClick}
            value={clientFormData.pincode}
            onChange={hadleInputChnage}
            click={click.pincode}
            onBlur={handleClickFalse}
    
          /> 
         
        </div>
        <div>
           <TextInputs
            label={"state"}
            name={"state"}
            onFocus={handleClick}
            value={clientFormData.state}
            onChange={hadleInputChnage}
            click={click.state}
            onBlur={handleClickFalse}
           
          /> 
         
        </div>
        <div>
           <TextInputs
            label={"district"}
            name={"district"}
            onFocus={handleClick}
            onChange={hadleInputChnage}
            value={clientFormData.district}
            click={click.district}
            onBlur={handleClickFalse}
          />  
        </div>
        <div>
           <TextInputs
            label={"city"}
            name={"city"}
            onFocus={handleClick}
            value={clientFormData.city}
            onChange={hadleInputChnage}
            click={click.city}
            onBlur={handleClickFalse}
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
        {/* <div className={`${clientFormData.sourceOfLead==="Reference"?"":"disabled"}`}>
          <TextInputs
            label={"Reference"}
            name={"reference"}
            onFocus={handleClick}
            value={clientFormData.reference}
            onChange={hadleInputChnage}
            click={click.reference}
            onBlur={handleClickFalse}
          />
        </div> */}
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
