import Lottie from "react-lottie";
import animationData from "../../lotties/Loading.json";

const Processing = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <div className="modal_content">
        <div className="modal_illustration">
          <Lottie options={defaultOptions} speed={0.7} />
        </div>
        <div className="modal_description">
          <p className="main">Transaction processing</p>
          <p className="sub">
            Your transaction is processing. We will notify when it has been
            completed.
          </p>
        </div>

        <div className="action_buttons">
          <button className="continue_button">Okay!</button>
        </div>
      </div>
    </>
  );
};

export default Processing;
