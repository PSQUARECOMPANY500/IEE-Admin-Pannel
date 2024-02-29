import React, { useEffect, useState} from "react";
import { GoPerson } from "react-icons/go";
import { FaLocationArrow } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import { IoCallOutline } from "react-icons/io5";
import { getClients } from "../../../../ReduxSetup/Actions/AdminActions";
import { useSelector, useDispatch } from "react-redux";
import { HiChevronUpDown } from "react-icons/hi2";
import CheckBox from "../DashboardSubComponent/CheckBox";

const Clients = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);


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


  const clients = useSelector((state) => {
    if (state.AdminRootReducer && state.AdminRootReducer.getClientsReducer) {
      return state?.AdminRootReducer?.getClientsReducer.clients;
    } else {
      return null;
    }
  });

  const limitAddress = (address, limit) => {
    return address?.slice(0, limit) + (address?.length > limit ? "..." : "");
  };

  function setBoxShadow(type) {
    return type === "warrenty"
      ? "clientCardShadowWarrenty"
      : type === "platinum"
      ? "clientCardShadowPlatinum"
      : type === "gold"
      ? "clientCardShadowGold"
      : type === "silver"
      ? "clientCardShadowSilver"
      : "noMembershipP";
  }

  return (
    <div className="main-container">
      <div className="ClientCatainer">
        {clients.Clients.map((client, index) => (
          <div
            key={index}
            className={`clientCard ${setBoxShadow(client.MembershipType)}`}
          >
            <div className="clientInfo">
              <div className="clientCards">
                <div className="client ">
                  <p>
                    <GoPerson />
                  </p>
                  {client.name.length > 12
                    ? `${client.name.slice(0, 12)}...`
                    : client.name}
                </div>

                <div className="client ">
                  <p>
                    <IoCallOutline />
                  </p>
                  <p>{client.PhoneNumber}</p>
                </div>
              </div>
              <div className="clientCards ">
                <div className="client ">
                  <p>
                    <FaLocationArrow className="locationArrow" />
                  </p>
                  <p>{client.JobOrderNumber}</p>
                </div>
                <div className="client ">
                  <p>
                    <GrHomeRounded />
                  </p>
                  <p>
                    {client.Address.length > 25
                      ? `${client.Address.slice(0, 25)}...`
                      : client.Address}
                  </p>
                </div>
              </div>
            </div>
            <div className="clientInfo2">
              <div className="client2">
                <p className="Info">
                  {client.CallbackCount ? client.CallbackCount : 0}
                </p>
                <p cla>CallBack</p>
              </div>
              <div className="client2">
                <p className="Info">{client.ModelType}</p>
                <p>Elevator</p>
              </div>
              <div className="client2">
                <p className="Info">{client.DateOfHandover}</p>
                <p>DOH</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="ClientCatainer ">
        <div className="table_view">
          <div className="task-list-client ">
            <table className="task-list-table-client">
              <thead className="task-head-list">
                <tr>
                  <th className="checkbox">
                    <CheckBox
                      id="checkbox1"
                      checked={checkboxStates.checkbox1}
                      handleCheckboxChange={() =>
                        handleCheckBoxAll("checkbox1")
                      }
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
                {clients?.Clients.map((data, index) => {
                  console.log("mast ram", data);

                  return (
                    <>
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
                        <td className="JON">{data?.PhoneNumber}</td>
                        <td className="address">
                          <div className="dropdown-address">
                            {limitAddress(data?.Address, 30)}

                            <div className="dropdown-adddress-menu">
                              <div className="drop-address">
                                <p>{data?.Address}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="callback">
                          {data?.callback ? data?.callback : 0}
                        </td>
                        <td className="membership">
                          {data?.MembershipType ? data?.MembershipType : "NONE"}
                        </td>
                        <td  className="address">{data.ModelType}</td>
                        <td  className="address">{data.DateOfHandover}</td>
                      </tr>
                      {/* <hr style={{ width: "100%" }} /> */}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
