import React, { useEffect, useState } from 'react'
import ClientTableView from "../ClientsSubComponent/ClientTableView"
import { useSelector, useDispatch } from "react-redux";
import { getClients } from "../../../../ReduxSetup/Actions/AdminActions";
import InformationTable from '../../../CommonComponenets/InformationTable';

const Sosrequest = () => {
  const dispatch = useDispatch();
  const [layout, setLayout] = useState("Card");
  const fieldsToShow = ['SrNo', 'CustomerName', 'Status', 'Address', 'OrderDate', 'MEMBERSHIP', 'Problem', 'DOH']


  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const clients = useSelector(
    (state) => state?.AdminRootReducer?.getClientsReducer?.clients?.Clients
  );
  const filteredData = useSelector(
    (state) => state?.AdminRootReducer?.getFilterDataReducer?.clients?.data
  );

  const clientLayout = useSelector(
    (state) =>
      state?.AdminRootReducer?.ChangeLayoutReducer?.initialLayout?.clientLayout
        ?.layout
  );

  const searchClient = useSelector(
    (state) => state?.AdminRootReducer?.searchClientReducer?.clients?.clients
  );

  useEffect(() => {
    if (clientLayout !== undefined) {
      setLayout(clientLayout === "grid" ? "grid" : "list");
    }
  }, [clientLayout]);

  const renderClientView = () => {
    let dataToRender;
    if (searchClient) {
      dataToRender = searchClient;
    } else if (filteredData) {
      dataToRender = filteredData;
    } else {
      dataToRender = clients;
    }



    return (

      <div className='main-container_sos'>
        <div className='sosrequest_table_view'>

          <div className='sosrequest_table_view_inside'>


            <InformationTable fieldsToShow={fieldsToShow}  />
          </div>
        </div>
      </div>
    );
  };

  return <div className="main-container">{renderClientView()}</div>;
};


export default Sosrequest
