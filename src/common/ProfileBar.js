import React from "react";
import { AppIcons } from "../svg";
import { useRef, useState } from "react";
import DropDownMenu from "./DropDownMenu";

const ProfileBar = () => {
  const dropDownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [curOption, setCurOption] = useState("");
  const UpdateOption = (item) => {
    setIsOpen(false);
    setCurOption(item);
  };

  return (
    <nav>
      <div></div>

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
            onClick={() => setIsOpen((p) => !p)}
          >
            <AppIcons type="notificationBell" />
          </div>
        </DropDownMenu>

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
