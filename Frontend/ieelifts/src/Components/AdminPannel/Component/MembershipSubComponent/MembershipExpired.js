import React, { useEffect, useLayoutEffect } from "react";

import MembershipSubCard from "./MembershipSubCard";
import { useDispatch, useSelector } from "react-redux";
import { requestLimitedClientDataAction } from "../../../../ReduxSetup/Actions/AdminActions";

const MembershipExpired = ({ setClick, DemoData }) => {
  const type = DemoData?.dataType?.toLowerCase();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    requestLimitedClientDataAction(dispatch, type, "expired", 1, 10);
  }, []);
  const memberShipDetails = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.requestLimitedClientDataReducer
    ) {
      return state?.AdminRootReducer?.requestLimitedClientDataReducer
        ?.membershipDetail?.expired?.[type];
    } else {
      return null;
    }
  });

  return (
    <div className="membership_card_expiring ">
      <div className="membership_card_expiring-title membership_card_expired-title">
        <p>Expired</p>
        {memberShipDetails ? <p>{memberShipDetails?.count}</p> : null}
      </div>
      <div
        className={`membership_card_scrollable membership_card_scrollable_expired ${
          setClick ? "membership_card_stats_expand_height" : ""
        }`}
      >
        {memberShipDetails?.clientData.map((data, index) => {
          return data && !data.isExpired ? (
            <MembershipSubCard
              data={data}
              isExpired={true}
              key={index}
              dataType={DemoData?.dataType}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default MembershipExpired;
