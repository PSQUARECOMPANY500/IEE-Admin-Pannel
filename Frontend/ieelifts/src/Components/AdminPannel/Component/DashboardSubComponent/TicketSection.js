import React, { useState, useEffect, useRef } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import CheckBox from "./CheckBox";
import { CiSearch } from "react-icons/ci";
import { LuSettings2 } from "react-icons/lu";
import AssignDropdown from "./AssignDropdown";
import FilterDropdown from "./FilterDropdown";
import { GoPlus } from "react-icons/go";
import AddTicketModal from "./AddTicketModal";
import SkeltonLoader from "../../../CommonComponenets/SkeltonLoader";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCallbacksAction } from "../../../../ReduxSetup/Actions/AdminActions";
import AddTicketOnCallRequest from "./AddTicketOnCallRequest";
import AddTicketOnCallRequests from "./AddTicketOnCallRequests";
import AddTicketModals from "./AddTicketModals";

const TicketSection = ({ setTicketUpdate }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [callbackId, setCallbackId] = useState();
  const [enggId, setEnggId] = useState();
  const [isAssigned, setIsAssigned] = useState();
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showTicketModal1, setShowTicketModal1] = useState(false);
  const [showTicketModal2, setShowTicketModal2] = useState(false);
  const [showTicketModal3, setShowTicketModal3] = useState(false);
  const [showTicketFilter, setShowTicketFilter] = useState(false);

  // const [checkedAll, setCheckedAll] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState([]);

  const fetchCallbacks = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.fetchAllCallbackReducer &&
      state.AdminRootReducer.fetchAllCallbackReducer.callbacks
    ) {
      return state.AdminRootReducer.fetchAllCallbackReducer.callbacks.Callbacks;
    } else {
      return [];
    }
  });
  //.................................................................ax13-search-func-starts----------------------------------------------------------
  const [searchText, setSearchText] = useState("");
  const [filteredCD, setFilteredCD] = useState([]);
  const [allCD, setallCD] = useState([]);
  const [timer, setTimer] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setFilteredCD(fetchCallbacks);
    setallCD(fetchCallbacks);
  }, [fetchCallbacks]);

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
        data.clientDetail.name
          .toLowerCase()
          .includes(inputValue.toLowerCase()) ||
        data.clientDetail.JobOrderNumber.toLowerCase().includes(
          inputValue.toLowerCase()
        ) ||
        data.clientDetail.PhoneNumber.toLowerCase().includes(
          inputValue.toLowerCase()
        ) ||
        data.clientDetail.Address.toLowerCase().includes(
          inputValue.toLowerCase()
        )
      ) {
        return true;
      }
      return false;
    });
    return filteredResults;
  }

  //.................................................................ax13-search-func-starts----------------------------------------------------------
  const limitAddress = (address, limit) => {
    return address?.slice(0, limit) + (address?.length > limit ? "..." : "");
  };
  const handleTicketFilter = () => {
    setShowTicketFilter(!showTicketFilter);
  };
  //............................................................{amit}...................
  const [renderTicket, setRenderTicket] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchAllCallbacksAction());
    }, 1000);
  }, [renderTicket, dispatch]);
  //.............................................................{/amit}.................
  const closeModal = () => setShowTicketModal(false);

  //.............................................................{/armaan}.................

  useEffect(() => {
    if (fetchCallbacks) {
      setCheckboxStates(Array(fetchCallbacks.length).fill(false));
    }
  }, [fetchCallbacks]);
  const handleCheckBoxAll = () => {
    if (fetchCallbacks) {
      const allChecked = checkboxStates.every((isChecked) => isChecked);
      setCheckboxStates(Array(fetchCallbacks.length).fill(!allChecked));
    }
  };
  const handleCheckBoxSingle = (index) => {
    setCheckboxStates((prevStates) => {
      const newCheckboxStates = [...prevStates];
      newCheckboxStates[index] = !prevStates[index];
      return newCheckboxStates;
    });
  };
  //.............................................................{/armaan}.................

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.classList.contains("filter-icon")
      ) {
        setShowTicketFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  const openModal = (modalNumber, callbackIdOnModel, EngId, isAssigned) => {
    // Use the appropriate modal number to open the corresponding modal
    if (modalNumber === 1) {
      setCallbackId(callbackIdOnModel); // Set the callbackId here
      setEnggId(EngId);
      setIsAssigned(isAssigned);
      setShowTicketModal1(true);
    } else if (modalNumber === 2) {
      setShowTicketModal2(true);
    } else if (modalNumber === 3) {
      setShowTicketModal3(true);
    } else if (modalNumber === 0) {
      setShowTicketModal(true);
    }
  };
  return (
    <div className="parent-full-div">
      <div className="child-ticket-div">
        <div className="heading-icon-align">
          <div className="ticket-section-heading">
            <span>TICKETS</span>
            <span>(</span>
            <span> TAT 3 HOURS</span>
            <span> )</span>
          </div>
          {/* ............................................................ax13-search...................................................... */}

          <div className="icon-align-div">
            <div className="right-side-icons" style={{ display: "grid" }}>
              <span className="filter-top-icon">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search anything"
                    className="search-input"
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                  />
                  <button
                    className="search-btn-ticket-section"
                    onClick={() => {
                      const data = filtersearch(searchText, allCD);
                      setFilteredCD(data);
                    }}
                  >
                    <i>
                      <CiSearch />
                    </i>
                  </button>
                </div>
              </span>
            </div>

            {/* ............................................................ax13-search...................................................... */}

            <div className="sub-components-ticket-filter">
              <p className="filter-icon" onClick={handleTicketFilter}>
                <LuSettings2 />
                {""}
              </p>
              {showTicketFilter && (
                <div className="dropdown-content-filter" ref={dropdownRef}>
                  <FilterDropdown className="search-ticket-filter-icon" />
                </div>
              )}
            </div>

            {/* add  ticket +icon */}

            <div
              className="sub-components-ticket-filter"
              onClick={() => openModal(0)}
            >
              <p className="plus-icon">
                <GoPlus />
                {""}
              </p>
            </div>
            {showTicketModal && (
              <AddTicketOnCallRequests
                closeModal={closeModal}
                showTicketModal={showTicketModal}
                setRenderTicket={setRenderTicket}
                setTicketUpdate={setTicketUpdate}
                requestSection={false}
              />
            )}
          </div>
        </div>

        <div className="my_table-container">
          <table>
            <thead>
              <tr>
                <th>
                  {" "}
                  <CheckBox
                    id="checkbox1"
                    checked={checkboxStates.every((isChecked) => isChecked)}
                    handleCheckboxChange={handleCheckBoxAll}
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
                <th>DESCRIPTION</th>
                <th>TYPE</th>
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

            <tbody>
              {isSearching ? (
                <>
                  <tr style={{ overflowX: "hidden" }}>
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
              ) : (
                filteredCD.map((data, index) => {
                  const currentCallbackId = data.callbackId;
                  const EngName = data.AssignedEng?.name;
                  const EngId = data.AssignedEng?.id;
                  const isAssigned = data.isAssigned;
                  const createdAtTime = new Date(data.createdAt); // Convert createdAt string to Date object
                  const currentTime = new Date();
                  // Calculate time difference in milliseconds
                  const timeDifference = currentTime - createdAtTime;
                  const thirtyMinutesInMilliseconds = 30 * 60 * 1000; // 30 minutes in milliseconds

                  // Check if the time difference is greater than or equal to 30 minutes
                  const isTimeoutData =
                    timeDifference >= thirtyMinutesInMilliseconds;
                  return (
                    <tr className="selected" key={index}>
                      <td>
                        {" "}
                        <CheckBox
                          id={`checkbox-${index}`}
                          checked={checkboxStates[index]}
                          handleCheckboxChange={() =>
                            handleCheckBoxSingle(index)
                          }
                        />
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data.JobOrderNumber}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data?.clientDetail?.name}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data?.clientDetail?.PhoneNumber}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        <div className="dropdown-address">
                          <span
                            className={
                              !isAssigned && isTimeoutData ? "timeout-data" : ""
                            }
                          >
                            {limitAddress(data?.clientDetail?.Address, 15)}
                          </span>

                          <div className="dropdown-adddress-menu">
                            <div className="drop-address">
                              <p
                                className={
                                  !isAssigned && isTimeoutData
                                    ? "timeout-data"
                                    : ""
                                }
                              >
                                {data?.clientDetail?.Address}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data.Description}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data.TypeOfIssue}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data.callbackDate}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                      >
                        {data.callbackTime}
                      </td>
                      <td
                        className={
                          !isAssigned && isTimeoutData ? "timeout-data" : ""
                        }
                        onClick={() =>
                          openModal(1, currentCallbackId, EngId, isAssigned)
                        }
                      >
                        {isAssigned ? (
                          <AssignDropdown
                            customAssignName="assignNameColor"
                            name={EngName}
                            isAssigned={isAssigned}
                          />
                        ) : (
                          <AssignDropdown
                            customAssign="assignColor"
                            name="Assign"
                          />
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>

            {showTicketModal1 && (
              <AddTicketModals
                closeModal={() => setShowTicketModal1(false)}
                showTicketModal={showTicketModal1}
                callbackId={callbackId}
                setRenderTicket={setRenderTicket}
                setTicketUpdate={setTicketUpdate}
                enggId={enggId}
                isAssigned={isAssigned}
              />
            )}
            {/* TABLE BODY ENDS */}
          </table>
        </div>
        {/* table end here */}
      </div>
    </div>
  );
};

export default TicketSection;
