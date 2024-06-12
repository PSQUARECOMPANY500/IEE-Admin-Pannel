// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React, { useEffect, useState, useCallback } from "react";
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
import debounce from "../../../../utils/debounce";
import toast, { Toaster } from "react-hot-toast";
import {
  closeClientModalAction,
  updateClientData,
  getDataBasedOnJon,
  putDataBasedOnJon,
} from "../../../../ReduxSetup/Actions/AdminActions";

import {
  RegisterClientDataAction,
  updateClientFormUsingPagination,
} from "../../../../ReduxSetup/Actions/AdminActions";

const ClientForm = () => {
  //state
  const [allFormData, setAllFormData] = useState({
    clientFormDetails: {},
    clientSalesManDetails: {},
    clientMembershipDocument: {},
    clientArchitect: {},
  });
  const [clientElevatorDetails, setClientElevatorDetails] = useState();
  const [dimentionsData, setDimentionsData] = useState({});
  const dispatch = useDispatch();
  const [valforDimention, setValForDimention] = useState();
  const [Flevel, setFLevel] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [validate, setValidate] = useState(false); //validation for dimensions
  const [validateNextBtn, setValidateNextBtn] = useState();
  const [prevClientDetails, setPrevClientDetails] = useState([]);
  const [prevData, setPrevData] = useState(false);
  const clientModalOperation = useSelector(
    (state) => state.AdminRootReducer.openAddClientModalReducer.isModalOpen
  );
  const clientData = useSelector(
    (state) =>
      state?.AdminRootReducer?.ClientFormDataFromApiReducer?.ClientFormData
  );

  const { jon } = allFormData.clientFormDetails;
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  //handler
  const validateData = (data) => {
    setValidate(data);
  };
  const handleDimenstionsData = (data) => {
    setDimentionsData(data);
  };
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
  //------------------handle next page-------------------
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

    if (prevData) {
      dispatch(RegisterClientDataAction(formData));
    } else {
      dispatch(RegisterClientDataAction(formData));
    }
  };
  //-----------------------------------------------------
  const handlePreviousPage = () => {
    setToggle(true);
  };

  const closeModal = () => {
    setAllFormData({
      clientFormDetails: {},
      clientSalesManDetails: {},
      clientMembershipDocument: {},
      clientArchitect: {},
    });
    dispatch(closeClientModalAction());
    setToggle(true);
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("add-client-wrapper")) {
      setAllFormData({
        clientFormDetails: {},
        clientSalesManDetails: {},
        clientMembershipDocument: {},
        clientArchitect: {},
      });
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
      capacityUnit: capacityUnit,
      constructionMaterial: constructionMaterial,
      doorType: doorType,
      levelOpening: elevatorOpenings.map(({ level, openings }) => ({
        level: level,
        openings: openings.filter((opening) => opening !== ""),
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
      numberOfOpenings: numberOfOpenings,
    };

    dispatch(updateClientData(elevatorDetails));
  };

  //handle data in third step using pagination
  //----------------------------------------------------------------
  const handleThirdStep = () => {
    dispatch(updateClientFormUsingPagination(dimentionsData, jon));
    toast.success("client details added");
    closeModal();
  };
  //----------------------------------------------------------------
  function validateClientForm(allFormData) {
    const {
      clientFormDetails,
      clientSalesManDetails,
      clientMembershipDocument,
    } = allFormData;
    const { selectedMembership, signedQuotation, paymentForm, salesOrder } =
      clientMembershipDocument;
    const {
      jon,
      userName,
      phoneNumber,
      alternativeNumber,
      email,
      reference,
      referenceName,
      sourceOfLead,
    } = clientFormDetails;
    const {
      finalPrice,
      quotatedPrice,
      discountInRupees,
      discountInPercentage,
      discountAmount,
      finalAmount,
    } = clientSalesManDetails;
    if (!jon || !userName || !phoneNumber || !alternativeNumber || !email) {
      return false;
    }
    if (sourceOfLead === "Reference") {
      if (!reference || !referenceName) {
        return false;
      } else {
        return true;
      }
    }
    if (
      !signedQuotation ||
      !paymentForm ||
      !salesOrder
    ) {
      return false;
    }
    if (
      !finalPrice ||
      !quotatedPrice ||
      !discountInRupees ||
      !discountInPercentage ||
      !discountAmount ||
      !finalAmount
    ) {
      return false;
    }
    return true;
  }

  //-------------------------------------------------------------------------
  useEffect(() => {
    const val = validateClientForm(allFormData);
    setValidateNextBtn(val);
  }, [allFormData]);
  //-------------------------------------------------------------------------

  const fetchData = async (jon) => {
    try {
      const data = await getDataBasedOnJon(jon);
      dispatch(putDataBasedOnJon(data));
     
      if (data?.response) {
        const clientFormDetails = data?.response.clientFormDetails;

        const clientSalesManDetails = data?.response?.clientSalesManDetails;

        const clientMembershipDocument =
          data?.response?.clientMembershipDocument;

        const clientArchitect = data?.response?.clientArchitect;

        const elevatorDetails = data?.response?.elevatorDetails;

        const dimensions = data?.response?.dimensions;

        // Update state with fetched data
        setAllFormData({
          clientFormDetails: clientFormDetails,
          clientSalesManDetails: clientSalesManDetails,
          clientMembershipDocument: clientMembershipDocument,
          clientArchitect: clientArchitect,
        });
        setClientElevatorDetails(elevatorDetails);
        setDimentionsData(dimensions);
      }
    } catch (error) {
      
      setAllFormData({
        clientFormDetails: {},
        clientSalesManDetails: {},
        clientMembershipDocument: {},
        clientArchitect: {},
      });
    }
  };
  useEffect(() => {
    fetchData(jon);
  }, [jon]);
  const debouncedFetchData = useCallback(debounce(fetchData, 1000), []);
  useEffect(() => {
    if (jon) {
      debouncedFetchData(jon);
    }
  }, [jon, debouncedFetchData]);
  //------------------------------------------------------------------------
  const handleReset = () => {
    setAllFormData({
      clientFormDetails: {},
      clientSalesManDetails: {},
      clientMembershipDocument: {},
      clientArchitect: {},
    }); 
  };
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
                 <div className="client-form-left-container">
                 <ClientFormDetails
                    onDataChange={handleClientFormDetails}
                    initialValues={allFormData.clientFormDetails}
                  />
                  <ClientMembershipDocument
                    onDataChange={handleClientMembershipDocument}
                    initialValues={allFormData.clientMembershipDocument}
                  />
                 </div>
                 <div>
                 <ClientSalesManDetails
                    onDataChange={handleClientSalesManDetails}
                    initialValues={allFormData.clientSalesManDetails}
                  />
                  
                  <ClientArchitect
                    onDataChange={handleClientArchitect}
                    initialValues={allFormData.clientArchitect}
                  />
                 </div>
                  <div className="button-container">
                    <Clientbutton
                      value={"Reset"}
                      className={"client-form-button-red"}
                      handleAction={handleReset}
                      
                    />

                    <div className={`${!validateNextBtn ? "" : "disabled"}`}>
                      <Clientbutton
                        value={"Next"}
                        className={"client-form-button-yellow"}
                        handleAction={handleNextPage} 
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
                    initialValues={clientElevatorDetails}
                    prevData={prevData}
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
                    initialValues={dimentionsData}
                    changeInStops={clientElevatorDetails?.stops}
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
                      handleAction={handleThirdStep}
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
