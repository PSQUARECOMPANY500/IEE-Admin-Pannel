import React from "react";
import { GoPerson } from "react-icons/go";
import { FaLocationArrow } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import { IoCallOutline } from "react-icons/io5";

const Clients = () => {
  return (
    <div className="main-container">
      <div className="ClientCatainer">
        <div className="clientCard">
          <div>
            <div className="client">
              <p>
                <GoPerson />
              </p>
              <p>Arjun Rawat</p>
            </div>
            <div className="client">
              <p>
                <IoCallOutline />
              </p>
              <p>9999988889</p>
            </div>
          </div>
          <div>
            <div className="client">
              <p>
                <FaLocationArrow
                  style={{
                    background: "black",
                    color: " white",
                    padding: "0.3rem",
                    width: "40%",
                    height: "40%",
                  }}
                />
              </p>
              <p>2022100</p>
            </div>
            <div className="client">
              <p>
                <GrHomeRounded />
              </p>
              <p>#1235, Phase 5, Sec 73, Mohali</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
