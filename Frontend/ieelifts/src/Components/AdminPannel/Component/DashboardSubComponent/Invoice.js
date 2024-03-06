import React from "react";
import { GrGallery } from "react-icons/gr";

const Invoice = () => {
  return (
    <div className="Invoice">
      <h5>Spare Parts Changed</h5>
      <div className="InvoiceTable">
        <div className="InvoiceTableRow">
          <h5>
            1.Type <span>Main Machine</span>
          </h5>
          <h5>
            Part Break <span>Coil</span>
          </h5>
        </div>
        <div className="InvoiceTableRow">
          <h5>
            1.Type <span>Main Machine</span>
          </h5>
          <h5>
            Part Break <span>Coil</span>
          </h5>
        </div>

        <div className="InvoiceTableRow">
          <h5>
            1.Type <span>Main Machine</span>
          </h5>
          <h5>
            Part Break <span>Coil</span>
          </h5>
        </div>

        <div className="InvoiceTableRow">
          <h5>
            1.Type <span>Main Machine</span>
          </h5>
          <h5>
            Part Break <span>Coil</span>
          </h5>
        </div>
      </div>
      <div className="InvoiceFooter">
        <div className="InvoiceFooterL">
          <div className="InvoiceFooterRow">
            <h5>Payment Mode</h5>
            <h5>Cash </h5>
          </div>
          <div className="InvoiceFooterRow">
            <h5> Total Payment: </h5>
            <h5> Rs. 12000/-</h5>
          </div>
        </div>
        <div className="InvoiceFooterR">
          <GrGallery />
        </div>
      </div>
    </div>
  );
};

export default Invoice;
