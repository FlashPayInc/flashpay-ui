import HorLine from "../HorLine";
import { DropDownContent } from "./data";
import { Fragment, useRef, useState } from "react";
import { useOutsideAlerter } from "../../utils/helpers";

const SelectMenu = ({ type, curOption, UpdateOption }) => {
  const wrapperRef = useRef(null);
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);
  useOutsideAlerter(wrapperRef, dropDownRef, closeDropdown);

  return (
    <div
      className={`drop_down_cover ${
        type === "timeframe" ? "right_aligned" : ""
      }`}
    >
      {type === "assets-revenue" ? (
        <div
          ref={dropDownRef}
          className="asset_revenue"
          onClick={() => setIsOpen(p => !p)}
        >
          <p>{curOption} revenue</p>
          <i className="ph-caret-down-bold"></i>
        </div>
      ) : type === "timeframe" ? (
        <div
          className="timeframe"
          ref={dropDownRef}
          onClick={() => setIsOpen(p => !p)}
        >
          <p>{curOption}</p>
          <i className="ph-caret-down-bold"></i>
        </div>
      ) : null}

      <div
        ref={wrapperRef}
        className="drop_down_list"
        style={{ display: isOpen ? "flex" : "none" }}
      >
        <div className="content">
          <div className="header">All</div>
          <HorLine />
          <div className="content_list">
            {DropDownContent[type]?.map((category, i, arr) => (
              <Fragment key={i}>
                {category.map((item, index) => (
                  <div
                    className={`list_item ${
                      curOption === item ? "current" : ""
                    }`}
                    key={index + item}
                    onClick={() => {
                      closeDropdown();
                      UpdateOption(item);
                    }}
                  >
                    {item}
                  </div>
                ))}
                {i + 1 < arr.length ? <HorLine /> : null}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectMenu;
