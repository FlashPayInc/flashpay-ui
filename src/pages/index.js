import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppModals from "../modals/MainModals";
import { Route, Routes } from "react-router-dom";
import PortalModals from "../modals/PortalModals";
import { FetchAssets } from "../features/requests";

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

const DashboardRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchAssets());
  }, []);

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
            {/* <Route path="preferences" element={<Preferences />} /> */}
          </Route>

          <Route path="/payment-links" element={<PaymentLinks />} />
          <Route path="/payment-links/:slug" element={<Details />} />

          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </div>
    </>
  );
};

const TxnPortal = () => (
  <>
    <PortalModals />
    <PaymentPortal />
  </>
);

const MainApp = () => {
  return (
    <>
      <div className="main_app_container">
        <Routes>
          <Route path={"/payment-portal/:id"} element={<TxnPortal />} />
          <Route path={"/payment-portal/"} element={<TxnPortal />} />

          <Route path="*" element={<DashboardRoutes />} />
        </Routes>
      </div>
    </>
  );
};

export default MainApp;
