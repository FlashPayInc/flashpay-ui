import { NavLink } from "react-router-dom";
import { AppIcons } from "../../svg";

import Lottie from "react-lottie";
import animationData from "../../lotties/Broken-Link.json";

const Description = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="description_container">
      {true ? (
        <>
          <div className="logo_img">
            <AppIcons type="flashpay" />
          </div>
          <div className="description_text">
            <p className="main">Sothfried chicken</p>
            <p className="sub">
              This is where you see the description if there is one.
            </p>
          </div>

          <NavLink to="./connect" className="continue_to_pay">
            Pay 2.2749 USDT
          </NavLink>
        </>
      ) : (
        <>
          <div className="payment_illustration">
            <Lottie options={defaultOptions} speed={0.7} />
          </div>

          <div className="description_text">
            <p className="main">Expired Link</p>
            <p className="sub">Payment link has expired</p>
          </div>

          <NavLink to="/" className="continue_to_pay">
            Go to Flashpay’s homepage
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Description;
