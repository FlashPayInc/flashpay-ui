import React from "react";
import { Route, Routes } from "react-router-dom";

import AppModals from "../modals/MainModals";
import PortalModals from "../modals/PortalModals";

import Home from "./Dashboard/Home";
import Setup from "./Dashboard/Setup";
import SideTab from "../common/SideTab";
import Transactions from "./Dashboard/Transactions";

import PaymentLinks from "./Dashboard/Payment";
import Details from "./Dashboard/Payment/Details";

import Settings from "./Dashboard/Settings/Settings";
import ApiSettings from "./Dashboard/Settings/ApiSettings";
import Preferences from "./Dashboard/Settings/Preferences";
import ProfileSettings from "./Dashboard/Settings/ProfileSettings";

import PaymentPortal from "./Portal";
import PaymentConnect from "./Portal/addwallet";
import PaymentDescription from "./Portal/description";

const DashboardRoutes = () => {
  return (
    <>
      <AppModals />

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

          <Route path="/payment-links" element={<PaymentLinks />} />
          <Route path="/payment-links/details" element={<Details />} />

          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </div>
    </>
  );
};

const index = () => {
  return (
    <>
      <div className="main_app_container">
        <Routes>
          <Route
            path="/payment-portal/:id"
            element={
              <>
                <PortalModals />
                <PaymentPortal />
              </>
            }
          >
            <Route path="connect" element={<PaymentConnect />} />
            <Route path="" element={<PaymentDescription />} />
          </Route>

          <Route
            path="/payment-portal/"
            element={
              <>
                <PortalModals />
                <PaymentPortal />
              </>
            }
          >
            <Route path="connect" element={<PaymentConnect />} />
            <Route path="" element={<PaymentDescription />} />
          </Route>

          <Route path="*" element={<DashboardRoutes />} />
        </Routes>
      </div>
    </>
  );
};

export default index;
