// <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React, { useEffect, useRef, useState } from "react";
import { getClients } from "../../../../ReduxSetup/Actions/AdminActions";
import { useSelector, useDispatch } from "react-redux";
import ClientCardView from "../ClientsSubComponent/ClientCardView";
import ClientTableView from "../ClientsSubComponent/ClientTableView";
import ClientForm from "../ClientsSubComponent/ClientForm";

const Clients = () => {
  const [layout, setLayout] = useState("Card");
  const [isFiltered, setIsFiltered] = useState(false);
  const [page, setPage] = useState(1); //make this is in redux for global purposes
  const [isLoading, setIsLoading] = useState(false);
  const [isScrollListenerAttached, setIsScrollListenerAttached] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef()

  const clients = useSelector(
    (state) => state?.AdminRootReducer?.getClientsReducer?.clients?.Clients
  );

  const totalPage = useSelector(
    (state) => state?.AdminRootReducer?.getClientsReducer?.clients?.totalPage
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

  const clientModalOperation = useSelector(
    (state) => state.AdminRootReducer.openAddClientModalReducer.isModalOpen
  );

  const RefetchClientDataWhenMembershipUpgraded = useSelector(
    (state) =>
      state?.AdminRootReducer?.upgradeClientMembershipByAdminPannelReducer
        ?.upgradeClientMembership
  );

  useEffect(() => {
    const getClient = async () => {
      if (page >= totalPage) {
        return setIsLoading(false);
      }
      await dispatch(getClients(page));
      setIsLoading(false);
    };

    getClient();
  }, [page, dispatch, RefetchClientDataWhenMembershipUpgraded]);
  useEffect(() => {
    if (clientLayout !== undefined) {
      setLayout(clientLayout === "grid" ? "grid" : "list");
    }
  }, [clientLayout]);

  useEffect(() => {
    if (filteredData || searchClient) {
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
    }
  }, [filteredData, searchClient, clients]);

  const handleInfiniteScroll = (e, isTableScroll = false) => {
    console.log(isTableScroll);
    if (isTableScroll) {
      hasScrollListenerAttached();
    }
    const { scrollHeight, clientHeight, scrollTop } = isTableScroll
      ? e.target
      : document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setPage((prevPage) => prevPage + 1);
      setIsLoading(true);
    }
  };

  const hasScrollListenerAttached = () => {
    if (isScrollListenerAttached) {
      console.log('Scroll listener is already attached.');
    } else {
      console.log('Attaching scroll listener.');
      setIsScrollListenerAttached(true);
    }
  };

  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      const tableScrollHandler = (e) => handleInfiniteScroll(e, true);
      currentRef.addEventListener('scroll', tableScrollHandler);
      return () => {
        currentRef.removeEventListener('scroll', tableScrollHandler);
      };
    }

    const windowScrollHandler = (e) => handleInfiniteScroll(e, false);
    window.addEventListener('scroll', windowScrollHandler);
    return () => {
      window.removeEventListener('scroll', windowScrollHandler);
    };
  }, [isScrollListenerAttached]);

  const renderClientView = () => {
    let dataToRender;
    if (searchClient) {
      dataToRender = searchClient;
    } else if (filteredData) {
      dataToRender = filteredData;
    } else {
      dataToRender = clients;
    }
    if (layout === "grid") {
      return (
        <ClientCardView
          clientData={dataToRender}
          isLoading={isLoading}
          page={page}
        />
      );
    } else {
      return (
        <ClientTableView
          clientData={dataToRender}
          hadnleInfiniteScroll={handleInfiniteScroll}
          isLoading={isLoading}
          isFiltered={isFiltered}
          page={page}
          ref={ref}
        />
      );
    }
  };

  return (
    <div className="main-container">
      {clientModalOperation && <ClientForm />}
      <div id="ClientView">
        {renderClientView()}
      </div>
    </div>
  );
};
export default Clients;
