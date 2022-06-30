import React, { useRef, useState } from "react";
import TopBar from "../../../common/TopBar";
import ProfileBar from "../../../common/ProfileBar";
import EmptyStateContainer from "../../../common/EmptyStateContainer";
import AccountChart from "./AccountChart";
import DropDownMenu from "../../../common/DropDownMenu";

const SelectMenu = ({ type, curOption, setCurOption, direction }) => {
  const dropDownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const UpdateOption = (item) => {
    setIsOpen(false);
    setCurOption(item);
  };

  return (
    <DropDownMenu
      data={type}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      curOption={curOption}
      dropDownRef={dropDownRef}
      UpdateOption={UpdateOption}
      direction={direction}
    >
      {type === "assets-revenue" ? (
        <div
          ref={dropDownRef}
          className="asset_revenue"
          onClick={() => setIsOpen((p) => !p)}
        >
          <p>{curOption} revenue</p>
          <i className="ph-caret-down-bold"></i>
        </div>
      ) : type === "timeframe" ? (
        <div
          className="timeframe"
          ref={dropDownRef}
          onClick={() => setIsOpen((p) => !p)}
        >
          <p>{curOption}</p>
          <i className="ph-caret-down-bold"></i>
        </div>
      ) : null}
    </DropDownMenu>
  );
};

{
  /*  */
}

const Home = () => {
  const notEmpty = true;

  const [curAsset, setCurAsset] = useState("USDT");
  const [curTimeframe, setCurTimeframe] = useState("This year");

  return (
    <>
      <ProfileBar />

      <div className="home_container">
        <TopBar main={`Welcome Human,`} />

        <div className="page_content">
          {notEmpty ? (
            <div className="account_stats">
              <div className="stats_filters">
                <SelectMenu
                  type="assets-revenue"
                  curOption={curAsset}
                  setCurOption={setCurAsset}
                />
                <SelectMenu
                  type="timeframe"
                  direction="rtl"
                  curOption={curTimeframe}
                  setCurOption={setCurTimeframe}
                />
              </div>

              <div className="chart_container">
                <AccountChart />
              </div>
            </div>
          ) : (
            <EmptyStateContainer
              vector="ghost"
              text={`Here you would see data analtytics of your transactions over a period of time.`}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
