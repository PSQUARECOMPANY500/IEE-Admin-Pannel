// <-----------------------------  Author:- Armaan Singh ----------------------------------->

import React from "react";

const MembershipSubCard = ({ data, dataType }) => {
  const cardClass = data.isExpired
    ? "membership_card_data_display_expired"
    : dataType === "Warrenty"
    ? "membership_card_data_display_expiring"
    : dataType === "Platinum"
    ? "membership_card_data_display_expiring_platinum"
    : dataType === "Gold"
    ? "membership_card_data_display_expiring_gold"
    : "membership_card_data_display_expiring_silver";

  const cardClassBorder = data.isExpired
    ? "membership_card_data_display_expired_border"
    : dataType === "Warrenty"
    ? "membership_card_data_display_expiring_border"
    : dataType === "Platinum"
    ? "membership_card_data_display_expiring_border_platinum"
    : dataType === "Gold"
    ? "membership_card_data_display_expiring_border_gold"
    : "membership_card_data_display_expiring_border_silver";

  const jonTitleColor = data.isExpired
    ? "membership_card_data_jon_title_expiry"
    : dataType === "Warrenty"
    ? "membership_card_data_jon_title_warrenty"
    : dataType === "Platinum"
    ? "membership_card_data_jon_title_platinum"
    : dataType === "Gold"
    ? "membership_card_data_jon_title_gold"
    : "membership_card_data_jon_title_silver";

  return (
    <div className={`membership_card_data_expire ${cardClassBorder} `}>
      <div className="membership_card_data_display">
        <div className="membership_card_data_jon membership_card_data_info">
          <p className={`membership_card_data_jon_title ${jonTitleColor}`}>
            Jon
          </p>
          <p>{data.jon}</p>
        </div>
        <div className="membership_card_data_info">
          <p>{data.name}</p>
          <p className="membership_card_data_address">{data.address}</p>
        </div>
      </div>
      <a  href={`tel:${data.number}`}>
        <div className={`membership_card_data_display_hover ${cardClass}`}>
          <p>{data.number}</p>
        </div>
      </a>
    </div>
  );
};

export default MembershipSubCard;
