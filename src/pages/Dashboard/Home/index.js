import _ from "lodash";
import AccountChart from "./AccountChart";
import TopBar from "../../../common/TopBar";
import React, { useEffect, useState } from "react";
import ProfileBar from "../../../common/ProfileBar";
import SelectMenu from "../../../common/Dropdown/selectMenu";
import EmptyStateContainer from "../../../common/EmptyStateContainer";
import Vectors from "../../../svg/Vectors";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { SpinnerCircular } from "spinners-react";
import { axiosGet } from "../../../utils/helpers";

const Home = () => {
  const [currAsset, setCurrAsset] = useState(null);
  const { assets, network } = useSelector(state => state.app);
  const [curTimeframe, setCurTimeframe] = useState("This year");
  const { theme, walletAddress } = useSelector(state => state.config);

  const assetSetup = () => {
    const filter = _.filter(assets, i => i.network === network);
    setCurrAsset(filter[0]);
  };

  useEffect(() => {
    // if (!!currAsset) return;
    assetSetup();
  }, [assets, network]);

  const fetchLinks = (asa_id, range = "all") => {
    if (!walletAddress || !localStorage.getItem("access_token") || !asa_id)
      return;

    return axiosGet(
      `/daily-revenue?asa_id=${asa_id}&date_range=${range}'`
    ).then(response => response?.data?.data?.results);
  };

  const { isLoading, isRefetching, error, data, refetch } = useQuery(
    ["payment-links", currAsset],
    () => fetchLinks(currAsset?.asa_id),
    { refetchOnWindowFocus: false }
  );

  const ItemsMenu = ({ type, curOption, setCurrOption }) => {
    const UpdateOption = item => {
      setCurrOption(item);
      refetch();
    };
    return (
      <SelectMenu
        type={type}
        curOption={curOption}
        UpdateOption={UpdateOption}
      />
    );
  };

  return (
    <>
      <ProfileBar />

      <div className="home_container">
        <TopBar main={`Welcome Human,`} />

        <div className="page_content">
          {isLoading || isRefetching ? (
            <div
              style={{
                gap: "12px",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <SpinnerCircular
                size={80}
                color="#e5fff6"
                secondaryColor="#1c7989"
              />
              <p style={{ fontSize: "18px" }}>Fetching revenue</p>
            </div>
          ) : !!walletAddress && !error ? (
            <div className="account_stats">
              <div className="stats_filters">
                <ItemsMenu
                  type="assets-revenue"
                  curOption={currAsset}
                  setCurrOption={setCurrAsset}
                />

                <ItemsMenu
                  type="timeframe"
                  curOption={curTimeframe}
                  setCurrOption={setCurTimeframe}
                />
              </div>

              <div className="chart_container">
                <AccountChart data={data} />
              </div>
            </div>
          ) : (
            <EmptyStateContainer
              vector="ghost"
              text={
                !error
                  ? `Here you would see data analytics of your transactions over a period of time.`
                  : "An error occurred while fetching revenue. <br/> Please try again"
              }
            >
              {!error && <Vectors.ghost dark={theme === "dark"} />}
            </EmptyStateContainer>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
