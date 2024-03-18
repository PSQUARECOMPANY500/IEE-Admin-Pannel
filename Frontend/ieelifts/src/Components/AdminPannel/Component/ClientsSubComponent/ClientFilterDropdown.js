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
  const [filterSelections, setFilterSelections] = useState([]);

  const handleFilter = (filterName) => {
    if (filterName === "clear") {
      setFilterSelections([]); // Clear the filter selections
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

  // const handleOptionSelection = (type, condition) => {
  //   const existingFilterIndex = filterSelections.findIndex(
  //     (filter) => filter.type === type && filter.condition === condition
  //   );

  //   if (existingFilterIndex === -1) {
  //     setFilterSelections((prevSelections) => [
  //       ...prevSelections,
  //       { type, condition },
  //     ]);
  //   }
  // };

  const handleOptionSelection = (type, condition) => {
    // Check if the selected type is 'name' or 'date'
    if (type === "name" || type === "date") {
      // Filter out existing selections for 'name' or 'date'
      const filteredSelections = filterSelections.filter(
        (filter) => filter.type !== "name" && filter.type !== "date"
      );

      // Add the new selection for 'name' or 'date'
      setFilterSelections([...filteredSelections, { type, condition }]);
    } else {
      // For other types, handle as before
      const existingFilterIndex = filterSelections.findIndex(
        (filter) => filter.type === type && filter.condition === condition
      );

      if (existingFilterIndex === -1) {
        setFilterSelections((prevSelections) => [
          ...prevSelections,
          { type, condition },
        ]);
      }
    }
    console.log("these are filter selection:",filterSelections);
  };

  useEffect(() => {
    // Dispatch filtered data when filter selections change
    dispatch(getfilteredData(filterSelections));
    if (filterSelections.length > 0) {
      dispatch(searchClients(null));
    }
  }, [dispatch, filterSelections]);

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
      type: "date",
      label: "By Date of Handover",
      options: ["newest", "oldest"],
    },
    {
      type: "name",
      label: "By Alphabatical",
      options: ["a-z", "z-a"],
    },
    {
      type: "clear",
      label: "Clear Filter",
      options: [],
    },
  ];
  return (
    <div className="filter-dropdown">
      <div
        className="child-filter-dropdown"
        style={{
          maxHeight: "1000px",
          width: "200px",
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px",
        }}
      >
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
