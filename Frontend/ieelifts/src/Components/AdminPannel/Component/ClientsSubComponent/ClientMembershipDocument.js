// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React, { useState, useEffect, useMemo } from "react";
import AnimatedInput from "../ClientsSubComponent/ClientsReusableComponent/AnimatedInput";
import FileUploader from "../ClientsSubComponent/ClientsReusableComponent/FileUploader";
const ClientMembershipDocument = ({ onDataChange, initialValues }) => {
  const [selectedMembership, setSelectedMembership] = useState("Warranty");
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [membershipData, setMembershipData] = useState({
    selectedMembership: "Warranty",
    signedQuotation: "",
    paymentForm: "",
    salesOrder: "",
    chequeForm: "",
  });

  //handler
  const handleMembershipChange = (membership) => {
    setMembershipData({
      ...membershipData,
      selectedMembership: membership,
    });
  };

  const handleFileSelect = (file, label) => {
    switch (label) {
      case "Signed Quotation":
        setMembershipData({
          ...membershipData,
          signedQuotation: file,
        });
        break;
      case "Payment Form":
        setMembershipData({
          ...membershipData,
          paymentForm: file,
        });
        break;
      case "Cheque form":
        setMembershipData({
          ...membershipData,
          chequeForm: file,
        });
        break;
      case "Sales Order":
        setMembershipData({
          ...membershipData,
          salesOrder: file,
        });
        break;
      default:
        break;
    }
  };
  // console.log("membershipData==>",membershipData);
  useEffect(() => {
    onDataChange(membershipData);
   
  }, [membershipData]);
  useMemo(() => {
    // console.log(initialValues);
    setMembershipData(initialValues);
  }, [initialValues]);
  return (
    <div className="client-membership-document">
      <h5 className="client-form-details-heading">Client's Membership</h5>
      <hr className="client-form-hr" />
      <div className="client-warranty-container">
        <div
          className={`warranty-button ${
            membershipData.selectedMembership === "Warranty" ? "selected" : ""
          }`}
          onClick={() => handleMembershipChange("Warranty")}
        >
          Warranty
        </div>
        <div
          className={`warranty-button ${
            membershipData.selectedMembership === "Silver" ? "selected" : ""
          }`}
          onClick={() => handleMembershipChange("Silver")}
        >
          Silver
        </div>
        <div
          className={`warranty-button ${
            membershipData.selectedMembership === "Gold" ? "selected" : ""
          }`}
          onClick={() => handleMembershipChange("Gold")}
        >
          Gold
        </div>
        <div
          className={`warranty-button ${
            membershipData.selectedMembership === "Platinum" ? "selected" : ""
          }`}
          onClick={() => handleMembershipChange("Platinum")}
        >
          Platinum
        </div>
      </div>
      <h5 className="client-form-details-heading client-document">Document</h5>
      <hr className="client-form-hr" />
      <div className="client-document-child-wrapper client-form-input-wrapper">
        <div>
          <FileUploader
            label={"Signed Quotation"}
            onFileSelect={handleFileSelect}
            apiDataName={initialValues.signedQuotation}
          />
        </div>
        <div>
          <FileUploader
            label={"Payment Form"}
            onFileSelect={handleFileSelect}
            apiDataName={initialValues.paymentForm}
          />
        </div>
        <div>
          <FileUploader
            label={"Cheque form"}
            onFileSelect={handleFileSelect}
            apiDataName={initialValues.chequeForm}
          />
        </div>
        <div>
          <FileUploader
            label={"Sales Order"}
            onFileSelect={handleFileSelect}
            apiDataName={initialValues.salesOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientMembershipDocument;
