import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { closeSideTab } from "../features/config/configSlice";
import { connectWallet } from "../features/modals/modalSlice";
import { AppIcons, NavIcons } from "../svg";
import { constrictAddr } from "../utils";
import HorLine from "./HorLine";

const SideTab = () => {
  const dispatch = useDispatch();
  const { walletAddress, linkedStatus, openSidetab } = useSelector(
    (state) => state.config
  );

  const ConnectWallet = () => {
    dispatch(connectWallet());
  };

  const CloseTab = () => {
    dispatch(closeSideTab());
  };

  return (
    <>
      <div className="sidetab_overlay" data-open-tab={openSidetab}>
        <div className="sidetab_container">
          <a
            target="blank"
            href="https://flashpay.finance/"
            className="app_logo"
          >
            <AppIcons type="flashpay-main" />
          </a>

          {!!walletAddress ? (
            <button className="connect_wallet" onClick={CloseTab}>
              <p>{constrictAddr(walletAddress)}</p>
            </button>
          ) : (
            <button
              className="connect_wallet"
              onClick={() => {
                ConnectWallet();
                CloseTab();
              }}
            >
              <img src="img/icons/add_wallet.svg" alt="" />
              <p>Connect wallet</p>
            </button>
          )}

          <div className="nav_link_theme">
            <div className="nav_links">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "isActive" : undefined
                }
                onClick={CloseTab}
              >
                <NavIcons type="home" />
                <p>Home</p>
              </NavLink>

              {!linkedStatus ? (
                <NavLink
                  to="/setup"
                  className={({ isActive }) => {
                    return isActive ? "isActive" : undefined;
                  }}
                  onClick={CloseTab}
                >
                  <NavIcons type="setup" />
                  <p>Set up</p>
                </NavLink>
              ) : null}

              <HorLine pad={44} />

              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  isActive ? "isActive" : undefined
                }
                onClick={CloseTab}
              >
                <NavIcons type="transactions" />
                <p>Transactions</p>
              </NavLink>

              <NavLink
                to="/payment-links"
                className={({ isActive }) =>
                  isActive ? "isActive" : undefined
                }
                onClick={CloseTab}
              >
                <NavIcons type="paymentlinks" />
                <p>Payment links</p>
              </NavLink>

              <HorLine pad={44} />

              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive ? "isActive" : undefined
                }
                onClick={CloseTab}
              >
                <NavIcons type="settings" />
                <p>Settings</p>
              </NavLink>
            </div>

            <div className="theme_block">
              <HorLine pad={44} />
              <div className="theme_config">
                <p>Dark mode</p>
                <NavIcons type="theme" />
              </div>
            </div>
          </div>
        </div>

        <div className="overlay" onClick={CloseTab} />
      </div>
    </>
  );
};

export default SideTab;
