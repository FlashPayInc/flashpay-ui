import Lottie from "react-lottie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import animationData from "../../lotties/Loading.json";
import animationDataError from "../../lotties/Error.json";
import animationDataSuccess from "../../lotties/Success.json";
import {
  closeModal,
  connectWallet,
  LinkWalletAsync,
} from "../../features/modals/modalSlice";

const SetupAcctModal = ({ data }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { walletAddress } = useSelector((state) => state.config);

  const defaultOptions = {
    loop: data?.status === "loading",
    autoplay: true,
    animationData:
      data?.status === "loading"
        ? animationData
        : data?.status === "success"
        ? animationDataSuccess
        : animationDataError,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="modal_container">
      <div className="modal_content">
        <div className="modal_illustration">
          <Lottie options={defaultOptions} speed={0.7} />
        </div>
        <div className="modal_description">
          <p className="main">
            {data?.status === "loading"
              ? "Setting up your wallet"
              : `${
                  !!data?.message
                    ? data?.message
                    : "An error occurred  setting up your wallet"
                }`}
          </p>
        </div>

        {data?.status !== "loading" ? (
          <div className="action_buttons">
            <button
              className="cancel_button"
              onClick={() => dispatch(closeModal())}
            >
              Back
            </button>

            {data?.status !== "success" ? (
              <button
                className="continue_button"
                onClick={() => {
                  dispatch(LinkWalletAsync({ addr: walletAddress }));
                }}
              >
                Retry
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SetupAcctModal;
