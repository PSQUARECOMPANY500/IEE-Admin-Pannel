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

const ClientMembershipHistory = ({ isExpired, dataType, historyDetails }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientMembershipHistoryAction());
  }, [dataType]);

  const [showHistory, setShowHistory] = useState([]);

  // Initialize showHistory when historyDetails changes
  // useEffect(() => {
  //   console.log(historyDetails);
  //   if (historyDetails && Array.isArray(historyDetails.response
  //     .historyData)) {
  //     setShowHistory(Array(historyDetails.response
  //       .historyData.length).fill(false));
  //   }
  // }, [historyDetails]);
  useEffect(() => {
    console.log(historyDetails);
    if (
      historyDetails &&
      historyDetails.response &&
      Array.isArray(historyDetails.response.historyData)
    ) {
      setShowHistory(
        Array(historyDetails.response.historyData.length).fill(false)
      );
    }
  }, [historyDetails]);

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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  }

  const scrollBar =
    dataType === "Gold"
      ? "callsContainer_gold"
      : dataType === "Platinum"
      ? "callsContainer_platinum"
      : dataType === "Silver"
      ? "callsContainer_silver"
      : "";
  const membershipBorder = (type) => {
    return type === "gold"
      ? "historyBorderGold"
      : type === "platinum"
      ? "historyBorderPlatinum"
      : type === "silver"
      ? "historyBorderSilver"
      : "historyBorderWarrenty";
  };
  const membershipbackground = (type) => {
    return type === "gold"
      ? "historyNumberGold"
      : type === "platinum"
      ? "historyNumberPlatinum"
      : type === "silver"
      ? "historyNumberSilver"
      : "historyNumberWarrenty";
  };
  return (
    <div>
      {historyDetails && historyDetails.response && (
        <div>
          <p>History</p>
        </div>
      )}
      <div
        className={`historyContainer ${scrollBar} ${
          isExpired && "historyExpiredScroll"
        }`}
      >
        {historyDetails &&
          historyDetails.response &&
          historyDetails.response.historyData &&
          historyDetails.response.historyData.map((detail, index) => (
            <div key={index}>
              {console.log(detail)}
              <div
                ref={(el) => (historyRefs.current[index] = el)}
                className={`history ${membershipBorder(
                  detail.MemebershipType
                )}`}
                onClick={() => toggleHistory(index)}
                style={{ cursor: "pointer", marginBottom: "10px" }}
              >
                {showHistory[index] && (
                  <div className="historyDetails">
                    <div className="historyClings">
                      <span>
                        Discount {detail.Discount ? detail.Discount : 0}
                      </span>
                      <span>
                        Amount paid: {detail.PricePaid ? detail.PricePaid : 0}
                      </span>
                    </div>
                    <div className="historyClings">
                      <span>
                        Callbacks:{" "}
                        {detail.callbacksCount ? detail.callbacksCount : 0}{" "}
                      </span>
                      <span>
                        Services:{" "}
                        {detail.serviecsCount ? detail.serviecsCount : 0}
                      </span>
                    </div>
                    <div className="historyClings">
                      <span>
                        Spare Parts sold:{" "}
                        {detail.sparePartsSoldCount
                          ? detail.sparePartsSoldCount
                          : 0}
                      </span>
                      <span>
                        Revenue: {detail.revenue ? detail.revenue : 0}
                      </span>
                    </div>
                    <div className="historyClings">
                      <span>
                        SOS calls:{" "}
                        {detail.SOScallsCount ? detail.SOScallsCount : 0}{" "}
                      </span>
                      <p className="rating">
                        <span>
                          Rating:{" "}
                          {historyDetails.response.calculateRating
                            ? historyDetails.response.calculateRating
                            : 0}
                        </span>
                        <span>
                          <FaStar className="ratingStar" />
                        </span>
                      </p>
                    </div>
                  </div>
                )}
                <div
                  className={`historyNumber ${membershipbackground(
                    detail.MemebershipType
                  )}`}
                >
                  <p>{formatDate(detail.StartDate)}</p>
                  <p>
                    <FaPrint />
                  </p>
                  <p>{formatDate(detail.EndDate)}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ClientMembershipHistory;
