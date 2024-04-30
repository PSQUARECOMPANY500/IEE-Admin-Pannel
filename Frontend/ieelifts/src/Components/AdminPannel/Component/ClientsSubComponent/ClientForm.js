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

import { closeClientModalAction } from "../../../../ReduxSetup/Actions/AdminActions"

const ClientForm = () => {
    const dispatch = useDispatch();
    const [toggle, setToggle]= useState(true)
    const handleNextPage=()=>{
      setToggle(false)
    }

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "scroll";
        };
    }, []);

    const clientModalOperation = useSelector((state) => state.AdminRootReducer.openAddClientModalReducer.isModalOpen);
    

    // const [modalclose, setModalClose] = useState(false);

    const closeModal = () => {
        dispatch(closeClientModalAction())
    };
    const handleOverlayClick = (event) => {
        if (event.target.classList.contains("add-client-wrapper")) {
          closeModal();
        }
      };
    return (
        <>
            {clientModalOperation && (<div className="add-client-wrapper" onClick={handleOverlayClick}>

                <div className="add-client-modal">
                    <div className="cross-icon" style={{ cursor: "pointer" }}>
                        <RxCross2 onClick={closeModal} />
                    </div>
                    <div>
                        {toggle ? (
                            <div className="client-form-container">
                                <ClientFormDetails />
                                <ClientSalesManDetails />
                                <ClientMembershipDocument />
                                <ClientArchitect />
                                <div className="button-container">
                                    <Clientbutton
                                        value={"Delete"}
                                        className={"client-form-button-red"}
                                    />
                                    <Clientbutton
                                        value={"Next"}
                                        className={"client-form-button-yellow"}
                                        handleNextPage={handleNextPage} 
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="client-form-next-container">
                                <ClientFormElevatorDetails />
                                <ClientFormDimentions />
                            </div>
                        )}
                    </div>

                </div>

            </div>
            )








            }
        </>
    );
};

export default ClientForm;



// <-----------------------------  Author:- Rahul kumar ----------------------------------->

