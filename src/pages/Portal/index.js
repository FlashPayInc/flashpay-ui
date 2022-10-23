import React, { useEffect } from "react";
import { AppIcons } from "../../svg";
import Vectors from "../../svg/Vectors";
import { peraWalletPortal } from "../../utils";
import Description from "./description";

const Portal = () => {
  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWalletPortal.disconnect();
    return () => peraWalletPortal.disconnect();
  }, []);

  return (
    <div className="payment_portal_container">
      <div className="section_block side_decor">
        <div className="logo_white">
          <AppIcons type="flashpay-white" />
        </div>
        <div className="side_decor_text">
          Payment <br />
          portal
        </div>

        <div className="bg_decor">
          <Vectors.portalbg />
        </div>
      </div>

      <div className="section_block main_container">
        <Description />
      </div>
    </div>
  );
};

export default Portal;
