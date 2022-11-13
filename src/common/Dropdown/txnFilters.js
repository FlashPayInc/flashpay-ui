import HorLine from "../HorLine";
import { AppIcons } from "../../svg";
import { useRecoilState } from "recoil";
import { useSelector } from "react-redux";
import { useClickOut } from "../../utils/helpers";
import { txnFilterState } from "../../atoms/appState";
import { Fragment, useEffect, useRef, useState } from "react";

const TxnsFilters = () => {
  const wrapperRef = useRef(null);
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);
  useClickOut(wrapperRef, dropDownRef, closeDropdown);
  const { assets, network } = useSelector(state => state.app);
  const [txnFilter, setTxnFilter] = useRecoilState(txnFilterState);

  useEffect(() => {
    setTxnFilter("all");
  }, []);

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
              onClick={() => setTxnFilter("all")}
              className="list_item"
              data-active={txnFilter === "all"}
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
                    data-active={txnFilter === item?.short_name}
                    onClick={() => setTxnFilter(item?.short_name)}
                  >
                    {item?.short_name}
                  </div>
                ) : null
              )}
              <HorLine />
            </Fragment>

            <Fragment>
              {["successful", "pending", "failed"].map((item, _i) => (
                <div
                  key={_i}
                  onClick={() => setTxnFilter(item)}
                  className="list_item"
                  data-active={txnFilter === item}
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

export default TxnsFilters;
