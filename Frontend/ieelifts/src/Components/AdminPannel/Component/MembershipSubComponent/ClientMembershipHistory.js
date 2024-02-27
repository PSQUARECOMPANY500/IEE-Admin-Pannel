// import React, { useState, useRef, useEffect } from "react";
// import { FaStar, FaPrint } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { getClientMembershipHistoryAction } from "../../../../ReduxSetup/Actions/AdminActions";

// const ClientMembershipHistory = ({ isExpired, dataType }) => {
//   const dispatch = useDispatch();
//   const historyDetails = useSelector((state) => {
//     if (
//       state.AdminRootReducer &&
//       state.AdminRootReducer.requestGetMemberShipHistoryReducer
//     ) {
//       return state?.AdminRootReducer.requestGetMemberShipHistoryReducer
//         .membershipHistory;
//     } else {
//       return null;
//     }
//   });

//   useEffect(() => {
//     dispatch(getClientMembershipHistoryAction());
//   }, [dispatch, dataType]);

//   const [showHistory, setShowHistory] = useState([]);

//   // Initialize showHistory when historyDetails changes
//   useEffect(() => {
//     if (historyDetails && Array.isArray(historyDetails.membershipHistory)) {
//       setShowHistory(Array(historyDetails.membershipHistory.length).fill(false));
//     }
//   }, [historyDetails]);

//   const historyRefs = useRef([]);

//   const toggleHistory = (index) => {
//     setShowHistory((prevState) =>
//       prevState.map((value, i) => (i === index ? !value : value))
//     );
//   };

//   const handleClickOutside = (event, index) => {
//     if (
//       historyRefs.current[index] &&
//       !historyRefs.current[index].contains(event.target)
//     ) {
//       setShowHistory((prevState) =>
//         prevState.map((value, i) => (i === index ? false : value))
//       );
//     }
//   };

//   useEffect(() => {
//     const eventListeners = historyRefs.current.map((ref, index) => {
//       return (event) => handleClickOutside(event, index);
//     });
//     eventListeners.forEach((listener) => {
//       document.addEventListener("click", listener);
//     });
//     return () => {
//       eventListeners.forEach((listener) => {
//         document.removeEventListener("click", listener);
//       });
//     };
//   }, []);

//   return (
//     <div>
//       <div>
//         <p>History</p>
//       </div>
//       <div
//         className={`historyContainer ${isExpired && "historyExpiredScroll"}`}
//       >
//         {historyDetails.membershipHistory &&
//           historyDetails.membershipHistory.map((detail, index) => (
//             <div key={index}>
//               <div
//                 ref={(el) => (historyRefs.current[index] = el)}
//                 className="history"
//                 onClick={() => toggleHistory(index)}
//                 style={{ cursor: "pointer", marginBottom: "10px" }}
//               >
//                 {showHistory[index] && (
//                   <div className="historyDetails">
//                     <div className="historyClings">
//                       <span>Discount 5%</span>
//                       <span>Amount paid: 42000</span>
//                     </div>
//                     <div className="historyClings">
//                       <span>Callbacks: 2 </span>
//                       <span>Services: 7</span>
//                     </div>
//                     <div className="historyClings">
//                       <span>Spare Parts sold: 5 </span>
//                       <span>Revenue: 21000</span>
//                     </div>
//                     <div className="historyClings">
//                       <span>SOS calls: 3 </span>
//                       <p className="rating">
//                         <span>Rating: 4.2</span>
//                         <span>
//                           <FaStar className="ratingStar" />
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                 )}
//                 <div className="historyNumber">
//                   <p>June 12, 2016</p>
//                   <p>
//                     <FaPrint />
//                   </p>
//                   <p>June 12, 2017</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default ClientMembershipHistory;


import React, { useState, useRef, useEffect } from "react";
import { FaStar, FaPrint } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getClientMembershipHistoryAction } from "../../../../ReduxSetup/Actions/AdminActions";

