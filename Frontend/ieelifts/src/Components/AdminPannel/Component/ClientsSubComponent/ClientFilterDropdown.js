// <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React, { useEffect, useLayoutEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoChevronDownSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilterLocation,
  getfilteredData,
  searchClients,
} from "../../../../ReduxSetup/Actions/AdminActions";

const ClientFilterDropdown = () => {
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(null);
  const [filterSelection, setFilterSelection] = useState();

  const handleFilter = (filterName) => {
    if (filterName === "clear") {
      setFilterSelection(null);
    } else {
      setOpenFilter((prevFilter) =>
        prevFilter === filterName ? null : filterName
      );
    }
  };
  useLayoutEffect(() => {
    dispatch(getFilterLocation());
  }, [dispatch]);

  const locations = useSelector(
    (state) => state?.AdminRootReducer?.filteringLocationsReducer
  );

  const handleOptionSelection = (type, condition) => {
    setFilterSelection({ type, condition });
  };

  useEffect(() => {
    dispatch(getfilteredData(filterSelection));
    if (filterSelection !== null) {
      dispatch(searchClients(null));
    }
  }, [dispatch, filterSelection]);
  const filters = [
    {
      type: "membership",
      label: "By Membership",
      options: ["Warrenty", "Platinum", "Gold", "Silver"],
    },
    {
      type: "elevatorType",
      label: "By Elevator type",
      options: ["Hydraulic", "Gearless", "Geared"],
    },
    {
      type: "location",
      label: "By Location",
      options: locations?.locations?.locations,
    },
    {
      type: "clear",
      label: "Clear Filter",
      options: [],
    },
  ];
  return (
    <div className="filter-dropdown">
      <div className="child-filter-dropdown">
        <div className="search-bar-div">
          <span className="search-icon-filter">
            <CiSearch />
          </span>
          <input type="text" placeholder="search" />
        </div>

        {filters.map((filter, index) => (
          <div key={index} className="filter-dropdowns">
            <div
              className="filter-icons"
              onClick={() => handleFilter(filter.type)}
            >
              <span>{filter.label}</span>
              {filter.type !== "clear" && (
                <span>
                  <IoChevronDownSharp />
                </span>
              )}
            </div>
            {filter.type !== "clear" && (
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
                  {locations &&
                    locations?.locations?.locations &&
                    filter.options.map((option, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          handleOptionSelection(
                            filter.type,
                            filter.type === "location"
                              ? option.location
                              : option
                          )
                        }
                      >
                        {filter.type === "location" ? option.location : option}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientFilterDropdown;
