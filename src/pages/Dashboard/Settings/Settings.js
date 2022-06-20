import React from "react";
import TopBar from "../../../common/TopBar";
import ProfileBar from "../../../common/ProfileBar";
import EmptyStateContainer from "../../../common/EmptyStateContainer";
import { NavLink, Outlet } from "react-router-dom";

const Settings = () => {
  return (
    <>
      <ProfileBar />

      <div className="home_container">
        <TopBar main={`Settings`} />

        <div className="page_content">
          <div className="settings_nav_tab">
            <NavLink
              end
              to="."
              className={({ isActive }) => (isActive ? "isActive" : undefined)}
            >
              <p>Profile</p>
            </NavLink>
            <NavLink
              to="./api"
              className={({ isActive }) => (isActive ? "isActive" : undefined)}
            >
              <p>Webhooks & Api's</p>
            </NavLink>
            <NavLink
              to="./preferences"
              className={({ isActive }) => (isActive ? "isActive" : undefined)}
            >
              <p>Preferences</p>
            </NavLink>
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Settings;
