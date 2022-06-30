import React from "react";
import { Outlet } from "react-router-dom";
import { AppIcons, Illustrations } from "../../svg";

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
        <Outlet />
        <div className="powered_by_block">
          <p>Powered by</p>
          <AppIcons type="flashpay-main" />
        </div>
      </div>
    </div>
  );
};

export default Portal;
