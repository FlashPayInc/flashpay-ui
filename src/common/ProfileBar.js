import React, { useEffect } from "react";
import Icon from "../svg/Icon";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { openSideTab } from "../features/config/configSlice";
import { useWindowSize } from "@react-hook/window-size/throttled";
import Notifications from "./Dropdown/notifications";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { ChangeNetwork, GetNetwork } from "../features/requests";

const ProfileBar = () => {
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  const { pathname } = useLocation();
  const { network } = useSelector(state => state.app);
  const { linkedStatus } = useSelector(state => state.config);

  const match = pathname.match(/^\/\w+/i);
  const currentPath = match
    ? match[0].slice(1)
    : pathname === "/"
    ? "Dashboard"
    : "";

  const OpenTab = () => dispatch(openSideTab());

  return (
    <nav>
      {width < 930 ? (
        <div className="nav-btn" onClick={OpenTab}>
          <Icon.NavBtn />

          {currentPath === "payment" ? (
            <p>Payment links</p>
          ) : (
            <p className="capitalize">{currentPath}</p>
          )}
        </div>
      ) : (
        <div />
      )}

      <div className="action-btns">
        {network ? (
          <div className="network-switch">
            <Menu
              offsetY={2}
              menuButton={
                <button className="network-switch-btn">
                  <p>{network}</p>
                  <span>
                    <Icon.caretdown />
                  </span>
                </button>
              }
              align="end"
              transition
              onItemClick={e => {
                if (e.value !== network) {
                  dispatch(ChangeNetwork(e.value));
                }
              }}
              menuClassName="network-menu"
            >
              <MenuItem value="testnet" className="menu-item">
                <p data-active={network === "testnet"}>Testnet</p>
              </MenuItem>
              <div className="divider" />
              <MenuItem value="mainnet" className="menu-item">
                <p data-active={network === "mainnet"}>Mainnet</p>
              </MenuItem>
            </Menu>
          </div>
        ) : null}

        {/* <Notifications /> */}

        {/* <img
          src="https://blush.design/api/download?shareUri=0I6cFC5NGKx-CnTR&c=Skin_0%7Ed08b5b&w=800&h=800&fm=png"
          alt=""
        />

        <div className="profile-options">
          <i className="ph-caret-down"></i>
        </div> */}
      </div>
    </nav>
  );
};

export default ProfileBar;
