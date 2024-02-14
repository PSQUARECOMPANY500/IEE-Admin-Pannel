import React, { useEffect, useLayoutEffect } from "react";

import MembershipSubCard from "./MembershipSubCard";
import { useDispatch, useSelector } from "react-redux";
import { requestLimitedClientDataAction } from "../../../../ReduxSetup/Actions/AdminActions";
const MembershipExpiring = ({ DemoData, setClick }) => {
  const type = DemoData?.dataType?.toLowerCase();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    requestLimitedClientDataAction(dispatch, type, "expiring", 1, 10);
  }, []);
  const memberShipDetails = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.requestLimitedClientDataReducer
    ) {
      return state?.AdminRootReducer?.requestLimitedClientDataReducer
        ?.membershipDetail?.expiring?.[type];
    } else {
      return null;
    }
  });

  const scrollbar =
    DemoData.dataType === "Warrenty"
      ? "membership_card_scrollable_warrenty"
      : DemoData.dataType === "Platinum"
      ? "membership_card_scrollable_platinum"
      : DemoData.dataType === "Gold"
      ? "membership_card_scrollable_gold"
      : DemoData.dataType === "Silver"
      ? "membership_card_scrollable_silver"
      : "total_revenue_outer_border";

  return (
    <div className="membership_card_expiring">
      <div className="membership_card_expiring-title">
        <p>Expiring Soon</p>
        {memberShipDetails && <p>{memberShipDetails.count}</p>}
      </div>
      <div
        className={`membership_card_scrollable ${scrollbar} ${
          setClick ? "membership_card_stats_expand_height" : ""
        }`}
      >
        {memberShipDetails?.clientData.map((data, index) => {
          return data && !data.isExpired ? (
            <MembershipSubCard
              data={data}
              key={index}
              dataType={DemoData?.dataType}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default MembershipExpiring;
