import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoChevronDownSharp } from "react-icons/io5";

const FilterDropdown = ({ className }) => {
  const [openFilter, setOpenFilter] = useState(null);

  const handleFilter = (filterName) => {
    setOpenFilter((prevFilter) =>
      prevFilter === filterName ? null : filterName
    );
  };

  return (
    <>
      <div className="filter-dropdown">
        <div className="child-filter-dropdown">
          <div className="search-bar-div">
            <span className={`search-icon-filter ${className}`}>
              <CiSearch />
            </span>
            <input type="text" placeholder="Search" />
          </div>

          <div className="filter-dropdowns">
            <div
              className="filter-icons"
              onClick={() => handleFilter("status")}
            >
              <span>By Status</span>
              <span>
                <IoChevronDownSharp />
              </span>
            </div>
            <div
              className="listing-filter"
              style={{
                maxHeight: openFilter === "status" ? "200px" : "0",
                opacity: openFilter === "status" ? 1 : 0,
                overflow: "hidden",
                transition:
                  "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
              }}
            >
              <ul className="filter-lists">
                <li>Scheduled</li>
                <li>Ongoing</li>
                <li>Completed</li>
              </ul>
            </div>
          </div>
          <span className="horizontal-row-filter"></span>

          {/* one list starts---------  */}
          <div className="filter-dropdowns">
            <div
              className="filter-icons"
              onClick={() => handleFilter("engineers")}
            >
              <span>By SE Names</span>
              <span>
                <IoChevronDownSharp />
              </span>
            </div>
            <div
              className="listing-filter"
              style={{
                maxHeight: openFilter === "engineers" ? "200px" : "0",
                opacity: openFilter === "engineers" ? 1 : 0,
                overflow: "hidden",
                transition:
                  "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
              }}
            >
              <ul className="filter-lists">
                <li>Service Engineer 1</li>
                <li>Service Engineer 2</li>
                <li>Service Engineer 3</li>
              </ul>
            </div>
          </div>
          <span className="horizontal-row-filter"></span>

          {/* location list starts---------  */}
          <div className="filter-dropdowns">
            <div
              className="filter-icons"
              onClick={() => handleFilter("location")}
            >
              <span>By Location</span>
              <span>
                <IoChevronDownSharp />
              </span>
            </div>
            <div
              className="listing-filter"
              style={{
                maxHeight: openFilter === "location" ? "200px" : "0",
                opacity: openFilter === "location" ? 1 : 0,
                overflow: "hidden",
                transition:
                  "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
              }}
            >
              <ul className="filter-lists">
                <li>Mohali</li>
                <li>Chandigarh</li>
                <li>Zirakpur</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterDropdown;
