// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ClientFormDetails from "./ClientFormDetails";
import ClientSalesManDetails from "./ClientSalesManDetails";
import ClientMembershipDocument from "./ClientMembershipDocument";
import ClientArchitect from "./ClientArchitect";
import Clientbutton from "./ClientsReusableComponent/Clientbutton";
import ClientFormElevatorDetails from "./ClientFormElevatorDetails";
import ClientFormDimentions from "./ClientFormDimentions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  closeClientModalAction,
  updateClientData,
} from "../../../../ReduxSetup/Actions/AdminActions";

import { RegisterClientDataAction ,updateClientFormUsingPagination} from "../../../../ReduxSetup/Actions/AdminActions";

const ClientForm = () => {
  //state
  const [allFormData, setAllFormData] = useState({
    clientFormDetails: {},
    clientSalesManDetails: {},
    clientMembershipDocument: {},
    clientArchitect: {},
  });
  // console.log("allFormData====>", allFormData)
  const [clientElevatorDetails, setClientElevatorDetails] = useState();
  const [dimentionsData, setDimentionsData] = useState({})
  const dispatch = useDispatch();
  const [valforDimention, setValForDimention] = useState();
  const [Flevel, setFLevel] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [validate, setValidate]= useState(false)  //validation for dimensions
  const [validateNextBtn,setValidateNextBtn] = useState()
  const clientModalOperation = useSelector(
    (state) => state.AdminRootReducer.openAddClientModalReducer.isModalOpen
  );
  const {jon}= allFormData.clientFormDetails;
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);
  useEffect(()=>{
    console.log("dimentionsData--->",dimentionsData);
  },[dimentionsData])

  //handler
  const validateData =(data)=>{  //handler for validation data
    setValidate(data)
    console.log("Parent--validate--->",data)
  }
  const handleDimenstionsData =(data)=>{  //handle Dimenstions data from dimenstion component
    setDimentionsData(data)
  }
  const handleClientFormDetails = (data) => { 
    setAllFormData((prev) => ({
      ...prev,
      clientFormDetails: data,
    }));
  };
  const handleClientSalesManDetails = (data) => {
    setAllFormData((prev) => ({
      ...prev,
      clientSalesManDetails: data,
    }));
  };
  const handleClientMembershipDocument = (data) => {
    setAllFormData((prev) => ({
      ...prev,
      clientMembershipDocument: data,
    }));
  };

  const handleClientArchitect = (data) => {
    setAllFormData((prev) => ({
      ...prev,
      clientArchitect: data,
    }));
  };
  const handleElevatorDetails = (data) => {
    setClientElevatorDetails(data);
  };

  const handleNextPage = () => {
    setToggle(false);

    const { clientFormDetails, clientArchitect, clientSalesManDetails } =
      allFormData;

    const formData = new FormData();
    formData.append(
      "signedQuotation",
      allFormData.clientMembershipDocument.signedQuotation
    );
    formData.append(
      "paymentForm",
      allFormData.clientMembershipDocument.paymentForm
    );
    formData.append(
      "salesOrder",
      allFormData.clientMembershipDocument.salesOrder
    );
    formData.append(
      "chequeForm",
      allFormData.clientMembershipDocument.chequeForm
    );

    formData.append("clientFormDetails", JSON.stringify(clientFormDetails));
    formData.append(
      "clientSalesManDetails",
      JSON.stringify(clientSalesManDetails)
    );
    formData.append("clientArchitect", JSON.stringify(clientArchitect));
    dispatch(RegisterClientDataAction(formData));
  };

  const handlePreviousPage = () => {
    setToggle(true);
  };

  const closeModal = () => {
    dispatch(closeClientModalAction());
    setToggle(true);
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("add-client-wrapper")) {
      closeModal();
    }
  };

  const handleSecndStep = () => {
    const {
      basementSelection,
      capacity,
      capacityUnit,
      constructionMaterial,
      degree,
      doorType,
      elevatorOpenings,
      groundOrStilt,
      numberOfOpenings,
      pitDepth,
      purpose,
      remarks,
      stops,
      type,
    } = clientElevatorDetails;
    const elevatorDetails = {
      JON: jon,
      capacity: capacity,
      capacityUnit:capacityUnit,
      constructionMaterial: constructionMaterial,
      doorType: doorType,
      levelOpening: elevatorOpenings.map(({ level, openings }) => ({
        level: level,
        opening: openings.filter((opening) => opening !== ""),
      })),
      pitDepth: pitDepth,
      purpose: purpose,
      remarks: remarks,
      sideOpening: Object.values(degree)
        .filter((value) => value !== "")
        .map((value) => value),
      stops: {
        numberOfStops: stops,
        Basement: Object.entries(basementSelection)
          .filter(([key, value]) => value === true)
          .map(([key]) => key),
        FloorType: groundOrStilt,
      },
      type: type,
      numberOfOpenings:numberOfOpenings
    };
    
  // handle client form validation 
  
  

 
    // const elevatorDetails = {
    //   JON: 2024031,
    //   capacity: "222",
    //   constructionMaterial: "option1",
    //   doorType: "option2",
    //   levelOpening: [
    //     { level: "Basement 2", opening: ["original"] },
    //     { level: "Basement 1", opening: ["90dL"] },
    //     { level: "Ground", opening: ["original", "90dL"] },

    //     { level: "Level 1", opening: ["original", "90dL"] },

    //     { level: "Level 2", opening: ["90dL"] },

    //     { level: "Level 3", opening: ["90dL"] },
    //     { level: "Level 4", opening: ["90dL", "original"] },
    //   ],
    //   pitDepth: "dfsdf",
    //   purpose: "Hospital",
    //   remarks: "dasda",
    //   sideOpening: ["original","90dL"],
    //   stops: {
    //     numberOfOpenings: 2,
    //     Basement: ["b1", "b2"],
    //     FloorType: "G" ,
    //   },
    //   type: "gearless",
    // };

    dispatch(updateClientData((elevatorDetails)));
    console.log(elevatorDetails);
  };

 //handle data in third step using pagination
