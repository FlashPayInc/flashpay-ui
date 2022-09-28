import React from "react";
import { AppIcons, Illustrations } from "../../svg";
import Description from "./description";

const Portal = () => {
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
          <Illustrations type="portalbg" />
        </div>
      </div>

      <div className="section_block main_container">
        <Description />
      </div>
    </div>
  );
};

export default Portal;
