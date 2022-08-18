import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { connector } from "../utils";
import { useOutsideAlerter } from "../utils/helpers";

const SelectMenu = ({
  type,
  isOpen,
  children,
  setIsOpen,
  dropDownRef,
  callback,
}) => {
  const wrapperRef = useRef(null);
  const HideDropDown = () => setIsOpen(false);
  useOutsideAlerter(wrapperRef, dropDownRef, HideDropDown);
  const { walletProvider } = useSelector((state) => state.config);

  return (
    <div className={`drop_down_cover ${"flex_width"}`}>
      {children}

      {type === "disconnect" ? (
        <div
          ref={wrapperRef}
          className="drop_down_list solid-border"
          style={{
            cursor: "pointer",
            // background: "#b4eaf4",
            display: isOpen ? "flex" : "none",
          }}
        >
          <div
            className="singleOption"
            onClick={() => {
              if (walletProvider === "pera") {
                connector.killSession();
              }

              localStorage.clear();
              window.location.reload();
            }}
            style={{ alignItems: "center", color: "#006174" }}
          >
            <p>Disconnect</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SelectMenu;
