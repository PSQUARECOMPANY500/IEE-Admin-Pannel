// <-----------------------------  Author:- Armaan Singh ----------------------------------->

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getClientMembershipDetails,
  getClientMembershipHistoryAction,
  getClientCallsDetails,
} from "../../../../ReduxSetup/Actions/AdminActions";

const MembershipSubCard = ({ data, dataType, isExpired, isToShowNumber }) => {
  const dispatch = useDispatch();
  const [jobOrderNumber, setJobOrderNumber] = useState();
  const [state, setState] = useState(0);
  useEffect(() => {
    dispatch(getClientMembershipDetails(jobOrderNumber));
    dispatch(getClientMembershipHistoryAction(jobOrderNumber));
    dispatch(getClientCallsDetails(jobOrderNumber, "membership"));
    return () => {
      dispatch(getClientCallsDetails());
      dispatch(getClientMembershipDetails());
      dispatch(getClientMembershipHistoryAction());
    };
  }, [dispatch, jobOrderNumber, state]);

  const handleJob = (job) => {
    setJobOrderNumber(job);
    setState(state + 1);
  };

  const cardClass = isExpired
    ? "membership_card_data_display_expired"
    : dataType === "Warrenty"
    ? "membership_card_data_display_expiring"
    : dataType === "Platinum"
    ? "membership_card_data_display_expiring_platinum"
    : dataType === "Gold"
    ? "membership_card_data_display_expiring_gold"
    : "membership_card_data_display_expiring_silver";

  const cardClassBorder = isExpired
    ? "membership_card_data_display_expired_border"
    : dataType === "Warrenty"
    ? "membership_card_data_display_expiring_border"
    : dataType === "Platinum"
    ? "membership_card_data_display_expiring_border_platinum"
    : dataType === "Gold"
    ? "membership_card_data_display_expiring_border_gold"
    : "membership_card_data_display_expiring_border_silver";

  const jonTitleColor = isExpired
    ? "membership_card_data_jon_title_expiry"
    : dataType === "Warrenty"
    ? "membership_card_data_jon_title_warrenty"
    : dataType === "Platinum"
    ? "membership_card_data_jon_title_platinum"
    : dataType === "Gold"
    ? "membership_card_data_jon_title_gold"
    : "membership_card_data_jon_title_silver";

  const truncatedAddress =
    data?.address && data.address.length > 26
      ? data.address.slice(0, 26) + "..."
      : data?.address;

  return (
    <div
      className={`membership_card_data_expire ${cardClassBorder} `}
      onClick={() => {
        handleJob(data?.JobOrderNumber);
      }}
      style={{ cursor: "pointer" }}
    >
      <div className="membership_card_data_display">
        <div className="membership_card_data_jon membership_card_data_info">
          <p className={`membership_card_data_jon_title ${jonTitleColor}`}>
            Jon
          </p>
          <p className="JON">{data?.JobOrderNumber}</p>
        </div>
        <div className={`membership_card_data_info nameAddress`}>
          <p className={"expandCardName"} style={{ fontSize: "0.9rem" }}>
            {data?.name}
          </p>
          <p className="membership_card_data_address">{truncatedAddress}</p>
        </div>
      </div>
      {isToShowNumber && (
        <div className={`membership_card_data_display_hover ${cardClass}`}>
          <p>{data?.number}</p>
        </div>
      )}
    </div>
  );
};

export default MembershipSubCard;
