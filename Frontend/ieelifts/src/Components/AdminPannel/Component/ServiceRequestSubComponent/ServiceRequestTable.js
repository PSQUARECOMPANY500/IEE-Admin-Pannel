import React, { useState, useEffect, useRef } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import CheckBox from "../DashboardSubComponent/CheckBox";

import AssignDropdown from "../DashboardSubComponent/AssignDropdown";
import AddTicketModal1 from "../DashboardSubComponent/AddTicketModal1";
import ServiceScheduledTable from "./ServiceScheduledTable";
import ServiceRequestModal from "./ServiceRequestModal";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllServiceRequestsAction } from "../../../../ReduxSetup/Actions/AdminActions";


const ServiceRequestTable = ({setRenderTicket2}) => {

  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const [RequestId, setRequestId] = useState();

  const [enggId, setEnggId] = useState();
  const [isAssigned, setIsAssigned] = useState();


  const [renderTicket, setRenderTicket] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRenderTicket2((prev)=>!prev);
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
  // console.log("getRequestDetail", getRequestDetail);

  // modal manage states
  const [showTicketModal4, setShowTicketModal4] = useState(false);

  const [showTicketFilter, setShowTicketFilter] = useState(false);

  const [checkedAll, setCheckedAll] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    checkbox1: false,
    checkbox2: false,
  });

  //use effect for dispatching ations
  useEffect(() => {
    dispatch(fetchAllServiceRequestsAction());
  }, [dispatch]);

  //linit address logic
  const limitAddress = (address, limit) => {
    return address?.slice(0, limit) + (address?.length > limit ? "..." : "");
  };

  useEffect(() => {}, [checkboxStates]);
  const handleCheckBoxAll = () => {
    setCheckedAll(!checkedAll);
    setCheckboxStates((prevStates) => {
      const updatedStates = {};
      Object.keys(prevStates).forEach((key) => {
        updatedStates[key] = !checkedAll;
      });
      return updatedStates;
    });
  };

  const handleCheckBoxSingle = (checkboxId) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [checkboxId]: !prevStates[checkboxId],
    }));
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

  const openModal = (modalNumber, requestId,isAssignedValue,enngID) => {
    // Use the appropriate modal number to open the corresponding modal
    if (modalNumber === 4) {
      setShowTicketModal4(true);
      setRequestId(requestId);
      setIsAssigned(isAssignedValue);
      setEnggId(enngID);
    }
  };

  return (
    <div className="task-list">
      <table className="task-list-table">
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
        {getRequestDetail?.map((value) => {
          
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
                    id="checkbox1"
                    checked={checkboxStates.checkbox1}
                    handleCheckboxChange={() =>
                      handleCheckBoxSingle("checkbox1")
                    }
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

                <td onClick={() => openModal(4,value?.RequestId,isAssignedValue,enngID)}>
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
        })}

        {showTicketModal4 && (
          <ServiceRequestModal
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
