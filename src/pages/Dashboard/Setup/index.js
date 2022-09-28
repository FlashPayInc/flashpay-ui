import React, { useEffect } from "react";
import TopBar from "../../../common/TopBar";
import { useNavigate } from "react-router-dom";
import ProfileBar from "../../../common/ProfileBar";
import { useDispatch, useSelector } from "react-redux";
import { LinkWalletAsync } from "../../../features/requests";
import { connectWallet } from "../../../features/modals/modalSlice";

const Setup = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { walletAddress, linkedStatus } = useSelector(state => state.config);

  useEffect(() => {
    if (!!linkedStatus) {
      navigate("/", { replace: true });
    }
  }, [linkedStatus]);

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
                  dispatch(LinkWalletAsync({ addr: walletAddress }));
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
