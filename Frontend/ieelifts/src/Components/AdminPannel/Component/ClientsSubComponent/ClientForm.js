// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ClientFormDetails from "./ClientFormDetails";
import ClientSalesManDetails from "./ClientSalesManDetails";
import ClientMembershipDocument from "./ClientMembershipDocument";
import ClientArchitect from "./ClientArchitect";
import Clientbutton from "./ClientsReusableComponent/Clientbutton";
import ClientFormElevatorDetials from "./ClientFormElevatorDetails";
import ClientFormElevatorDetails from "./ClientFormElevatorDetails";
import ClientFormDimentions from "./ClientFormDimentions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  closeClientModalAction,
  updateClientData,
} from "../../../../ReduxSetup/Actions/AdminActions";

import { RegisterClientDataAction } from "../../../../ReduxSetup/Actions/AdminActions";

const ClientForm = () => {
  //state
  const [allFormData, setAllFormData] = useState({
    clientFormDetails: {},
    clientSalesManDetails: {},
    clientMembershipDocument: {},
    clientArchitect: {},
  });
  const [clientElevatorDetails, setClientElevatorDetails] = useState();
  const dispatch = useDispatch();
  const [valforDimention, setValForDimention] = useState();
  const [Flevel, setFLevel] = useState([]);
  const [toggle, setToggle] = useState(true);

  const clientModalOperation = useSelector(
    (state) => state.AdminRootReducer.openAddClientModalReducer.isModalOpen
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  //handler
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

    // console.log("clientFormDetails-0-------: ", clientFormDetails);
    // const clientMembershipDocument = {
    //   signedQuotation: allFormData.clientMembershipDocument.signedQuotation,
    //   paymentForm: allFormData.clientMembershipDocument.paymentForm,
    //   salesOrder: allFormData.clientMembershipDocument.salesOrder,
    //   chequeForm: allFormData.clientMembershipDocument.chequeForm
    // };

    // const {clientFormDetails,clientArchitect,clientSalesManDetails} = allFormData

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
      JON: 2024031,
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

  console.log("Heelo dear", clientElevatorDetails);

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
                    <Clientbutton
                      value={"Next"}
                      className={"client-form-button-yellow"}
                      handleAction={handleNextPage}
                      // onClick={handleSubmmitEnggData}
                    />
                  </div>
                </div>
              ) : (
                <div className="client-form-next-container">
                  <ClientFormElevatorDetails
                    setValForDimention={setValForDimention}
                    setFLevel={setFLevel}
                    Flevel={Flevel}
                    onDataChange={handleElevatorDetails}
                  />
                  <ClientFormDimentions
                    valforDimention={valforDimention}
                    Flevel={Flevel}
                    validate={true}
                    forSecondClick={() => {
                      handleSecndStep();
                    }}
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
