import { IMAGES } from "../../public/images/Index";
import Image from "next/image";
import React from "react";

const FullPackageContract = ({ data }) => {
  return `<div>
      <div className="d-flex justify-content-center w-100">
        <img src=${IMAGES.LOGO} height={150} />
      </div>
      <div className="w-100 text-center d-flex justify-content-center mt-3">
        <h2 className="w-50 fw-bold">
          SoCal Financial Services & HOA Property Management
        </h2>
      </div>
      <h2 className="text-center mt-5 fw-bold text-primary">${data?.propertyName}</h2>
      <img
        src=${IMAGES.PLACE}
        className="my-5 w-100"
        style={{ height: "400px", objectFit: "cover" }}
      />
      <div className="d-flex justify-content-center w-100">
        <img src=${IMAGES.LOGO} height={150} />
      </div>
      <div className="w-100 text-center d-flex justify-content-center mt-3">
        <h2 className="w-50 fw-bold">
          MANAGEMENT AGREEMENT TO
          <br />
          ${data?.propertyName} HOA
        </h2>
      </div>
      <h4 className="text-center mt-5">
        Phone: 818-900-4041
        <br />
        Email: arthur@socaltaxpay.com
        <br />
        Web: www.socaltaxpay.com
      </h4>
      <div className="d-flex justify-content-center">
        <h5 className="mt-5 w-75">
          This agreement, shall commence on the first day of __________ 2024, by
          and between the ${data?.propertyName}. (the Condominiums), not individually but on
          behalf of all of the owners from time to time of the Condominiums in
          the Condominiums and SoCal Financial Services & HOA Property
          Management.
          <br />
          <br />
          SoCal agrees to manage (the Condominiums) on a one (1) year agreement.
          The management fee is payable at the first of each and every month.
          The total management fee is $350 per month for the next twelve (12)
          months. The agreement can be cancelled by either party with a 30 day
          written notice.
          <br />
          <br />
          SoCal shell perform the following services in the name of and on
          behalf of the Condominiums:
          <br />
          <br />
          COLLECTIONS
          <br />
          Provide monthly statements and collect all maintenance fees,
          assessments, and other charges due and deposit moneys in the
          appropriate checking, savings, and/or reserve accounts. With prior
          approval of the Board, SoCal will carry out the approved collection
          policy in accordance with Civ. Code 1367. SoCal will report the
          results of suc h collection action to the Board. If legal action is
          taken by the Board, SoCal will supply all records and all
          correspondence to the appointed attorney.
          <br />
          <br />
          STANDARDS of MAINTENANCE <br />
          Subject to the direction and at the expense of the Condominiums, SoCal
          shall cause the common landscaped areas, walkways, and driveways of
          the Condominiums to be maintained according to appropriate standards
          of maintenance consistent with the character and location of the
          Condominiums including cleaning, painting, decorating, and other
          annual maintenance. SoCal will collect the appropriate number of bids
          (normally three) and inspect as necessary all work.
          <br />
          <br />
          DIRECTIONS of the BOARD
          <br /> SoCal shall carry out all directions of the Board relating to
          the normal operation of the Condominiums. Out of city travel time and
          expenses, telephone charges, and stationary expense may be charged to
          the Condominiums. Any such expense must have the prior approval of the
          Board.
          <br />
          <br />
          PROPERTY INSPECTIONS
          <br /> Board shall inspect the Condominiums as needed or if necessary
          daily, to maintain the appropriate appearance.
          <br />
          <br />
          PAYMENTS of INVOICES
          <br /> SoCal shall prepare for payment all charges or obligations
          incurred by the Condominiums with respect to the maintenance and/or
          operation of the Condominiums.
          <br />
          <br />
          ASSOCIATION MEETINGS
          <br /> SoCal shall, upon no less than 72 hours' notice, attend
          meetings of the Board on an annual basis.
          <br />
          <br /> FINANCIAL STATEMENTS
          <br /> SoCal shall maintain records showing all Reports and
          expenditures relating to the Condominiums and shall submit to the
          Board financial statements for the preceding month on or before the
          fifteenth day of the following month. Balance Sheet Income Statement
          State and Federal Taxes Upon request of the Condominiums, SoCal will
          provide the approved certified public accountant with the necessary
          information for the preparation of tax returns and year-end financial
          reports. In accordance with Civ. Code 1365 (b).
          <br />
          <br />
          BUDGET PROPOSAL
          <br /> SoCal shall review and submit to the Board, on or before the
          end of the fiscal year, a recommended budget for the next succeeding
          year showing projected receipts and expenditures for such year.
          EXPENDITURES SoCal shall not make any expenditure nor incur any
          non-recurring contractual obligation exceeding $ 500.00 without the
          prior consent and approval of the Board.
          <br />
          <br /> BANKING
          <br /> All bank accounts opened by SoCal on behalf of the Condominiums
          will be in the name of the HOA only.
          <br />
          <br /> AUTHORIZED CONTACT
          <br /> The Board shall designate in writing a single individual who
          shall be authorized to approve expenditures and approve actions of
          SoCal on any matter relating to the management of the Condominiums.
          SoCal is directed not to accept directions or instructions with regard
          to the management of the Condominiums from anyone else unless written
          authorization is received from the Board. The Board may appoint a
          person to approve action or work regarding particular areas of
          management and financial reporting. In the absence of any other
          designation by the Board, the President of the Board shall have this
          authority.
          <br />
          <br />
          Date: __________________________
          <br />
          <br />
          Signatures: __________________________
          <br />
          <br />
          Board of Directors, ${data?.propertyName} HOA.:
          __________________________
          <br />
          <br />
          SoCal Financial Services & HOA Property Management Arthur
          Stamboltsyan, Manager: <br />
          __________________________
          <br />
          <br />
        </h5>
      </div>
    </div>`;
};

export default FullPackageContract;
