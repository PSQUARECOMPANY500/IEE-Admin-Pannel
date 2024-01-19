import React, { useState, useEffect, useRef } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import CheckBox from "./CheckBox";
import { CiSearch } from "react-icons/ci";
import { LuSettings2 } from "react-icons/lu";
import AssignDropdown from "./AssignDropdown";
import FilterDropdown from "./FilterDropdown";
import { GoPlus } from "react-icons/go";
import AddTicketModal from "./AddTicketModal";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllCallbacksAction } from "../../../../ReduxSetup/Actions/AdminActions";

const TicketSection = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  // modal manage states

  const [showTicketModal, setShowTicketModal] = useState(false);

  const [showTicketModal1, setShowTicketModal1] = useState(false);
  const [showTicketModal2, setShowTicketModal2] = useState(false);
  const [showTicketModal3, setShowTicketModal3] = useState(false);

  const [showTicketFilter, setShowTicketFilter] = useState(false);

  const [checkedAll, setCheckedAll] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    checkbox1: false,
    checkbox2: false,
  });

  const fetchCallbacks = useSelector((state) => {
    if (state.slice1 && state.slice1.fetchAllCallbackReducer && state.slice1.fetchAllCallbackReducer.callbacks) {
      return state.slice1.fetchAllCallbackReducer.callbacks.Callbacks;
    } else {
      return [];
    }
  });
 

  console.log(fetchCallbacks);

  const handleTicketFilter = () => {
    console.log("this is handle filter function");
    setShowTicketFilter(!showTicketFilter);
  };

  useEffect(() => {
    dispatch(fetchAllCallbacksAction());
  }, [dispatch]);

  const closeModal = () => setShowTicketModal(false);
  // const closeModal1 = () => setShowTicketModal1(false);
  const closeModal2 = () => setShowTicketModal2(false);
  const closeModal3 = () => setShowTicketModal3(false);

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
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const openModal = (modalNumber) => {
    // Use the appropriate modal number to open the corresponding modal
    if (modalNumber === 1) {
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

          <div className="icon-align-div">
            <div className="right-side-icons">
              <span className="filter-top-icon">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search anything"
                    className="search-input"
                  />
                  <a href="/" className="search-btn-ticket-section">
                    <i>
                      <CiSearch />
                    </i>
                  </a>
                </div>
              </span>
            </div>

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
              <AddTicketModal
                closeModal={closeModal}
                showTicketModal={showTicketModal}
                modalNumber={0}
              />
            )}
          </div>
        </div>

        <div>
          {/* table start here */}
          <div className="task-list">
            <table className="task-list-table">
              <thead>
                <tr>
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
              

                {fetchCallbacks.map((data) => (
                  <tr className="selected" key={data.callbackId}>
                  <td>{data.JobOrderNumber}</td>
                  <td>ram kumar</td>
                  <td>9416484863</td>
                  <td>
                    <div className="dropdown-address">
                      <span>ADDRESS ADDRESS</span>

                      <div className="dropdown-adddress-menu">
                        <div className="drop-address">
                          <p>
                            Address: E 26, Phase 7, Industrial Area, Sector 73,
                            Sahibzada Ajit Singh Nagar, Punjab 140308
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{data.Description}</td>
                  <td>{data.TypeOfIssue}</td>
                  <td>{data.callbackDate}</td>
                  <td>{data.callbackTime}</td>
                  <td onClick={() => openModal(1)}>
                    <AssignDropdown customAssign="assignColor" name="Assign" />
                  </td>
                  {showTicketModal1 && (
                    <AddTicketModal
                      closeModal={() => setShowTicketModal1(false)}
                      showTicketModal={showTicketModal1}
                      modalNumber={1}
                    />
                  )}
                </tr>
                ))}



              </tbody>
              {/* TABLE BODY ENDS */}
            </table>
          </div>
          {/* table end here */}
        </div>
      </div>
    </div>
  );
};

export default TicketSection;

{
  /* <tr className="selected">
<td>442113</td>
<td>ram kumar</td>
<td>9416484863</td>
<td>
  <div className="dropdown-address">
    <span>ADDRESS ADDRESS</span>

    <div className="dropdown-adddress-menu">
      <div className="drop-address">
        <p>
          Address: E 26, Phase 7, Industrial Area, Sector 73,
          Sahibzada Ajit Singh Nagar, Punjab 140308
        </p>
      </div>
    </div>
  </div>
</td>
<td>DESCRIPTION DESCRIPTION</td>
<td>Door</td>
<td>12/10/2020</td>
<td>12:00PM</td>
<td onClick={() => openModal(2)}>
  <AssignDropdown
    customAssignName="assignNameColor"
    name="Mohan"
  />
</td>
{showTicketModal2 && (
  <AddTicketModal
    closeModal={closeModal2}
    showTicketModal={showTicketModal2}
    modalNumber={2}
  />
)}
</tr>

<tr className="selected">
<td>442113</td>
<td>ram kumar</td>
<td>9416484863</td>
<td>
  <div className="dropdown-address">
    <span>ADDRESS ADDRESS</span>

    <div className="dropdown-adddress-menu">
      <div className="drop-address">
        <p>
          Address: E 26, Phase 7, Industrial Area, Sector 73,
          Sahibzada Ajit Singh Nagar, Punjab 140308
        </p>
      </div>
    </div>
  </div>
</td>
<td>DESCRIPTION DESCRIPTION</td>
<td>Door</td>
<td>12/10/2020</td>
<td>12:00PM</td>
<td onClick={() => openModal(3)}>
  <AssignDropdown
    customResolved="assignResolved"
    name="Resolved"
  />
</td>
{showTicketModal3 && (
  <AddTicketModal
    closeModal={closeModal3}
    showTicketModal={showTicketModal3}
    modalNumber={3}
  />
)}
</tr> */
}
