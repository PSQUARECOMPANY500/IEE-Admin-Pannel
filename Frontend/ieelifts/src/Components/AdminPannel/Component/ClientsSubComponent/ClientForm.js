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
import { closeClientModalAction } from "../../../../ReduxSetup/Actions/AdminActions";


import { RegisterClientDataAction } from "../../../../ReduxSetup/Actions/AdminActions";



const ClientForm = () => {
   //state
  const [allFormData,setAllFormData]=useState({
    clientFormDetails:{},
    clientSalesManDetails:{},
    clientMembershipDocument:{},
    clientArchitect:{}
  }); 
  const dispatch = useDispatch();
  const [valforDimention, setValForDimention] = useState();
  const [Flevel,setFLevel]=useState([])
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
  const handleClientFormDetails =(data)=>{
      setAllFormData((prev)=>({
        ...prev,
        clientFormDetails:data
      }))
  }
  const handleClientSalesManDetails=(data)=>{
    setAllFormData((prev)=>({
      ...prev,
      clientSalesManDetails:data
    }))
  }
  const handleClientMembershipDocument=(data)=>{
    setAllFormData((prev)=>(
      {
        ...prev,
        clientMembershipDocument:data
      }
    ))
  }

  const handleClientArchitect =(data)=>{
    setAllFormData((prev)=>(
      {
        ...prev,
        clientArchitect:data
      }
    ))
  }

  

  const handleNextPage = () => {
    setToggle(false);
    //-----------------------------
    console.log("All Form Data---------------:", allFormData.clientMembershipDocument);
    console.log("All Form Data:", allFormData);

    const formData = new FormData();
    formData.append("signedQuotation", allFormData.clientMembershipDocument.signedQuotation || '');
    formData.append("paymentForm", allFormData.clientMembershipDocument.paymentForm || '');
    formData.append("salesOrder", allFormData.clientMembershipDocument.salesOrder || '');
    formData.append("chequeForm", allFormData.clientMembershipDocument.chequeForm || '');


    const {clientFormDetails,clientArchitect,clientMembershipDocument,clientSalesManDetails} = allFormData

    dispatch(RegisterClientDataAction(clientFormDetails,clientSalesManDetails,clientMembershipDocument,clientArchitect))

  };








  const handlePreviousPage=()=>{
    setToggle(true)
  }

  const closeModal = () => {
    dispatch(closeClientModalAction());
    setToggle(true);
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("add-client-wrapper")) {
      closeModal();
    }
  };
  // console.log(allFormData)
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
                  <ClientSalesManDetails onDataChange={handleClientSalesManDetails} />
                  <ClientMembershipDocument onDataChange={handleClientMembershipDocument} />
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
                  <ClientFormElevatorDetails setValForDimention={setValForDimention} setFLevel={setFLevel} Flevel={Flevel}/>
                  <ClientFormDimentions valforDimention={valforDimention} Flevel={Flevel} validate={false}/>
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
