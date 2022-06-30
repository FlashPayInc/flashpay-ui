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
        </div>
      </div>
    </>
  );
};

export default Processing;
