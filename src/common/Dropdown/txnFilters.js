import HorLine from "../HorLine";
import { AppIcons } from "../../svg";
import { Fragment, useRef, useState } from "react";
import { useOutsideAlerter } from "../../utils/helpers";
import { DropDownContent } from "./data";

const TxnsFilters = ({ curOption, UpdateOption }) => {
  const wrapperRef = useRef(null);
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);
  useOutsideAlerter(wrapperRef, dropDownRef, closeDropdown);

  return (
    <div className="drop_down_cover">
      <button
        ref={dropDownRef}
        className="filter_button"
        onClick={() => setIsOpen(p => !p)}
      >
        <AppIcons type="filter" />
        <p>Filter</p>
      </button>

      <div
        ref={wrapperRef}
        className="drop_down_list"
        style={{ display: isOpen ? "flex" : "none" }}
      >
        <div className="content">
          <div className="header">All</div>
          <HorLine />
          <div className="content_list">
            {DropDownContent["payment-links"]?.map((category, i, arr) => (
              <Fragment key={i}>
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
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TxnsFilters;
