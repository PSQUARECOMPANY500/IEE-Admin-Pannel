// <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React, { useEffect, useState } from "react";
import { getClients } from "../../../../ReduxSetup/Actions/AdminActions";
import { useSelector, useDispatch } from "react-redux";
import ClientCardView from "../ClientsSubComponent/ClientCardView";
import ClientTableView from "../ClientsSubComponent/ClientTableView";
import ClientForm from "../ClientsSubComponent/ClientForm";

const Clients = () => {
  const [layout, setLayout] = useState("Card");
  const [isFiltered,setIsFiltered] = useState(false);
  const [page, setPage] = useState(1); //make this is in redux for global purposes
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  
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
  
  useEffect(() => {
   
    const getClient = async () => {
      if(page>=totalPage){
        return setIsLoading(false);
      }
      await dispatch(getClients(page));
      setIsLoading(false)
    }

    getClient();
  }, [page, dispatch]);
  useEffect(() => {
    if (clientLayout !== undefined) {
      setLayout(clientLayout === "grid" ? "grid" : "list");
    }
  }, [clientLayout]);

  useEffect(()=>{
    if(filteredData || searchClient){
      setIsFiltered(true);
    }else{
      setIsFiltered(false);

    }
  },[filteredData,searchClient,clients])

  const hadnleInfiniteScroll = (e, isTableScroll = false) => {
    const { scrollHeight, clientHeight, scrollTop } = isTableScroll ? e.target : document.documentElement
    if (scrollTop + clientHeight === scrollHeight) {
      setPage((prev) => prev + 1);
    }
    setIsLoading(true)

  }

  useEffect(() => {
    window.addEventListener('scroll', hadnleInfiniteScroll)
    return () => {
      window.removeEventListener('scroll', hadnleInfiniteScroll)
    }
  }, [])

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
      return <ClientCardView clientData={dataToRender} isLoading={isLoading} />;
    } else {

      return <ClientTableView clientData={dataToRender} hadnleInfiniteScroll={hadnleInfiniteScroll} isLoading={isLoading} isFiltered={isFiltered} />;
    }
  };


  return <div className="main-container" >
    <ClientForm />
    {renderClientView()}
  </div>;
};

export default Clients; 