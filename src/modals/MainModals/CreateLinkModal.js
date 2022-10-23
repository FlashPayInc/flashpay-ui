import Lottie from "react-lottie";
import { useDispatch } from "react-redux";
import animationData from "../../lotties/Loading.json";
import animationDataError from "../../lotties/Error.json";
import animationDataSuccess from "../../lotties/Success.json";
import { closeModal } from "../../features/modals/modalSlice";

const CreateLinkModal = ({ data }) => {
  const dispatch = useDispatch();

  const defaultOptions = {
    loop: data?.loading,
    autoplay: true,
    animationData: data?.loading
      ? animationData
      : data?.error
      ? animationDataError
      : animationDataSuccess,
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
            {data?.loading
              ? "Generating payment link"
              : data?.error
              ? "An error occurred creating payment link"
              : "Payment link successfully created"}
          </p>
        </div>

        {!data?.loading ? (
          <div className="action_buttons">
            <button
              className="cancel_button"
              onClick={() => {
                dispatch(closeModal());
              }}
            >
              Close
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CreateLinkModal;
