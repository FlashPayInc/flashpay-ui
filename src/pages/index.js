import React from "react";
import { useEffect } from "react";
import { peraWallet } from "../utils";
import AppModals from "../modals/MainModals";
import { Route, Routes } from "react-router-dom";
import PortalModals from "../modals/PortalModals";
import { FetchAssets } from "../features/requests";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, setWallet } from "../features/config/configSlice";

import PaymentPortal from "./Portal";
import Home from "./Dashboard/Home";
import Setup from "./Dashboard/Setup";
import SideTab from "../common/SideTab";
import PaymentLinks from "./Dashboard/Payment";
import Details from "./Dashboard/Payment/Details";
import Webhook from "./Dashboard/Settings/Webhook";
import Transactions from "./Dashboard/Transactions";
import Settings from "./Dashboard/Settings/Settings";
import ApiSettings from "./Dashboard/Settings/ApiSettings";

const DashboardRoutes = () => {
  const dispatch = useDispatch();
  const { walletProvider } = useSelector(state => state.config);

  useEffect(() => {
    if (walletProvider !== "pera") return;
    // Reconnect to the session when the component is mounted
    peraWallet
      .reconnectSession()
      .then(accounts => {
        peraWallet.connector.on("disconnect", () => {
          peraWallet.disconnect();
          localStorage.clear();
          window.location.reload();
        });

        if (accounts.length) {
          setWallet({
            walletAddress: accounts[0],
            walletProvider: "pera",
          });
        }
      })
      .catch(e => console.log(e.message));
  }, []);

  useEffect(() => {
    dispatch(FetchAssets());

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      dispatch(setTheme("dark"));
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      dispatch(setTheme("light"));
      document.documentElement.setAttribute("data-theme", "light");
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", function (e) {
        const colorScheme = e.matches ? "dark" : "light";

        if (!!localStorage.theme) return;

        if (colorScheme === "dark") {
          dispatch(setTheme("dark"));
          document.documentElement.setAttribute("data-theme", "dark");
        } else {
          dispatch(setTheme("light"));
          document.documentElement.setAttribute("data-theme", "light");
        }
      });
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
            <Route path="" element={<ApiSettings />} />
            <Route path="webhook" element={<Webhook />} />
          </Route>
          <Route path="/payment-links" element={<PaymentLinks />} />
          <Route path="/payment-links/:slug" element={<Details />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </div>
    </>
  );
};

const TxnPortal = () => {
  return (
    <>
      <PortalModals />
      <PaymentPortal />
    </>
  );
};

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
