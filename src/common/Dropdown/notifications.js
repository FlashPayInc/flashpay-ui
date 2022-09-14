import HorLine from "../HorLine";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useOutsideAlerter } from "../../utils/helpers";
import { AppIcons, MainIcons, Illustrations } from "../../svg";
import { notifications } from "../../features/modals/modalSlice";
import { useWindowSize } from "@react-hook/window-size/throttled";

const Notifications = () => {
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  const wrapperRef = useRef(null);
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);
  useOutsideAlerter(wrapperRef, dropDownRef, closeDropdown);

  return (
    <div className="drop_down_cover right_aligned notification">
      <div
        ref={dropDownRef}
        className="notif_icon"
        onClick={() => {
          if (width < 530) {
            dispatch(notifications());
          } else {
            setIsOpen(p => !p);
          }
        }}
      >
        <AppIcons type="notificationBell" />
      </div>

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
                  <MainIcons type="notif-transfer" dotted={true} />
                </div>

                <p className="item_text">
                  A transaction was made on your <a href="#">Heels page</a>{" "}
                  payment link.
                </p>
              </div>
              <HorLine />

              <div className="notification_item">
                <div className="item_icon">
                  <MainIcons type="notif-transfer" />
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
    </div>
  );
};

export default Notifications;
