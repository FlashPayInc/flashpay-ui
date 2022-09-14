import { connector } from "../../utils/";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSideTab } from "../../features/config/configSlice";
import { constrictAddr, useOutsideAlerter } from "../../utils/helpers";

const LogoutButton = ({ walletAddress }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);
  useOutsideAlerter(wrapperRef, dropDownRef, closeDropdown);

  const { walletProvider } = useSelector(state => state.config);

  const CloseTab = () => {
    dispatch(closeSideTab());
  };

  return (
    <div className="drop_down_cover flex_width">
      <button
        ref={dropDownRef}
        className="connect_wallet"
        onClick={() => {
          if (isOpen) {
            setIsOpen(p => !p);
            CloseTab();
          } else {
            setIsOpen(p => !p);
          }
        }}
      >
        <p>{walletAddress ? constrictAddr(walletAddress) : null}</p>
        <i className="ph-caret-down-bold"></i>
      </button>

      <div
        ref={wrapperRef}
        className="drop_down_list solid-border"
        style={{
          cursor: "pointer",
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
    </div>
  );
};

export default LogoutButton;
