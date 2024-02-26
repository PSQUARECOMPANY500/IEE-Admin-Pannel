// import React, { useState, useRef, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getClientCallsDetails } from "../../../../ReduxSetup/Actions/AdminActions";


// const ClientCallDetails = ({ isExpired,dataType }) => {
//   // const [showHistory, setShowHistory] = useState(Array(10).fill(false));
//   // const historyRefs = useRef(Array(10).fill(null));
  

//   // const toggleHistory = (index) => {
//   //   setShowHistory((prevState) =>
//   //     prevState.map((value, i) => (i === index ? !value : value))
//   //   );
//   // };

//   // const handleClickOutside = (event, index) => {
//   //   if (
//   //     historyRefs.current[index] &&
//   //     !historyRefs.current[index].contains(event.target)
//   //   ) {
//   //     setShowHistory((prevState) =>
//   //       prevState.map((value, i) => (i === index ? false : value))
//   //     );
//   //   }
//   // };

//   // useEffect(() => {
//   //   const eventListeners = historyRefs.current.map((ref, index) => {
//   //     return (event) => handleClickOutside(event, index);
//   //   });
//   //   eventListeners.forEach((listener) => {
//   //     document.addEventListener("click", listener);
//   //   });
//   //   return () => {
//   //     eventListeners.forEach((listener) => {
//   //       document.removeEventListener("click", listener);
//   //     });
//   //   };
//   // }, []);

//   const dispatch = useDispatch();
//   const callDetails = useSelector((state) => {
//     if (
//       state.AdminRootReducer &&
//       state.AdminRootReducer.requestGetMemberShipCallReducer
//     ) {
//       return state?.AdminRootReducer.requestGetMemberShipCallReducer
//         .membershipCallDetail;
//     } else {
//       return null;
//     }
//   });

//   useEffect(() => {
//     dispatch(getClientCallsDetails());
//   }, [dispatch, dataType]);

//   const [showHistory, setShowHistory] = useState([]);

//   // Initialize showHistory when callDetails changes
//   useEffect(() => {
//     if (callDetails && Array.isArray(callDetails.membershipCallDetail)) {
//       setShowHistory(
//         Array(callDetails.membershipHistory.length).fill(false)
//       );
//     }
//   }, [callDetails]);

//   const historyRefs = useRef([]);

//   const toggleHistory = (index) => {
//     setShowHistory((prevState) =>
//       prevState.map((value, i) => (i === index ? !value : false))
//     );
//   };

//   const handleClickOutside = (event) => {
//     if (!historyRefs.current.some((ref) => ref && ref.contains(event.target))) {
//       setShowHistory((prevState) => prevState.map(() => false));
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);
//   return (
//     <div className={`callsContainer ${isExpired && "callScrollExpired"}`}>
//       {callDetails.membershipCallDetail.map((isShown, index) => (
//         <div key={index}>
//           <div
//             ref={(el) => (historyRefs.current[index] = el)}
//             className="clientDetailCalls"
//             onClick={() => toggleHistory(index)}
//             style={{ cursor: "pointer", marginBottom: "10px" }}
//           >
//             {isShown && (
//               <div className="clientCallInfo">
//                 <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
//                   viverra dui eget elit venenatis sagittis. Suspendisse vel
//                   scelerisque enim. Mauris condimentum semper sem, et varius
//                   orci rhoncus a.
//                 </p>
//               </div>
//             )}
//             <div className="clientNumber">
//               <p>Call {index + 1}</p>
//               <p>June 12</p>
//               <p>20% Off</p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ClientCallDetails;

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientCallsDetails } from "../../../../ReduxSetup/Actions/AdminActions";

const ClientCallDetails = ({ isExpired, dataType }) => {
  const dispatch = useDispatch();
  const callDetails = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.requestGetMemberShipCallReducer
    ) {
      return state?.AdminRootReducer.requestGetMemberShipCallReducer
        .membershipCallDetail;
    } else {
      return null;
    }
  });

  useEffect(() => {
    dispatch(getClientCallsDetails());
  }, [dispatch, dataType]);

  const [showHistory, setShowHistory] = useState([]);

  // Initialize showHistory when callDetails changes
  useEffect(() => {
    if (callDetails && Array.isArray(callDetails.membershipCallDetail)) {
      setShowHistory(Array(callDetails.membershipCallDetail.length).fill(false));
    }
  }, [callDetails]);

  const historyRefs = useRef([]);

  const toggleHistory = (index) => {
    setShowHistory((prevState) =>
      prevState.map((value, i) => (i === index ? !value : false))
    );
  };

  const handleClickOutside = (event) => {
    if (!historyRefs.current.some((ref) => ref && ref.contains(event.target))) {
      setShowHistory((prevState) => prevState.map(() => false));
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`callsContainer ${isExpired && "callScrollExpired"}`}>
      {callDetails.membershipCallDetail && callDetails.membershipCallDetail.map((isShown, index) => (
        <div key={index}>
          <div
            ref={(el) => (historyRefs.current[index] = el)}
            className="clientDetailCalls"
            onClick={() => toggleHistory(index)}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            {isShown && (
              <div className="clientCallInfo">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  viverra dui eget elit venenatis sagittis. Suspendisse vel
                  scelerisque enim. Mauris condimentum semper sem, et varius
                  orci rhoncus a.
                </p>
              </div>
            )}
            <div className="clientNumber">
              <p>Call {index + 1}</p>
              <p>June 12</p>
              <p>20% Off</p>
            </div>
          </div>
        </div>
      ))}
            {console.log(callDetails.membershipCallDetail)}
    </div>
  );
};

export default ClientCallDetails;
