import React from "react";
import { GoPerson } from "react-icons/go";
import { FaLocationArrow } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import { IoCallOutline } from "react-icons/io5";

const clientCardView = ({ clientData }) => {
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
  console.log(clientData);
  return (
    <div className="ClientCatainer">
      {clientData &&
        clientData.map((client, index) => (
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
  );
};

export default clientCardView;
