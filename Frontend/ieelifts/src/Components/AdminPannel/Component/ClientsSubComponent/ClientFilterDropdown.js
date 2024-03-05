import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoChevronDownSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { getfilteredData } from "../../../../ReduxSetup/Actions/AdminActions";

const ClientFilterDropdown = () => {
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(null);
  const [filterSelection, setFilterSelection] = useState();

  const handleFilter = (filterName) => {
    setOpenFilter((prevFilter) =>
      prevFilter === filterName ? null : filterName
    );
  };

  const handleOptionSelection = (type, condition) => {
    setFilterSelection({ type, condition });
  };

  useEffect(() => {
    dispatch(getfilteredData(filterSelection));
  }, [dispatch, filterSelection]);

  return (
    <div className="filter-dropdown">
      <div className="child-filter-dropdown">
        <div className="search-bar-div">
          <span className="search-icon-filter">
            <CiSearch />
          </span>
          <input type="text" placeholder="search" />
        </div>
        <div
          className="filter-icons clear_section"
          onClick={() => {
            setFilterSelection(null);
          }}
        >
          Clear Filter
        </div>

        {filters.map((filter) => (
          <div key={filter.type} className="filter-dropdowns">
            <div
              className="filter-icons"
              onClick={() => handleFilter(filter.type)}
            >
              <span>{filter.label}</span>
              <span>
                <IoChevronDownSharp />
              </span>
            </div>
            <div
              className="listing-filter"
              style={{
                maxHeight: openFilter === filter.type ? "200px" : "0",
                opacity: openFilter === filter.type ? 1 : 0,
                overflow: "hidden",
                transition:
                  "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
              }}
            >
              <ul className="filter-lists">
                {filter.options.map((option) => (
                  <li
                    key={option}
                    onClick={() => handleOptionSelection(filter.type, option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const filters = [
  {
    type: "membership",
    label: "By Membership",
    options: ["Warrenty", "Platinum", "Gold", "Silver"],
  },
  {
    type: "elevatorType",
    label: "By Elevator type",
    options: ["Opulent", "Hydrolic"],
  },
  {
    type: "location",
    label: "By Location",
    options: ["Mohali", "Chandigarh", "Zirakpur"],
  },
];

export default ClientFilterDropdown;
