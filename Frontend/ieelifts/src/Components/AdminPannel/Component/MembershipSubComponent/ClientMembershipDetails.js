// // // <-----------------------------  Author:- Armaan Singh ----------------------------------->
// import React, { useState, useEffect } from "react";
// import ClientDetails from "./ClientDetails";
// import ClientMembershipHistory from "./ClientMembershipHistory";
// import ClientCallDetails from "./ClientCallDetails";
// import OfferButton from "./OfferButton";
// import NotificationMembership from "./NotificationMembership";
// import CallButtons from "./CallButtons";
// import { useSelector } from "react-redux";

// const ClientMembershipDetails = ({ isExpired, dataType }) => {
//   const [buttonSelect, setButtonSelect] = useState(false);
//   const historyDetails = useSelector(
//     (state) =>
//       state.AdminRootReducer.requestGetMemberShipHistoryReducer
//         ?.membershipHistory
//   );
//   const callDetails = useSelector(
//     (state) =>
//       state.AdminRootReducer.requestGetMemberShipCallReducer
//         ?.membershipCallDetail
//   );
//   const clientDetail = useSelector(
//     (state) =>
//       state.AdminRootReducer.requestGetMemberShipClientReducer
//         ?.membershipCleintDetail
//   );

//   console.log("this ClientMembershipDetails datatype",dataType);

//   return (
//     <div className="clientsContainer">
//       <div className="clients">
//         <div>
//           <ClientDetails dataType={dataType} clientDetail={clientDetail} />
//           <ClientMembershipHistory
//             isExpired={isExpired}
//             dataType={dataType}
//             historyDetails={historyDetails}
//           />
//         </div>
//         {clientDetail && clientDetail.responseData && (
//           <CallButtons
//             isExpired={isExpired}
//             dataType={dataType}
//             buttonSelect={() => {
//               setButtonSelect(!buttonSelect);
//             }}
//           />
//         )}
//       </div>
//       <div className="clients">
//         <ClientCallDetails
//           JON={clientDetail?.responseData?.jobOrderNumber}
//           isExpired={isExpired}
//           dataType={dataType}
//           callDetails={callDetails}
//           Mybutton={buttonSelect}
//           setButtonSelect={setButtonSelect}
//         />
//         {clientDetail && clientDetail.responseData && (
//           <div>
//             <NotificationMembership isExpired={isExpired} dataType={dataType} />
//             <NotificationMembership
//               isExpired={isExpired}
//               dataType={dataType}
//               whatsApp={"whatsapp"}
//             />
//           </div>
//         )}
//         {clientDetail && clientDetail.responseData && (
//           <>
//             <OfferButton isExpired={isExpired} dataType={dataType} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClientMembershipDetails;

import React, { useState, useEffect } from "react";
import ClientDetails from "./ClientDetails";
import ClientMembershipHistory from "./ClientMembershipHistory";
import ClientCallDetails from "./ClientCallDetails";
import OfferButton from "./OfferButton";
import NotificationMembership from "./NotificationMembership";
import CallButtons from "./CallButtons";
import { useSelector } from "react-redux";

const ClientMembershipDetails = React.memo(({ isExpired, dataType }) => {
  const [buttonSelect, setButtonSelect] = useState(false);
  const historyDetails = useSelector(
    (state) =>
      state.AdminRootReducer.requestGetMemberShipHistoryReducer
        ?.membershipHistory
  );
  const callDetails = useSelector(
    (state) =>
      state.AdminRootReducer.requestGetMemberShipCallReducer
        ?.membershipCallDetail
  );
  const clientDetail = useSelector(
    (state) =>
      state.AdminRootReducer.requestGetMemberShipClientReducer
        ?.membershipCleintDetail
  );

  useEffect(() => {
    // console.log("ClientMembershipDetails mounted");
    return () => {
      // console.log("ClientMembershipDetails unmounted");
    };
  }, []);
  console.log("ClientMembershipDetails mounted");

  return (
    <div className="clientsContainer">
      {clientDetail && historyDetails && callDetails && (
        <>
          <div className="clients">
            <div>
              <ClientDetails dataType={dataType} clientDetail={clientDetail} />
              <ClientMembershipHistory
                isExpired={isExpired}
                dataType={dataType}
                historyDetails={historyDetails}
              />
            </div>
            {clientDetail && clientDetail.responseData && (
              <CallButtons
                isExpired={isExpired}
                dataType={dataType}
                buttonSelect={() => {
                  setButtonSelect(!buttonSelect);
                }}
              />
            )}
          </div>
          <div className="clients">
            <ClientCallDetails
              JON={clientDetail?.responseData?.jobOrderNumber}
              isExpired={isExpired}
              dataType={dataType}
              callDetails={callDetails}
              Mybutton={buttonSelect}
              setButtonSelect={setButtonSelect}
            />
            {clientDetail && clientDetail.responseData && (
              <div>
                <NotificationMembership
                  isExpired={isExpired}
                  dataType={dataType}
                />
                <NotificationMembership
                  isExpired={isExpired}
                  dataType={dataType}
                  whatsApp={"whatsapp"}
                />
              </div>
            )}
            {clientDetail && clientDetail.responseData && (
              <>
                <OfferButton isExpired={isExpired} dataType={dataType} />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
});

export default ClientMembershipDetails;
