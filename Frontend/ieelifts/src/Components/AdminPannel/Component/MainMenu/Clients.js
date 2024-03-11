// import React, { useEffect, useState, useRef } from "react";
// import { LuSettings2 } from "react-icons/lu";
// import { getClients } from "../../../../ReduxSetup/Actions/AdminActions";
// import { useSelector, useDispatch } from "react-redux";

// import ClientCardView from "../ClientsSubComponent/ClientCardView";
// import ClientTableView from "../ClientsSubComponent/ClientTableView";
// import ClientFilterDropdown from "../ClientsSubComponent/ClientFilterDropdown";

// const Clients = () => {
//   const [layout, setLayout] = useState("Table");
//   const [showTicketFilter, setShowTicketFilter] = useState(false);
//   const dispatch = useDispatch();
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     dispatch(getClients());
//   }, [dispatch]);

//   const handleLayout = () => {
//     if (layout === "Card") {
//       setLayout("Table");
//     } else {
//       setLayout("Card");
//     }
//   };
//   const clients = useSelector((state) => {
//     if (state.AdminRootReducer && state.AdminRootReducer.getClientsReducer) {
//       return state?.AdminRootReducer?.getClientsReducer.clients;
//     } else {
//       return null;
//     }
//   });

//   const filteredData = useSelector((state) => {
//     if (state.AdminRootReducer && state.AdminRootReducer.getFilterDataReducer) {
//       return state?.AdminRootReducer?.getFilterDataReducer.filteredData;
//     } else {
//       return null;
//     }
//   });

//   const handleTicketFilter = () => {
//     setShowTicketFilter(!showTicketFilter);
//   };
//   return (
//     <div className="main-container">
//       <div style={{ marginTop: "10rem" }}>
//         <p className="filter-icon" onClick={handleTicketFilter}>
//           <LuSettings2 />
//           {""}
//         </p>
//         {showTicketFilter && (
//           <div ref={dropdownRef}>
//             <ClientFilterDropdown />
//           </div>
//         )}
//       </div>
//       {layout === "Card" && <ClientCardView clientData={clients} />}
//       {layout === "Table" && <ClientTableView clientData={clients} />}

//       <button
//         onClick={() => {
//           handleLayout();
//         }}
//       >
//         ChangeLayout
//       </button>
//     </div>
//   );
// };

// export default Clients;

import React, { useEffect, useState, useRef } from "react";
import { LuSettings2 } from "react-icons/lu";
import { getClients } from "../../../../ReduxSetup/Actions/AdminActions";
import { useSelector, useDispatch } from "react-redux";
import ClientCardView from "../ClientsSubComponent/ClientCardView";
import ClientTableView from "../ClientsSubComponent/ClientTableView";
import ClientFilterDropdown from "../ClientsSubComponent/ClientFilterDropdown";

const Clients = () => {
  const [layout, setLayout] = useState("Table");
  const [showTicketFilter, setShowTicketFilter] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const clients = useSelector(
    (state) => state?.AdminRootReducer?.getClientsReducer?.clients?.Clients
  );
  const filteredData = useSelector(
    (state) =>
      state?.AdminRootReducer?.getFilterDataReducer?.clients?.data
  );

  const handleLayout = () => {
    setLayout((prevLayout) => (prevLayout === "Table" ? "Card" : "Table"));
  };

  const handleTicketFilter = () => {
    setShowTicketFilter((prevFilter) => !prevFilter);
  };

  // const renderClientView = () => {
  //   if (layout === "Card") {
  //     return <ClientCardView clientData={clients} />;
  //   } else {
  //     return <ClientTableView clientData={clients} />;
  //   }
  // };

  const renderClientView = () => {
    let dataToRender = clients; // By default, render the original client data

    // If filteredData exists, use it instead
    if (filteredData) {
      console.log(filteredData);
      dataToRender = filteredData;
    }

    if (layout === "Card") {
      return <ClientCardView clientData={dataToRender} />;
    } else {
      // return <ClientCardView clientData={dataToRender} />;
      return <ClientTableView clientData={dataToRender} />;
    }
  };

  return (
    <div className="main-container">
      {/* <div style={{ marginTop: "10rem" }}>
        <p className="filter-icon" onClick={handleTicketFilter}>
          <LuSettings2 />
          {""}
        </p>
        {showTicketFilter && (
          <div ref={dropdownRef}>
            <ClientFilterDropdown />
          </div>
        )}
      </div> */}
      {renderClientView()}
      {/* <button onClick={handleLayout}>Change Layout</button> */}
    </div>
  );
};

export default Clients;
