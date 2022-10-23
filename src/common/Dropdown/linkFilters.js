import HorLine from "../HorLine";
import { AppIcons } from "../../svg";
import { useRecoilState } from "recoil";
import { useSelector } from "react-redux";
import { Fragment, useRef, useState } from "react";
import { useOutsideAlerter } from "../../utils/helpers";
import { linkFilterState } from "../../atoms/appState";

const LinkFilters = () => {
  const wrapperRef = useRef(null);
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);
  const { assets, network } = useSelector(state => state.app);
  useOutsideAlerter(wrapperRef, dropDownRef, closeDropdown);
  const [linkFilter, setLinkFilter] = useRecoilState(linkFilterState);

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
          <div className="content_list">
            <div
              onClick={() => setLinkFilter("all")}
              className="list_item"
              data-active={linkFilter === "all"}
            >
              All
            </div>
            <HorLine />

            <Fragment>
              {assets?.map((item, index) =>
                item?.network === network ? (
                  <div
                    key={index}
                    className="list_item"
                    data-active={linkFilter === item?.short_name}
                    onClick={() => setLinkFilter(item?.short_name)}
                  >
                    {item?.short_name}
                  </div>
                ) : null
              )}
              <HorLine />
            </Fragment>

            <Fragment>
              {["active", "inactive"].map((item, _i) => (
                <div
                  key={_i}
                  onClick={() => setLinkFilter(item)}
                  className="list_item"
                  data-active={linkFilter === item}
                  style={{ textTransform: "capitalize" }}
                >
                  {item}
                </div>
              ))}
            </Fragment>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkFilters;
