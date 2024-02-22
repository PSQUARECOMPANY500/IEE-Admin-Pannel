import React from "react";

const ClientDetails = () => {
  return (
    <div className="clientDetailContainer">
      <div>
        <img
          src={`https://ieelifts.com/wp-content/uploads/2023/08/03-972x1024.jpg`}
          width={100}
        />
      </div>
      <div>
        <div>
          <p className="clientName">Arjun Rawat</p>
          <p>JON: 2022134</p>
          <p>98989 98989</p>
          <p>Address Address, Address Address</p>
        </div>
        <div className="clientDetail">
          <p>DOH: 20/12/2014</p>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
