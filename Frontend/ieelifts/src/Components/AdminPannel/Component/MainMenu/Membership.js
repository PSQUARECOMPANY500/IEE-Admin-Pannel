// <-----------------------------  Author:- Armaan Singh ----------------------------------->

import React from "react";
import MembershipCard from "../MembershipSubComponent/MembershipCard";

const warrentyDemoData = {
  dataType: "Warrenty",
  revenue: "2000",
  count: 35,
  expiringCount: 12,
  expiredCount: 4,
  data: [
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: true,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: true,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: true,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: true,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: true,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: true,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: true,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: true,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
  ],
};

const platinumDemoData = {
  dataType: "Platinum",
  revenue: "2000",
  count: 35,
  expiringCount: 12,
  expiredCount: 4,
  data: [
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: true,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: true,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
  ],
};

const goldDemoData = {
  dataType: "Gold",
  revenue: "2000",
  count: 35,
  expiringCount: 12,
  expiredCount: 4,
  data: [
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: true,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: true,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
  ],
};

const silverDemoData = {
  dataType: "Silver",
  revenue: "2000",
  count: 35,
  expiringCount: 12,
  expiredCount: 4,
  data: [
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: true,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: true,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
    {
      name: "Arjun Rawat",
      number: "1234567890",
      jon: "202100",
      address: "Address Address, Address Address",
      isExpired: false,
    },
  ],
};

const Membership = () => {
  return (
    <>
      <div className="main-container">
        <div className="membershipCards membershipCards_expand">
          <MembershipCard DemoData={warrentyDemoData} order={1} />
          <MembershipCard DemoData={platinumDemoData} order={2} />
          <MembershipCard DemoData={goldDemoData} order={3} />
          <MembershipCard DemoData={silverDemoData} order={4} />
        </div>
      </div>
    </>
  );
};

export default Membership;
