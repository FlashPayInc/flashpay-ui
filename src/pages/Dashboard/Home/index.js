import _ from "lodash";
import AccountChart from "./AccountChart";
import TopBar from "../../../common/TopBar";
import React, { useEffect, useRef, useState } from "react";
import ProfileBar from "../../../common/ProfileBar";
import SelectMenu from "../../../common/Dropdown/selectMenu";
import EmptyStateContainer from "../../../common/EmptyStateContainer";
import Vectors from "../../../svg/Vectors";
import { useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "react-query";

const ItemsMenu = ({ type, assets, curOption, setCurOption }) => {
  const UpdateOption = item => setCurOption(item);
  return (
    <SelectMenu
      type={type}
      assets={assets}
      curOption={curOption}
      UpdateOption={UpdateOption}
    />
  );
};

const Home = () => {
  // const [curAsset, setCurAsset] = useState("USDT");
  const { assets, network } = useSelector(state => state.app);
  const { theme, walletAddress } = useSelector(state => state.config);

  const [activeAssets, setActiveAssets] = useState([]);
  const [curAsset, setCurAsset] = useState(activeAssets[0]);

  useEffect(() => {
    if (activeAssets.length > 0) return;
    const filter = _.filter(assets, i => i.network === network);
    setActiveAssets(filter);
    setCurAsset(filter[0]);
  }, [assets]);

  const [curTimeframe, setCurTimeframe] = useState("This year");

  const fetchLinks = (asa_id, range = "all") => {
    if (!walletAddress || !localStorage.getItem("access_token") || !asa_id)
      return;

    return axios
      .get(`/daily-revenue?asa_id=${asa_id}&date_range=${range}'`, {
        headers: {
          Authorization: !!localStorage.getItem("access_token")
            ? `Bearer ${localStorage.getItem("access_token")}`
            : "",
        },
      })
      .then(response => response?.data?.data?.results);
  };

  const { isLoading, isRefetching, error, data, refetch } = useQuery(
    ["payment-links", curAsset],
    () => fetchLinks(curAsset?.asa_id),
    { refetchOnWindowFocus: false }
  );

  console.log(data);

  return (
    <>
      <ProfileBar />

      <div className="home_container">
        <TopBar main={`Welcome Human,`} />

        <div className="page_content">
          {!!walletAddress ? (
            <div className="account_stats">
              <div className="stats_filters">
                <ItemsMenu
                  type="assets-revenue"
                  curOption={curAsset}
                  assets={activeAssets}
                  setCurOption={setCurAsset}
                />

                <ItemsMenu
                  type="timeframe"
                  curOption={curTimeframe}
                  setCurOption={setCurTimeframe}
                />
              </div>

              <div className="chart_container">
                <AccountChart data={data} />
              </div>
            </div>
          ) : (
            <EmptyStateContainer
              vector="ghost"
              text={`Here you would see data analtytics of your transactions over a period of time.`}
            >
              <Vectors.ghost dark={theme === "dark"} />
            </EmptyStateContainer>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
