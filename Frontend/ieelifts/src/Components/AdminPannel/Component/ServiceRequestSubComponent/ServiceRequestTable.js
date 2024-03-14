import React, { useState, useEffect, useRef } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import CheckBox from "../DashboardSubComponent/CheckBox";

import AssignDropdown from "../DashboardSubComponent/AssignDropdown";
import ServiceRequestModal from "./ServiceRequestModal";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllServiceRequestsAction } from "../../../../ReduxSetup/Actions/AdminActions";
import SkeltonLoader from "../../../CommonComponenets/SkeltonLoader";
import ServiceRequestModals from "./ServiceRequestModals";

const ServiceRequestTable = ({ setRenderTicket2, searchText }) => {

  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const [RequestId, setRequestId] = useState();
  const [enggId, setEnggId] = useState();
  const [isAssigned, setIsAssigned] = useState();
  const [renderTicket, setRenderTicket] = useState(true);
  const [filteredCD, setFilteredCD] = useState([]);
  const [allCD, setallCD] = useState([]);
  const [timer, setTimer] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showTicketModal4, setShowTicketModal4] = useState(false);
  const [showTicketFilter, setShowTicketFilter] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({});
  const [totalCheckboxes, setTotalCheckboxes] = useState(0);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setRenderTicket2((prev) => !prev);
      dispatch(fetchAllServiceRequestsAction());
    }, 1000);
  }, [renderTicket]);

  const getRequestDetail = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.fetchAllServiceRequestsReducers &&
      state.AdminRootReducer.fetchAllServiceRequestsReducers
        .serviceRequestDetail
    ) {
      return state.AdminRootReducer.fetchAllServiceRequestsReducers
        .serviceRequestDetail.ServiceRequest;
    } else {
      return null;
    }
  });



  //use effect for dispatching ations
  useEffect(() => {
    dispatch(fetchAllServiceRequestsAction());
  }, [dispatch]);

  //linit address logic
  const limitAddress = (address, limit) => {
    return address?.slice(0, limit) + (address?.length > limit ? "..." : "");
  };



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.classList.contains("filter-icon")
      ) {
        setShowTicketFilter(false);
        console.log(showTicketFilter);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, showTicketFilter]);

  const openModal = (modalNumber, requestId, isAssignedValue, enngID) => {
    // Use the appropriate modal number to open the corresponding modal
    if (modalNumber === 4) {
      setShowTicketModal4(true);
      setRequestId(requestId);
      setIsAssigned(isAssignedValue);
      setEnggId(enngID);
    }
  };



  useEffect(() => {
    setFilteredCD(getRequestDetail)
    setallCD(getRequestDetail)
  }, [getRequestDetail])

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      if (searchText) {
        const data = filtersearch(searchText, allCD);
        setFilteredCD(data);
      } else {
        setFilteredCD(allCD);
      }
      setIsSearching(false); // Set isSearching to false after search completes
    }, 700);

    setTimer(newTimer);
    setIsSearching(true); // Set isSearching to true when search is initiated

    return () => {
      clearTimeout(newTimer);
    };
  }, [searchText, allCD]);


  function filtersearch(inputValue, searchRestaurant) {
    const filteredResults = searchRestaurant.filter((data) => {
      if (
        data.clientDetail.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        data.clientDetail.JobOrderNumber.toLowerCase().includes(inputValue.toLowerCase()) ||
        data.clientDetail.PhoneNumber.toLowerCase().includes(inputValue.toLowerCase()) ||
        data.clientDetail.Address.toLowerCase().includes(inputValue.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
    return filteredResults;
  }



  useEffect(() => {
    if (filteredCD) {
      setTotalCheckboxes(filteredCD.length -1);
      setSelectedCheckboxes(Object.values(checkboxStates).filter(Boolean).length);
      setTimeout(()=>{
        console.log("selectedCheckboxes",selectedCheckboxes ,"totalCheckboxes", totalCheckboxes)
        if(selectedCheckboxes === totalCheckboxes){
          setCheckedAll(true);
        }
      
      },1500)
      
    }
  }, [checkboxStates, filteredCD, selectedCheckboxes, totalCheckboxes]);
  




  const handleCheckBoxAll = () => {
  
    const updatedStates = {};
    const newValue = !checkedAll;
    for (let i = 0; i < filteredCD.length; i++) {
      updatedStates[i] = newValue;
    }
    setCheckboxStates(updatedStates);
    setCheckedAll(newValue);

  };



  const handleCheckBoxSingle = (index) => {
   
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }));
    
  
  };
  return (
    <div className="service-request-table">
      <table>
        <thead>
          <tr>
            <th>
              <CheckBox
                id="toggleAll"
              
                handleCheckboxChange={handleCheckBoxAll}
                checked={checkedAll}
              />
            </th>
            <th>JON</th>
            <th>NAME</th>
            <th>NUMBER</th>
            <th>
              <div>
                <span>ADDRESS</span>
                <HiChevronUpDown />
                <span></span>
              </div>
            </th>
            <th>TYPE</th>
            <th>
              {" "}
              <div>
                <span>MEMBERSHIP</span>
                <HiChevronUpDown />
                <span></span>
              </div>
            </th>
            <th>DATE</th>
            <th>TIME</th>
            <th>
              <div>
                {" "}
                <span>STATUS</span>
                <HiChevronUpDown />
                <span></span>
              </div>
            </th>
          </tr>
        </thead>

        {/* TABLE BODY STARTS */}
        <>
          {isSearching ? (
            <>
              <tr>
                <td colSpan="10">
                  <SkeltonLoader
                    width={"80vw"}
                    height={"38px"}
                    marginTop={"8px"}
                    marginBottom={"0px"}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="10">
                  <SkeltonLoader
                    width={"80vw"}
                    height={"38px"}
                    marginTop={"8px"}
                    marginBottom={"0px"}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="10">
                  <SkeltonLoader
                    width={"80vw"}
                    height={"38px"}
                    marginTop={"8px"}
                    marginBottom={"0px"}
                  />
                </td>
              </tr>
            </>
          ) : (filteredCD?.map((value,index) => {

            const isAssignedValue = value?.isAssigned;
            const enngID = value?.AssignedEng?.id;
            const name = value?.AssignedEng?.name;


            // Check if isAssigned is true, if not, don't render the row
            if (isAssignedValue) {
              return null;
            }

            return (
              <tbody key={value._id}>
                <tr className="selected">
                  <td>
                    {" "}
                    <CheckBox
                   
                      id={`checkbox-${index}`}
                      checked={checkboxStates[index] || false}
                      handleCheckboxChange={() => handleCheckBoxSingle(index)}
                    
                    />
                  </td>
                  <td>{value.JobOrderNumber}</td>
                  <td>{value?.clientDetail?.name}</td>
                  <td>{value?.clientDetail?.PhoneNumber}</td>

                  <td>
                    <div className="dropdown-address">
                      <span>
                        {limitAddress(value?.clientDetail?.Address, 15)}
                      </span>

                      <div className="dropdown-adddress-menu">
                        <div className="drop-address">
                          <p>{value?.clientDetail?.Address}</p>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>{value?.TypeOfIssue}</td>
                  <td>GOLD</td>
                  <td>{value?.RequestDate}</td>
                  <td>{value?.RequestTime}</td>

                  <td onClick={() => openModal(4, value?.RequestId, isAssignedValue, enngID)}>
                    {isAssignedValue ? (
                      <AssignDropdown
                        customAssignName="assignNameColor"
                        name={name}
                        isAssigned={isAssigned}
                      />
                    ) : (
                      <AssignDropdown customAssign="assignColor" name="Assign" />
                    )}
                  </td>
                </tr>
              </tbody>
            );
          }))
          }
        </>

        {showTicketModal4 && (
          <ServiceRequestModals
            closeModal={() => setShowTicketModal4(false)}
            showTicketModal={showTicketModal4}
            RequestId={RequestId}
            setRenderTicket={setRenderTicket}
            enggId={enggId}
            isAssigned={isAssigned}
          />
        )}

        {/* TABLE BODY ENDS */}
      </table>
    </div>
  );
};

export default ServiceRequestTable;