const ClientMembershipHistory = ({ isExpired, dataType }) => {
  const dispatch = useDispatch();
  const historyDetails = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.requestGetMemberShipHistoryReducer
    ) {
      return state?.AdminRootReducer.requestGetMemberShipHistoryReducer
        .membershipHistory;
    } else {
      return null;
    }
  });

  useEffect(() => {
    dispatch(getClientMembershipHistoryAction());
  }, [dispatch, dataType]);

  const [showHistory, setShowHistory] = useState([]);

  // Initialize showHistory when historyDetails changes
  useEffect(() => {
    if (historyDetails && Array.isArray(historyDetails.membershipHistory)) {
      setShowHistory(Array(historyDetails.membershipHistory.length).fill(false));
    }
  }, [historyDetails]);

  const historyRefs = useRef([]);

  const toggleHistory = (index) => {
    setShowHistory((prevState) =>
      prevState.map((value, i) => (i === index ? !value : false))
    );
  };

  const handleClickOutside = (event) => {
    if (
      !historyRefs.current.some(ref => ref && ref.contains(event.target))
    ) {
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
    <div>
      <div>
        <p>History</p>
      </div>

      <div
        className={`historyContainer ${isExpired && "historyExpiredScroll"}`}
      >
        {historyDetails && historyDetails.membershipHistory &&
          historyDetails.membershipHistory.map((detail, index) => (
            <div key={index}>
              <div
                ref={(el) => (historyRefs.current[index] = el)}
                className="history"
                onClick={() => toggleHistory(index)}
                style={{ cursor: "pointer", marginBottom: "10px" }}
              >
                {showHistory[index] && (
                  <div className="historyDetails">
                    <div className="historyClings">
                      <span>Discount 5%</span>
                      <span>Amount paid: 42000</span>
                    </div>
                    <div className="historyClings">
                      <span>Callbacks: 2 </span>
                      <span>Services: 7</span>
                    </div>
                    <div className="historyClings">
                      <span>Spare Parts sold: 5 </span>
                      <span>Revenue: 21000</span>
                    </div>
                    <div className="historyClings">
                      <span>SOS calls: 3 </span>
                      <p className="rating">
                        <span>Rating: 4.2</span>
                        <span>
                          <FaStar className="ratingStar" />
                        </span>
                      </p>
                    </div>
                  </div>
                )}
                <div className="historyNumber">
                  <p>June 12, 2016</p>
                  <p>
                    <FaPrint />
                  </p>
                  <p>June 12, 2017</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* {historyDetails && historyDetails.membershipHistory &&
        historyDetails.membershipHistory.map((detail, index) => (
          <div key={index}>
            <div
              ref={(el) => (historyRefs.current[index] = el)}
              className="history"
              onClick={() => toggleHistory(index)}
              style={{ cursor: "pointer", marginBottom: "10px" }}
            >
              {showHistory[index] && (
                <div className="historyDetails">
                  <div className="historyClings">
                    <span>Discount 5%</span>
                    <span>Amount paid: 42000</span>
                  </div>
                  <div className="historyClings">
                    <span>Callbacks: 2 </span>
                    <span>Services: 7</span>
                  </div>
                  <div className="historyClings">
                    <span>Spare Parts sold: 5 </span>
                    <span>Revenue: 21000</span>
                  </div>
                  <div className="historyClings">
                    <span>SOS calls: 3 </span>
                    <p className="rating">
                      <span>Rating: 4.2</span>
                      <span>
                        <FaStar className="ratingStar" />
                      </span>
                    </p>
                  </div>
                </div>
              )}
              <div className="historyNumber">
                <p>June 12, 2016</p>
                <p>
                  <FaPrint />
                </p>
                <p>June 12, 2017</p>
              </div>
            </div>
          </div>
        ))} */}

    </div>
  );
};

export default ClientMembershipHistory;
