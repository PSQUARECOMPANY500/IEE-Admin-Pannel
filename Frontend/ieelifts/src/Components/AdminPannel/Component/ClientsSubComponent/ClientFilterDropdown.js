// import React, { useState } from "react";
// import { CiSearch } from "react-icons/ci";
// import { IoChevronDownSharp } from "react-icons/io5";

// const ClientFilterDropdown = () => {
//   const [openFilter, setOpenFilter] = useState(null);
//   const [filterSelection, setFilterSelection] = useState();

//   const handleFilter = (filterName) => {
//     setOpenFilter((prevFilter) =>
//       prevFilter === filterName ? null : filterName
//     );
//   };
//     console.log(filterSelection);
//   return (
//     <>
//       <div className="filter-dropdown">
//         <div className="child-filter-dropdown">
//           <div className="search-bar-div">
//             <span className={`search-icon-filter`}>
//               <CiSearch />
//             </span>
//             <input type="text" placeholder="search"></input>
//           </div>

//           <div className="filter-dropdowns">
//             <div
//               className="filter-icons"
//               onClick={() => handleFilter("status")}
//             >
//               <span>By Membership</span>
//               <span>
//                 <IoChevronDownSharp />
//               </span>
//             </div>
//             <div
//               className="listing-filter"
//               style={{
//                 maxHeight: openFilter === "status" ? "200px" : "0",
//                 opacity: openFilter === "status" ? 1 : 0,
//                 overflow: "hidden",
//                 transition:
//                   "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
//               }}
//             >
//               <ul className="filter-lists">
//                 <li
//                   onClick={() => {
//                     setFilterSelection({
//                       type: "membership",
//                       condition: "warrenty",
//                     });
//                   }}
//                 >
//                   Warrenty
//                 </li>
//                 <li
//                   onClick={() => {
//                     setFilterSelection({
//                       type: "membership",
//                       condition: "platinum",
//                     });
//                   }}
//                 >
//                   Platinum
//                 </li>
//                 <li
//                   onClick={() => {
//                     setFilterSelection({
//                       type: "membership",
//                       condition: "gold",
//                     });
//                   }}
//                 >
//                   Gold
//                 </li>
//                 <li
//                   onClick={() => {
//                     setFilterSelection({
//                       type: "membership",
//                       condition: "silver",
//                     });
//                   }}
//                 >
//                   Silver
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <span className="horizontal-row-filter"></span>

//           {/* one list starts---------  */}
//           <div className="filter-dropdowns">
//             <div
//               className="filter-icons"
//               onClick={() => handleFilter("engineers")}
//             >
//               <span>By Elevator type</span>
//               <span>
//                 <IoChevronDownSharp />
//               </span>
//             </div>
//             <div
//               className="listing-filter"
//               style={{
//                 maxHeight: openFilter === "engineers" ? "200px" : "0",
//                 opacity: openFilter === "engineers" ? 1 : 0,
//                 overflow: "hidden",
//                 transition:
//                   "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
//               }}
//             >
//               <ul className="filter-lists">
//                 <li
//                   onClick={() => {
//                     setFilterSelection({
//                       type: "elevatorType",
//                       condition: "opulent",
//                     });
//                   }}
//                 >
//                   Opulent
//                 </li>
//                 <li
//                   onClick={() => {
//                     setFilterSelection({
//                       type: "elevatorType",
//                       condition: "hydrolic",
//                     });
//                   }}
//                 >
//                   Opulent
//                 </li>
//                 <li>Hydrolic</li>
//                 <li>Hydrolic</li>
//                 <li>Hydrolic</li>
//                 <li>Hydrolic</li>
//               </ul>
//             </div>
//           </div>
//           <span className="horizontal-row-filter"></span>

//           {/* location list starts---------  */}
//           <div className="filter-dropdowns">
//             <div
//               className="filter-icons"
//               onClick={() => handleFilter("location")}
//             >
//               <span>By Location</span>
//               <span>
//                 <IoChevronDownSharp />
//               </span>
//             </div>
//             <div
//               className="listing-filter"
//               style={{
//                 maxHeight: openFilter === "location" ? "200px" : "0",
//                 opacity: openFilter === "location" ? 1 : 0,
//                 overflow: "hidden",
//                 transition:
//                   "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
//               }}
//             >
//               <ul className="filter-lists">
//                 <li
//                   onClick={() => {
//                     setFilterSelection({
//                       type: "location",
//                       condition: "mohali",
//                     });
//                   }}
//                 >
//                   Mohali
//                 </li>
//                 <li
//                   onClick={() => {
//                     setFilterSelection({
//                       type: "location",
//                       condition: "chandigarh",
//                     });
//                   }}
//                 >
//                   Chandigarh
//                 </li>
//                 <li
//                   onClick={() => {
//                     setFilterSelection({
//                       type: "location",
//                       condition: "zirakpur",
//                     });
//                   }}
//                 >
//                   Zirakpur
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ClientFilterDropdown;
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
