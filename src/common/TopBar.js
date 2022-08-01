import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { generateLink } from "../features/modals/modalSlice";
import { AppIcons, Assets, NavIcons } from "../svg";
import DropDownMenu from "./DropDownMenu";
import { useWindowSize } from "@react-hook/window-size/throttled";

const TopBar = ({
  main,
  type,
  detailsPage,
  sub,
  data,
  button1,
  button2,
  button3,
}) => {
  const dispatch = useDispatch();
  const [width] = useWindowSize();

  const dropDownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [curOption, setCurOption] = useState("");
  const UpdateOption = (item) => {
    setIsOpen(false);
    setCurOption(item);
  };

  return (
    <div className="top_bar">
      <div className="main">
        {type === "payment-details" ? (
          <div className="payment_details_header">
            {width > 930 ? (
              <div className="link_name">
                <p>
                  Payment links / <span>2348308</span>
                </p>
              </div>
            ) : null}

            <div className="set_link">
              <p>Set link as </p>
              <NavIcons type="theme" />
            </div>
          </div>
        ) : (
          <p className="bar_title">{main}</p>
        )}
        <div className="bar_buttons">
          {button1 ? (
            <DropDownMenu
              data={data}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              curOption={curOption}
              dropDownRef={dropDownRef}
              UpdateOption={UpdateOption}
              direction={width < 930 ? "rtl" : ""}
            >
              <button
                ref={dropDownRef}
                className="filter_button"
                onClick={() => setIsOpen((p) => !p)}
              >
                <AppIcons type="filter" />
                <p>Filter</p>
              </button>
            </DropDownMenu>
          ) : null}
          {button2 ? (
            <button
              className="generate_link"
              onClick={() => dispatch(generateLink())}
            >
              <AppIcons type="generatelink" />
              <p>Generate link</p>
            </button>
          ) : null}
          {button3 ? (
            <button className="copy_button">
              <AppIcons type="copy-link" />
              <p>Copy Link</p>
            </button>
          ) : null}
        </div>
      </div>
      <div className="sub">{sub}</div>

      {!!detailsPage ? (
        <div className="payment_details_bar">
          <div className="row_member name">
            <p className="main_text">Link name</p>
            <p className="sub_text">Heels page</p>
          </div>

          <div className="row_member amt">
            <p className="main_text">Amount</p>
            <p className="sub_text">2.2749</p>
          </div>

          <div className="row_member asset">
            <p className="main_text">Asset</p>
            <div className="asset_cont">
              <Assets asset="usdt" />
              <p>Tether</p>
            </div>
          </div>

          <div className="row_member interval">
            <p className="main_text">Interval</p>
            {true ? (
              <div className="status_block continual">Continual</div>
            ) : (
              <div className="status_block onetime">One-time</div>
            )}
          </div>

          <div className="row_member rev">
            <p className="main_text">Total revenue</p>
            <p className="sub_text">9,284.248</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TopBar;
