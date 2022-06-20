import React, { useState } from "react";
import TopBar from "../../common/TopBar";
import ProfileBar from "../../common/ProfileBar";
import { Assets } from "../../svg";

const Setup = () => {
  const [amount, setAmt] = useState(0);

  return (
    <>
      <ProfileBar />

      <div className="home_container">
        <TopBar
          main={`Let's get you set up`}
          sub={` We need you to verify that you are the actual owner of the wallet
            you have connected.`}
        />

        <div className="page_content">
          <div className="setup_content">
            <div className="setup_input">
              <div className="assets">
                <div className="icon_name">
                  <Assets asset="usdt" />
                  <p>Usdt</p>
                </div>

                <i className="ph-caret-down-bold dropdown_icon"></i>
              </div>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmt(e.target.value)}
                className="amount_input"
              />
            </div>

            <div className="warning_component">
              <i className="ph-warning-circle-fill warn_icon"></i>
              <p>
                By signing this contract, you agree that you are the owner of
                the wallet you have connected.
              </p>
            </div>

            <button className="continue_button">Sign transaction</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setup;
