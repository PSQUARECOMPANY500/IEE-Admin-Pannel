// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import ClientFormDetails from "./ClientFormDetails";
import ClientSalesManDetails from "./ClientSalesManDetails";
import ClientMembershipDocument from "./ClientMembershipDocument";
import ClientArchitect from "./ClientArchitect";
import Clientbutton from "./ClientsReusableComponent/Clientbutton";

const ClientForm = ({ }) => {

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

                    <div className='client-form-container'>
                        < ClientFormDetails />
                        <ClientSalesManDetails />
                        <ClientMembershipDocument />
                        <ClientArchitect />
                        <div className="button-container">
                                <Clientbutton value={"Delete"} className={'client-form-button-red'}/>
                                <Clientbutton value={"Next"} />
                         </div>
                    </div>
              

                </div>
            </div>
        </>
    );
};

export default ClientForm;



// <-----------------------------  Author:- Rahul kumar ----------------------------------->

