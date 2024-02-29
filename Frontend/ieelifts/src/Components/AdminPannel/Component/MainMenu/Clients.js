import React, { useEffect, useState, useRef } from "react";
import { GoPerson } from "react-icons/go";
import { FaLocationArrow } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import { IoCallOutline } from "react-icons/io5";
import { getClients } from "../../../../ReduxSetup/Actions/AdminActions";
import { useSelector, useDispatch } from "react-redux";
import { HiChevronUpDown } from "react-icons/hi2";
import CheckBox from "../DashboardSubComponent/CheckBox";
import { CiSearch } from "react-icons/ci";
import { LuSettings2 } from "react-icons/lu";
import { GoPlus } from "react-icons/go";

const Clients = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  // const socket = io('http://localhost:8000');

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('Connected to the server:', socket.id);
  //     socket.emit('send_message',{message:"hello"})
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

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
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

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
      {/* <div className="ClientCatainer">
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
      </div> */}
      <div className="ClientCatainer ">
        <div className="task-list-client ">
          <table className="task-list-table-client">
            <thead className="task-head-list">
              <tr>
                <th>
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
                <th>
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
            <tbody>
              {clients?.Clients.map((data, index) => {
                console.log("mast ram", data);

                return (
                  <tr className="selected" key={index}>
                    <td>
                      {" "}
                      <CheckBox
                        id={`checkbox-${data.callbackId}`}
                        checked={checkboxStates[data.callbackId]}
                        handleCheckboxChange={() =>
                          handleCheckBoxSingle(data.callbackId)
                        }
                      />
                    </td>
                    <td>{data.JobOrderNumber}</td>
                    <td>{data?.name}</td>
                    <td>{data?.PhoneNumber}</td>
                    <td>
                      <div className="dropdown-address">
                        <span>{limitAddress(data?.Address, 15)}</span>

                        <div className="dropdown-adddress-menu">
                          <div className="drop-address">
                            <p>{data?.Address}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{data?.callback}</td>
                    <td>{data?.MembershipType}</td>
                    <td>{data.ModelType}</td>
                    <td>{data.DateOfHandover}</td>
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

export default Clients;
