import React from "react";
import { Route, Routes } from "react-router-dom";
import SideTab from "../../common/SideTab";

import Home from "./Home";
import Setup from "./Setup";
import Transactions from "./Transactions";
import PaymentLinks from "./PaymentLinks";

import Settings from "./Settings/Settings";
import ApiSettings from "./Settings/ApiSettings";
import Preferences from "./Settings/Preferences";
import ProfileSettings from "./Settings/ProfileSettings";

const index = () => {
  return (
    <>
      <div className="main_app_container">
        <SideTab />
        <div className="main_container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/settings" element={<Settings />}>
              <Route path="" element={<ProfileSettings />} />
              <Route path="api" element={<ApiSettings />} />
              <Route path="preferences" element={<Preferences />} />
            </Route>
            <Route path="/payment-portal" element={<PaymentLinks />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default index;
