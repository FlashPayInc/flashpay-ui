import React from "react";
import { AppIcons } from "../../../svg";

const Preferences = () => {
  return (
    <div className="preferences">
      <div className="category">
        <div className="class">Notifications</div>
        <div className="options">
          <div className="option">
            <div className="check_option">
              <AppIcons type="tickcircle" />
            </div>

            <div className="option_inner">
              <p className="title">Invoices and Transactions</p>
              <p className="value">
                Emails abut your transactions and receipts
              </p>
            </div>
          </div>

          <div className="option">
            <div className="check_option">
              <AppIcons type="unchecked" />
            </div>

            <div className="option_inner">
              <p className="title">News and updates</p>
              <p className="value">News about product features and updates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
