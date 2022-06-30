import React, { useEffect, useRef } from "react";
import { DropDownContent } from "../pages/data";
import { AppIcons, AppIcons3, Assets, Illustrations } from "../svg";
import { useOutsideAlerter } from "../utils";
import HorLine from "./HorLine";

const DropDownMenu = ({
  type,
  data,
  isOpen,
  children,
  setIsOpen,
  curOption,
  direction,
  dropDownRef,
  UpdateOption,
}) => {
  const wrapperRef = useRef(null);
  const HideDropDown = () => setIsOpen(false);
  useOutsideAlerter(wrapperRef, dropDownRef, HideDropDown);

  return (
    <div
      className={`drop_down_cover ${
        type === "select-item"
          ? data === "payment-frequency"
            ? "full_width"
            : "flex_width"
          : ""
      } ${direction === "rtl" ? "right_aligned" : ""} ${
        type === "notification" ? "notification" : ""
      }`}
    >
      {children}

      {type === "notification" ? (
        <div
          ref={wrapperRef}
          className="drop_down_list"
          style={{ display: isOpen ? "flex" : "none" }}
        >
          <div className="notification_container">
            <div className="header">
              <p className="main">Notifications</p>
              <div className="mark_setting">
                <p>Mark as read</p>
                <AppIcons type="settings" />
              </div>
            </div>

            {true ? (
              <>
                <HorLine />

                <div className="notification_item">
                  <div className="item_icon">
                    <AppIcons3 type="notif-transfer" dotted={true} />
                  </div>

                  <p className="item_text">
                    A transaction was made on your <a href="#">Heels page</a>{" "}
                    payment link.
                  </p>
                </div>
                <HorLine />

                <div className="notification_item">
                  <div className="item_icon">
                    <AppIcons3 type="notif-transfer" />
                  </div>

                  <p className="item_text">
                    A transaction was made on your <a href="#">Heels page</a>{" "}
                    payment link.
                  </p>
                </div>
              </>
            ) : (
              <div className="empty_notificationn">
                <div className="empty_illustration">
                  <Illustrations type="empty-alert" />
                </div>
                <p>You have no notifications yet.</p>
              </div>
            )}
          </div>
        </div>
      ) : type === "select-item" ? (
        <div
          ref={wrapperRef}
          className="drop_down_list"
          style={{ display: isOpen ? "flex" : "none" }}
        >
          <div className="content">
            {data === "payment-frequency"
              ? ["Conitinual", "One-time"].map((item, i, arr) => (
                  <>
                    <div
                      className={`list_item ${
                        curOption === item ? "current" : ""
                      }`}
                      key={i + item}
                      onClick={() => UpdateOption(item)}
                    >
                      {item}
                    </div>
                    {i + 1 < arr.length ? <HorLine /> : null}
                  </>
                ))
              : data === "assets-list"
              ? ["usdt", "usdc"].map((item, i, arr) => (
                  <>
                    <div
                      className={`list_item ${
                        curOption === item ? "current" : ""
                      }`}
                      key={i + item}
                      onClick={() => UpdateOption(item)}
                    >
                      <Assets asset={item} />
                      <p>{item}</p>
                    </div>
                    {i + 1 < arr.length ? <HorLine /> : null}
                  </>
                ))
              : null}
          </div>
        </div>
      ) : !!DropDownContent[data] ? (
        <div
          ref={wrapperRef}
          className="drop_down_list"
          style={{ display: isOpen ? "flex" : "none" }}
        >
          <div className="content">
            <div className="header">All</div>
            <HorLine />
            <div className="content_list">
              {DropDownContent[data]?.map((category, i, arr) => (
                <React.Fragment key={i}>
                  {category.map((item, index) => (
                    <div
                      className={`list_item ${
                        curOption === item ? "current" : ""
                      }`}
                      key={index + item}
                      onClick={() => UpdateOption(item)}
                    >
                      {item}
                    </div>
                  ))}
                  {i + 1 < arr.length ? <HorLine /> : null}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DropDownMenu;
