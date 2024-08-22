// <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React, { useState, useLayoutEffect, useEffect } from "react";
import CheckBox from "../DashboardSubComponent/CheckBox";
import pdfIcon from "../../../../Assets/Images/pdf-icon.png";
import execelIcon from "../../../../Assets/Images/execel-icon.png";
import ClientModal from "./ClientModal";
import { CSVLink, CSVDownload } from "react-csv";
import { getAllClient } from "../../../../ReduxSetup/Actions/AdminActions";
import "react-loading-skeleton/dist/skeleton.css";
import SkeltonLoader from "../../../CommonComponenets/SkeltonLoader";
import { useSelector } from "react-redux";
import generatePdf from "../../../../utils/generatePdf";
// import { useSelector } from "react-redux";

const ClientTableView = ({
  clientData,
  hadnleInfiniteScroll,
  isLoading,
  isFiltered,
  page,
}) => {
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [csvData, setCsvData] = useState([]);

  const [selectedClientArray, setSelectedClientArray] = useState([]);
  const totalPage = useSelector(
    (state) => state?.AdminRootReducer?.getClientsReducer?.clients?.totalPage
  );

  useLayoutEffect(() => {
    if (clientData) {
      setCheckboxStates(Array(clientData.length).fill(false));
    }
  }, [clientData]);

  const handleCheckBoxAll = async () => {
    const allChecked = checkboxStates.every((isChecked) => isChecked);
    if (clientData) {
      setCheckboxStates(Array(clientData.length).fill(!allChecked));
      if (!allChecked) {
        setSelectedClientArray(clientData);
      } else {
        setSelectedClientArray([]);
      }
    }
    if (!isFiltered && !allChecked) {
      const { data } = await getAllClient();
      setSelectedClientArray(data);
    }
  };

  const handleCheckBoxSingle = (index) => {
    setCheckboxStates((prevStates) => {
      const newCheckboxStates = [...prevStates];
      newCheckboxStates[index] = !prevStates[index];
      return newCheckboxStates;
    });
    let ans = selectedClientArray.includes(clientData[index]);
    if (ans) {
      const removeIndex = selectedClientArray.findIndex(
        (item) => item === clientData[index]
      );
      selectedClientArray.splice(removeIndex, 1);
    } else {
      setSelectedClientArray((prev) => [...prev, clientData[index]]);
    }
  };
  let uniqueData = selectedClientArray?.filter(
    (obj, index, self) =>
      index ===
      self?.findIndex((t) => t?.id === obj?.id && t?.name === obj?.name)
  );

  const HandleCardClick = (data) => {
    setShowClientModal(true);
    // console.log("client all data", data)
    setSelectedClient(data);
  };
  //Function to handle closing modal
  const handleCloseModal = () => {
    setShowClientModal(false);
  };

  const handleExcelIconClick = () => {
    setCsvData(uniqueData);
  };

  return (
    <div className="table_view client_table_view">
      <div className="sub_table_view client_sub_table_view">
        <div className="client_table-container" onScroll={(e) => hadnleInfiniteScroll(e, true)}>
          <div className="table-shadow table-header" style={{ height: '4rem', width: '96.4%', marginLeft: '-0.3rem' }}></div>
          <table>
            <thead style={{ zIndex: '1' }} >
              <tr>
                <th className="checkbox">
                  <CheckBox
                    id="checkbox1"
                    checked={
                      clientData &&
                      clientData.length > 0 &&
                      checkboxStates.every((isChecked) => isChecked)
                    }
                    handleCheckboxChange={handleCheckBoxAll}
                  />
                </th>
                <th>JON</th>
                <th>NAME</th>
                <th>NUMBER</th>
                <th>
                  <div>
                    <span>ADDRESS</span>
                    {/* <HiChevronUpDown />
                    <span></span> */}
                  </div>
                </th>
                <th>CallBacks</th>
                <th className="membership">
                  <div>
                    <span>Membership</span>
                    {/* <HiChevronUpDown />
                    <span></span> */}
                  </div>
                </th>
                <th>Elevator</th>
                <th>DOH</th>
              </tr>
            </thead>

            {checkboxStates.includes(true) && (
              <div className="doc-container">
                <img
                  src={pdfIcon}
                  onClick={() => {
                    generatePdf(selectedClientArray);
                  }}
                  className="pdfIcon"
                />
                <CSVLink data={csvData}>
                  <img src={execelIcon} onClick={handleExcelIconClick} />
                </CSVLink>
              </div>
            )}

            {/* TABLE BODY STARTS */}

            <tbody>
              {clientData &&
                clientData.map((data, index) => (

                  <tr className="selected single" key={index} >
                    <td className="checkbox">
                      <CheckBox
                        id={`checkbox-${index}`}
                        checked={checkboxStates[index] || false}
                        handleCheckboxChange={() => handleCheckBoxSingle(index)}
                      />
                    </td>

                    <td className="JON" onClick={() => HandleCardClick(data)}>
                      {data.JobOrderNumber}
                    </td>
                    <td
                      className="client-table-name address"
                      onClick={() => HandleCardClick(data)}
                    >
                      <div className="dropdown-address">
                        <span>
                          {data?.name.length > 20 ? `${data?.name.slice(0, 20)}...` : data?.name}
                        </span>

                        <div className="dropdown-address-menu">
                          <p>
                            {data?.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      className="client-table-number"
                      onClick={() => HandleCardClick(data)}
                    >
                      {data?.PhoneNumber}
                    </td>
                    <td
                      className="address"
                      onClick={() => HandleCardClick(data)}
                    >
                      {/* {data?.Address} */}
                      <div className="dropdown-address">
                        <span>
                          {data?.Address.length > 20 ? `${data?.Address.slice(0, 20)}...` : data?.Address}
                        </span>

                        <div className="dropdown-address-menu">
                          <p>
                            {data?.Address}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td
                      className="callback"
                      onClick={() => HandleCardClick(data)}
                    >
                      {data?.callback ? data?.callback : 0}
                    </td>
                    <td
                      className="membership"
                      onClick={() => HandleCardClick(data)}
                    >
                      {data?.MembershipType ? data?.MembershipType : "NONE"}
                    </td>
                    <td
                      className="address"
                      onClick={() => HandleCardClick(data)}
                    >
                      {data.ModelType}
                    </td>
                    <td
                      className="address"
                      onClick={() => HandleCardClick(data)}
                    >
                      {data.DateOfHandover}
                    </td>
                  </tr>
                ))}
              {isLoading && page <= totalPage ? <><tr style={{ overflowX: "hidden" }}>
                <td colSpan="10">
                  <SkeltonLoader
                    // width={"73vw"}
                    height={"38px"}
                    marginTop={"8px"}
                    marginBottom={"0px"}
                    className='table-skeleton'
                  />
                </td>
              </tr>
                <tr>
                  <td colSpan="10">
                    <SkeltonLoader
                      // width={"73vw"}
                      height={"38px"}
                      marginTop={"8px"}
                      marginBottom={"0px"}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="10">
                    <SkeltonLoader
                      // width={"73vw"}
                      height={"38px"}
                      marginTop={"8px"}
                      marginBottom={"0px"}
                    />
                  </td>
                </tr>
              </> : ''}

            </tbody>
          </table>
        </div>
      </div>

      {showClientModal && (
        <ClientModal
          showClientModal={showClientModal}
          handleCloseModal={handleCloseModal}
          selectedClient={selectedClient}
        />
      )}
    </div>
  );
};

export default ClientTableView;
