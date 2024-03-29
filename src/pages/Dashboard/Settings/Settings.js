import React from "react";
import TopBar from "../../../common/TopBar";
import ProfileBar from "../../../common/ProfileBar";
import { NavLink, Outlet } from "react-router-dom";
import { useWindowSize } from "@react-hook/window-size/throttled";

const Settings = () => {
  const [width] = useWindowSize();
  return (
    <>
      <ProfileBar />

      <div className="home_container">
        {width < 930 ? null : <TopBar main={`Settings`} />}

        <div className="page_content">
          <div className="settings_nav_tab">
            <NavLink
              end
              to="."
              className={({ isActive }) => (isActive ? "isActive" : undefined)}
            >
              <p>Api keys</p>
            </NavLink>
            <NavLink
              end
              to="./webhook"
              className={({ isActive }) => (isActive ? "isActive" : undefined)}
            >
              <p>Webhook</p>
            </NavLink>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Settings;
