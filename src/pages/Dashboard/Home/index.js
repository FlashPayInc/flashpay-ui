import AccountChart from "./AccountChart";
import TopBar from "../../../common/TopBar";
import React, { useRef, useState } from "react";
import ProfileBar from "../../../common/ProfileBar";
import SelectMenu from "../../../common/Dropdown/selectMenu";
import EmptyStateContainer from "../../../common/EmptyStateContainer";

const ItemsMenu = ({ type, curOption, setCurOption }) => {
  const UpdateOption = item => setCurOption(item);
  return (
    <SelectMenu type={type} curOption={curOption} UpdateOption={UpdateOption} />
  );
};

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
                <ItemsMenu
                  type="assets-revenue"
                  curOption={curAsset}
                  setCurOption={setCurAsset}
                />

                <ItemsMenu
                  type="timeframe"
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
