import React from "react";
import Icon from "../svg/Icon";
import { AppIcons } from "../svg";
import { useRef, useState } from "react";
import DropDownMenu from "./DropDownMenu";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { openSideTab } from "../features/config/configSlice";
import { useWindowSize } from "@react-hook/window-size/throttled";
import { notifications } from "../features/modals/modalSlice";

const ProfileBar = () => {
  const dropDownRef = useRef();
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const [curOption, setCurOption] = useState("");

  const { pathname } = useLocation();

  const first = pathname.match(/^\/\w+/i);
  const currentPath = first
    ? first[0].slice(1)
    : pathname === "/"
    ? "Dashboard"
    : "";

  const UpdateOption = (item) => {
    setIsOpen(false);
    setCurOption(item);
  };

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
        <DropDownMenu
          type="notification"
          data={"transactions"}
          isOpen={isOpen}
          direction="rtl"
          setIsOpen={setIsOpen}
          curOption={curOption}
          dropDownRef={dropDownRef}
          UpdateOption={UpdateOption}
        >
          <div
            ref={dropDownRef}
            className="notif_icon"
            onClick={() => {
              if (width < 530) {
                dispatch(notifications());
              } else {
                setIsOpen((p) => !p);
              }
            }}
          >
            <AppIcons type="notificationBell" />
          </div>
        </DropDownMenu>

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