//----------------------------------------------------------------
   const handleThirdStep = ()=>{
    dispatch(updateClientFormUsingPagination(dimentionsData,jon))
   }
//----------------------------------------------------------------
  function validateClientForm(allFormData){
    const { clientFormDetails,clientSalesManDetails,clientMembershipDocument } =
    allFormData;
    const {selectedMembership,signedQuotation,paymentForm,salesOrder}=clientMembershipDocument;   
    const {jon,userName,phoneNumber,alternativeNumber,email,reference,referenceName,sourceOfLead}= clientFormDetails;
    const {finalPrice,quotatedPrice,discountInRupees,discountInPercentage,discountAmount,finalAmount}=clientSalesManDetails;
    if(!jon ||!userName ||!phoneNumber ||!alternativeNumber ||!email){
      return false;
    }
    if(sourceOfLead==="Reference"){
      if(!reference ||!referenceName){
        return false;
      }else{
        return true;
      }
    }
    if(!selectedMembership||!signedQuotation ||!paymentForm ||!salesOrder){
      return false;
    }
    if(!finalPrice||!quotatedPrice||!discountInRupees||!discountInPercentage||!discountAmount||!finalAmount){
      return false;
    }
    return true;
  }
  
 //-------------------------------------------------------------------------
 useEffect(()=>{
  const val = validateClientForm(allFormData);
  setValidateNextBtn(val)
 },[allFormData])
 //------------------------------------------------------------------------
  return (
    <>
      {clientModalOperation && (
        <div className="add-client-wrapper" onClick={handleOverlayClick}>
          <div className="add-client-modal">
            <div className="cross-icon" style={{ cursor: "pointer" }}>
              <RxCross2 onClick={closeModal} />
            </div>
            <div>
              {toggle ? (
                <div className="client-form-container">
                  <ClientFormDetails onDataChange={handleClientFormDetails} />
                  <ClientSalesManDetails
                    onDataChange={handleClientSalesManDetails}
                  />
                  <ClientMembershipDocument
                    onDataChange={handleClientMembershipDocument}
                  />
                  <ClientArchitect onDataChange={handleClientArchitect} />
                  <div className="button-container">
                    <Clientbutton
                      value={"Delete"}
                      className={"client-form-button-red"}
                    />
                   
                   <div className={`${validateNextBtn?"":"disabled"}`}>
                    <Clientbutton
                      value={"Next"}
                      className={"client-form-button-yellow"}
                      handleAction={handleNextPage}
                      // onClick={handleSubmmitEnggData}
                    />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="client-form-next-container">
                  <ClientFormElevatorDetails
                    setValForDimention={setValForDimention}
                    setFLevel={setFLevel}
                    Flevel={Flevel}
                    onDataChange={handleElevatorDetails}
                    validateData={validateData}
                  />
                  <ClientFormDimentions
                    valforDimention={valforDimention}
                    Flevel={Flevel}
                    // validateData={validate}
                    validate={validate}
                    forSecondClick={() => {
                      handleSecndStep();
                    }}
                    onDataChange={handleDimenstionsData}
                  />
                  <div className="button-container">
                    <Clientbutton
                      value={"Back"}
                      className={"client-form-button-yellow"}
                      handleAction={handlePreviousPage}
                    />
                    <Clientbutton
                      value={"Submit"}
                      className={"client-form-button-submit"}
                      handleAction ={handleThirdStep}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientForm;

// <-----------------------------  Author:- Rahul kumar ----------------------------------->
