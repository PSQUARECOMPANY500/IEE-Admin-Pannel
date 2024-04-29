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

const ClientForm = ({ }) => {
   const [toggle, setToggle]= useState('false')
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "scroll";
        };
    }, []);

    return (
        <>


            <div className="add-client-wrapper" >
                <div className="add-client-modal" >
                    <div className="cross-icon" style={{ cursor: "pointer" }}>
                        <RxCross2 />
                    </div>

                   {false? <div className='client-form-container'>
                        < ClientFormDetails />
                        <ClientSalesManDetails />
                        <ClientMembershipDocument />
                        <ClientArchitect />
                        <div className="button-container">
                                <Clientbutton value={"Delete"} className={'client-form-button-red'}/>
                                <Clientbutton value={"Next"} className={'client-form-button-yellow'}/>
                         </div>
                    </div>
                   : <div className="client-form-next-container">
                           <ClientFormElevatorDetails/>
                           <ClientFormDimentions/>
                           
                    </div>}

                </div>
            </div>
        </>
    );
};

export default ClientForm;



// <-----------------------------  Author:- Rahul kumar ----------------------------------->

