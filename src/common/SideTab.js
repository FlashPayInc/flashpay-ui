import React from "react";
import { NavLink } from "react-router-dom";
import { NavIcons } from "../svg";
import HorLine from "./HorLine";

const SideTab = () => {
  return (
    <div className="sidetab_container">
      <div className="app_logo">
        <img src="./img/svg/logo.svg" alt="" />
      </div>

      <button className="connect_wallet">
        <img src="img/icons/add_wallet.svg" alt="" />
        <p>Connect wallet</p>
      </button>

      <div className="nav_link_theme">
        <div className="nav_links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "isActive" : undefined)}
          >
            <NavIcons type="home" />
            <p>Home</p>
          </NavLink>

          <NavLink
            to="/setup"
            className={({ isActive }) => (isActive ? "isActive" : undefined)}
          >
            <NavIcons type="setup" />
            <p>Set up</p>
          </NavLink>

          <HorLine pad={44} />

          <NavLink
            to="/transactions"
            className={({ isActive }) => (isActive ? "isActive" : undefined)}
          >
            <NavIcons type="transactions" />
            <p>Transactions</p>
          </NavLink>

          <NavLink
            to="/payment-portal"
            className={({ isActive }) => (isActive ? "isActive" : undefined)}
          >
            <NavIcons type="paymentlinks" />
            <p>Payment links</p>
          </NavLink>

          <HorLine pad={44} />

          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "isActive" : undefined)}
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
  );
};

export default SideTab;
