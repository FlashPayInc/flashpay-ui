import React from "react";
import { AppIcons } from "../svg";

const ProfileBar = () => {
  return (
    <nav>
      <div></div>

      <div className="profile_img_bell">
        <div className="notif_icon">
          <AppIcons type="notificationBell" />
        </div>

        <img
          src="https://blush.design/api/download?shareUri=0I6cFC5NGKx-CnTR&c=Skin_0%7Ed08b5b&w=800&h=800&fm=png"
          alt=""
        />

        <div className="drop_down">
          <i className="ph-caret-down"></i>
        </div>
      </div>
    </nav>
  );
};

export default ProfileBar;
