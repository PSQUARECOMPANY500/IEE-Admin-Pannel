import React from "react";

const ReportIssue = () => {
  return (
    <div className="IssuesDoor">
      <div className="IssueDoors IssuesDoor2" style={{ paddingLeft: "1rem" }}>
        <div className="IssuesDoor2L">
          <div className="ClientImg">
            <img src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          </div>
          <div className="ClientName">
            <h5>
              <span>2024131</span>
            </h5>
            <h5
              style={{
                position: "absolute",
                top: "3%",
                right: "5%",
                fontWeight: "500",
              }}
            >
              <span>Michael Wilson</span>
            </h5>
            <h5>
              <span>+61-4-09234567</span>
            </h5>
            <h5>
              <span>S28,oak Avenue Melbourne, Vic 3000</span>
            </h5>
          </div>
        </div>
      </div>

      <div className="IssueDoors IssuesDoor3" style={{ paddingLeft: "1rem" }}>
        <div className="IssueDoor3L">
          <h5>Representative Name</h5>
          <h5 style={{ fontWeight: "600" }}>JOHN</h5>
        </div>
        <div className="IssueDoor3R">
          <h5>Representative Number</h5>
          <h5 style={{ fontWeight: "600" }}>+61-7-1234 5678</h5>
        </div>
      </div>

      <div className="IssueDoors IssuesDoor4" style={{ paddingLeft: "rem" }}>
        <h5>
          <span>
            The door is experiencing difficulty in closing properly. It seems to
            get stuck halfway.
          </span>
        </h5>
      </div>

      <div className="IssueDoors IssuesDoor1">
        <h5 style={{ fontSize: "0.8rem" }}>
          check the door motor first, apply some lubricant and restart the
          elevator.{" "}
        </h5>
        <div className="RedIsue">
          <h5>
            Issue: <span>Door</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
