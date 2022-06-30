import { useState } from "react";
import { AppIcons } from "../../../svg";

const Preferences = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="preferences">
      <div className="category">
        <div className="class">Notifications</div>
        <div className="options">
          {[
            {
              title: "Invoices and Transactions",
              value: "Emails abut your transactions and receipts",
            },
            {
              title: "News and updates",
              value: "News about product features and updates",
            },
          ].map((item, index) => {
            return (
              <div className="option">
                <div
                  className="check_option"
                  onClick={() => setSelected(index)}
                >
                  <AppIcons
                    type={index === selected ? "tickcircle" : "unchecked"}
                  />
                </div>

                <div className="option_inner">
                  <p className="title">{item?.title}</p>
                  <p className="value">{item?.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Preferences;
