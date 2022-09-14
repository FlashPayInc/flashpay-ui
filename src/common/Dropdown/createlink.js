import HorLine from "../HorLine";
import { Assets } from "../../svg";
import { Fragment, useRef, useState } from "react";
import { useOutsideAlerter } from "../../utils/helpers";

const CreateLink = ({ type, assets, curOption, UpdateOption }) => {
  const wrapperRef = useRef(null);
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);
  useOutsideAlerter(wrapperRef, dropDownRef, closeDropdown);

  return (
    <div
      className={`drop_down_cover ${
        type === "payment-frequency" ? "full_width" : "flex_width"
      }`}
    >
      {type === "payment-frequency" ? (
        <div
          ref={dropDownRef}
          className="payment_duration"
          onClick={() => setIsOpen(p => !p)}
        >
          <p>{curOption}</p>
          <i className="ph-caret-down-bold"></i>
        </div>
      ) : type === "assets-list" ? (
        <div
          ref={dropDownRef}
          className="asset_select"
          onClick={() => setIsOpen(p => !p)}
        >
          <div className="asset_info">
            {curOption?.image_url ? (
              <img src={curOption?.image_url} alt="" />
            ) : null}
            <p>{curOption?.short_name}</p>
          </div>

          <i className="ph-caret-down-bold caret_down"></i>
        </div>
      ) : null}

      <div
        ref={wrapperRef}
        className="drop_down_list"
        style={{ display: isOpen ? "flex" : "none" }}
      >
        <div className="content">
          {type === "payment-frequency"
            ? ["Conitinual", "One-time"].map((item, i, arr) => (
                <Fragment key={i + item}>
                  <div
                    className={`list_item ${
                      curOption === item ? "current" : ""
                    }`}
                    onClick={() => {
                      closeDropdown();
                      UpdateOption(item);
                    }}
                  >
                    {item}
                  </div>
                  {i + 1 < arr.length ? <HorLine /> : null}
                </Fragment>
              ))
            : type === "assets-list"
            ? // ? ["usdt", "usdc"].map((item, i, arr) => (
              assets?.map((item, i, arr) => (
                <Fragment key={i}>
                  <div
                    className={`list_item ${
                      curOption === item ? "current" : ""
                    }`}
                    onClick={() => {
                      closeDropdown();
                      UpdateOption(item);
                    }}
                  >
                    <img src={item?.image_url} alt="" />
                    <p>{item?.short_name}</p>
                  </div>
                  {i + 1 < arr.length ? <HorLine /> : null}
                </Fragment>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default CreateLink;
