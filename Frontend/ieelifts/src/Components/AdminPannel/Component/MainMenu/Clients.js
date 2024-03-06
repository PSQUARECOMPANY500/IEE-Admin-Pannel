import React, { useEffect, useState, useRef } from "react";
import { LuSettings2 } from "react-icons/lu";
import { getClients } from "../../../../ReduxSetup/Actions/AdminActions";
import { useSelector, useDispatch } from "react-redux";
import ClientCardView from "../ClientsSubComponent/ClientCardView";
import ClientTableView from "../ClientsSubComponent/ClientTableView";
import ClientFilterDropdown from "../ClientsSubComponent/ClientFilterDropdown";

const Clients = () => {
  const [layout, setLayout] = useState("Card");
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
    (state) => state?.AdminRootReducer?.getFilterDataReducer?.clients?.data
  );

  const handleLayout = () => {
    setLayout((prevLayout) => (prevLayout === "Table" ? "Card" : "Table"));
  };

  const handleTicketFilter = () => {
    setShowTicketFilter((prevFilter) => !prevFilter);
  };

  const renderClientView = () => {
    let dataToRender = clients;

    if (filteredData) {
      dataToRender = filteredData;
    }

    if (layout === "Card") {
      return <ClientCardView clientData={dataToRender} />;
    } else {
      return <ClientTableView clientData={dataToRender} />;
    }
  };

  return (
    <div className="main-container">
      <div style={{ marginTop: "10rem" }}>
        <p className="filter-icon" onClick={handleTicketFilter}>
          <LuSettings2 />
          {""}
        </p>
        {showTicketFilter && (
          <div ref={dropdownRef}>
            <ClientFilterDropdown />
          </div>
        )}
      </div>
      {renderClientView()}
      <button onClick={handleLayout}>Change Layout</button>
    </div>
  );
};

export default Clients;
