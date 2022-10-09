import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/modals/modalSlice";
import { useWindowSize } from "@react-hook/window-size/throttled";
import { AppIcons, MainIcons } from "../../svg";
import Icon from "../../svg/Icon";
import HorLine from "../../common/HorLine";
import Vectors from "../../svg/Vectors";

const NotificationModal = () => {
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  const { theme } = useSelector(state => state.config);

  return (
    <div className={`modal_container ${width < 570 ? "fill-screen" : ""}`}>
      <div className="modal_header no-margin">
        <div className="main">
          <div className="back-btn" onClick={() => dispatch(closeModal())}>
            <Icon.ArrowLeft />
          </div>

          <p>Notifications</p>
        </div>
      </div>

      <div className="modal_content no-padding">
        <div className="notification_container">
          <div className="header">
            <div />
            <div className="mark_setting">
              <p>Mark as read</p>
              <AppIcons type="settings" />
            </div>
          </div>

          {true ? (
            <>
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
              <HorLine />
            </>
          ) : (
            <div className="empty_notificationn">
              <div className="empty_illustration">
                <Vectors.emptyMail dark={theme === "dark"} />
              </div>
              <p>You have no notifications yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
