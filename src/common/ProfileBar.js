import React from "react";
import Icon from "../svg/Icon";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { openSideTab } from "../features/config/configSlice";
import { useWindowSize } from "@react-hook/window-size/throttled";
import Notifications from "./Dropdown/notifications";

const ProfileBar = () => {
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  const { pathname } = useLocation();
  const match = pathname.match(/^\/\w+/i);
  const currentPath = match
    ? match[0].slice(1)
    : pathname === "/"
    ? "Dashboard"
    : "";

  const OpenTab = () => {
    dispatch(openSideTab());
  };

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

      <div className="profile_img_bell">
        <Notifications />

        <img
          src="https://blush.design/api/download?shareUri=0I6cFC5NGKx-CnTR&c=Skin_0%7Ed08b5b&w=800&h=800&fm=png"
          alt=""
        />

        <div className="profile-options">
          <i className="ph-caret-down"></i>
        </div>
      </div>
    </nav>
  );
};

export default ProfileBar;
