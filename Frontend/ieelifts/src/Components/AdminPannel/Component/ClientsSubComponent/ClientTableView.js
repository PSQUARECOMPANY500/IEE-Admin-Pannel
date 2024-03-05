import React, { useState, useEffect } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import CheckBox from "../DashboardSubComponent/CheckBox";

const ClientTableView = ({ clientData }) => {
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

  // const limitAddress = (address, limit) => {
  //   return address?.slice(0, limit) + (address?.length > limit ? "..." : "");
  // };

  return (
    <div className="ClientCatainer tableContainer">
      <div className="table_view">
        <div className="task-list-client ">
          <table className="task-list-table-client">
            <thead className="task-head-list">
              <tr>
                <th className="checkbox">
                  <CheckBox
                    id="checkbox1"
                    checked={checkboxStates.checkbox1}
                    handleCheckboxChange={() => handleCheckBoxAll("checkbox1")}
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
                <th>CallBacks</th>
                <th className="membership">
                  <div>
                    <span>Membership</span>
                    <HiChevronUpDown />
                    <span></span>
                  </div>
                </th>
                <th>Elevator</th>
                <th>DOH</th>
              </tr>
            </thead>

            {/* TABLE BODY STARTS */}

            <tbody className="tbody-main">
              {clientData &&
                clientData?.map((data, index) => {
                  return (
                    <tr className="selected" key={index}>
                      <td className="checkbox">
                        {" "}
                        <CheckBox
                          id={`checkbox-${data.callbackId}`}
                          checked={checkboxStates[data.callbackId]}
                          handleCheckboxChange={() =>
                            handleCheckBoxSingle(data.callbackId)
                          }
                        />
                      </td>
                      <td className="JON">{data.JobOrderNumber}</td>
                      <td className="name">{data?.name}</td>
                      <td className="checkbox">{data?.PhoneNumber}</td>
                      <td className="address">S{data?.Address}</td>
                      <td className="callback">
                        {data?.callback ? data?.callback : 0}
                      </td>
                      <td className="membership">
                        {data?.MembershipType ? data?.MembershipType : "NONE"}
                      </td>
                      <td className="address">{data.ModelType}</td>
                      <td className="address">{data.DateOfHandover}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientTableView;
