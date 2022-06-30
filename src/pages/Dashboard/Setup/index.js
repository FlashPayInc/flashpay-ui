import React, { useState } from "react";
import TopBar from "../../../common/TopBar";
import ProfileBar from "../../../common/ProfileBar";
import { Assets } from "../../../svg";
import { useDispatch, useSelector } from "react-redux";
import {
  LinkWalletAsync,
  connectWallet,
} from "../../../features/modals/modalSlice";

const Setup = () => {
  const dispatch = useDispatch();
  const { walletAddress, linkedStatus } = useSelector((state) => state.config);

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
            <div className="warning_component">
              <i className="ph-warning-circle-fill warn_icon"></i>
              <p>
                By signing this contract, you agree that you are the owner of
                the wallet you have connected.
              </p>
            </div>

            <button
              className="continue_button"
              onClick={() => {
                if (!!walletAddress) {
                  dispatch(LinkWalletAsync());
                } else {
                  dispatch(connectWallet());
                }
              }}
            >
              Link wallet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setup;
