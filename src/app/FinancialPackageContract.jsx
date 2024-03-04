import { IMAGES } from "../../public/images/Index";
import Image from "next/image";
import React from "react";

const FinancialPackageContract = ({ data }) => {
  return `<div>
      <div className="d-flex justify-content-center w-100">
        <Image src={IMAGES.LOGO} height={150} />
      </div>
      <div className="w-100 text-center d-flex justify-content-center mt-3">
        <h2 className="w-50 fw-bold">
          SoCal Financial Services & HOA Property Management
        </h2>
      </div>
      <h2 className="text-center mt-5 fw-bold text-primary">
        ${data?.propertyName}
      </h2>
      <Image
        src={IMAGES.PLACE}
        className="mt-5 w-100"
        style={{ height: "400px", objectFit: "cover" }}
      />
      <h2 className="text-center mt-5 fw-bold">
        SoCal Financial Services & HOA Property Management
        <br />
        <br />
        Phone: 818-900-4041
        <br />
        Email: arthur@socaltaxpay.com
        <br />
        Web: www.socaltaxpay.com
      </h2>
      <h5>
        SoCal Financial Services & HOA Property Management
        <br /> Phone: 818-900-4041
        <br /> Email: arthur@socaltaxpay.com
        <br /> Web: www.socaltaxpay.com
        <br />
        <br /> ${data?.propertyName}
        <br />
        <br /> Dear ${data?.propertyName}, <br />
        Thank you for selecting SoCal Financial Services. to assist you in
        providing, Accounting, Bookkeeping services. This letter confirms the
        terms of our engagement and the nature, timing, and limitations of the
        services we will provide.
        <br /> Beginning November 1, 2023, we will provide monthly bookkeeping,
        accounting, and preparation of financial statements, for your property.
        <br />
        1. The Client agrees to pay monthly fee of $500 for bookkeeping,
        accounting and preparation of financial statements services
        <br /> 2. Business management services will include bimonthly accounts
        payable and accounts receivable processing.
        <br /> We will prepare and issue checks or arrange for electronic
        payment for all the invoices and bills that are approved for payment by
        the management of The Client. Accounting Services will include monthly
        reconciliation of bank account and preparation of monthly Profit & Loss
        and Balance Sheet statements.
        <br /> This is a One year contract starting from November 1st, You can
        cancel this agreement by proving 30 day notice before one year ends
        (date of contract November 1st 2024) Any additional services that are
        not included in this engagement letter shall be agreed as a separate
        engagement or will be computed at our standard rates and will be billed
        as the work progresses. Our standard hourly rates for professional
        services are as follows: <br />
        <br />
        Staff Accountants $120/hour <br />
        At coast Postage and delivery
        <br /> $55 per Filing 1099 &1096
        <br /> No coast check processing and emailing statements <br />
        <br />
        If the foregoing is acceptable to you, please sign the original copy of
        this letter in the space provided and return it to us.
        <br />
        <br />
        <div className="d-flex justify-content-between">
          <div>${data?.propertyName}</div>
          <div>SoCal Financial Services</div>
        </div>
      </h5>
    </div>`;
};

export default FinancialPackageContract;
