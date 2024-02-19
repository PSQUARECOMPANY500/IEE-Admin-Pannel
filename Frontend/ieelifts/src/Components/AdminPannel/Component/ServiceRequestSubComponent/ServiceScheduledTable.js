import React, { useState, useEffect, useRef } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import CheckBox from "../DashboardSubComponent/CheckBox";

import AssignDropdown from "../DashboardSubComponent/AssignDropdown";
import AddTicketModal from "../DashboardSubComponent/AddTicketModal";

const data = [
  {
    JON: 563553,
  },
  {
    JON: 563553,
  },
  {
    JON: 563553,
  },
  {
    JON: 563553,
  },
  {
    JON: 563553,
  },
];

const ServiceScheduledTable = () => {
  const dropdownRef = useRef(null);

  // modal manage states

  const [showTicketModal5, setShowTicketModal5] = useState(false);

  const [showTicketFilter, setShowTicketFilter] = useState(false);

  const [checkedAll, setCheckedAll] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    checkbox1: false,
    checkbox2: false,
  });

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

  const openModal = (modalNumber) => {
    // Use the appropriate modal number to open the corresponding modal
    if (modalNumber === 5) {
      setShowTicketModal5(true);
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
            <th>MEMBERSHIP</th>
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
        {data.map((value) => (
          <tbody>
            <tr className="selected">
              <td>
                {" "}
                <CheckBox
                  id="checkbox1"
                  checked={checkboxStates.checkbox1}
                  handleCheckboxChange={() => handleCheckBoxSingle("checkbox1")}
                />
              </td>
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
              <td>SERVICE E1</td>
              <td>GOLD</td>
              <td onClick={() => openModal(5)}>
                <AssignDropdown customAssign="assignColor" name="Assign" />
              </td>
              {showTicketModal5 && (
                <AddTicketModal
                  closeModal={() => setShowTicketModal5(false)}
                  showTicketModal={showTicketModal5}
                  modalNumber={5}
                />
              )}
            </tr>
          </tbody>
        ))}

        {/* TABLE BODY ENDS */}
      </table>
    </div>
  );
};

export default ServiceScheduledTable;