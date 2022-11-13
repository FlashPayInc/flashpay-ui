import _ from "lodash";
import AccountChart from "./AccountChart";
import Vectors from "../../../svg/Vectors";
import { useSelector } from "react-redux";
import { axiosGet } from "../../../axios";
import TopBar from "../../../common/TopBar";
import { SpinnerCircular } from "spinners-react";
import React, { useEffect, useState } from "react";
import ProfileBar from "../../../common/ProfileBar";
import useAppMenu from "../../../styles/hooks/useAppMenu";
import EmptyStateContainer from "../../../common/EmptyStateContainer";
import PeriodMenu from "./PeriodMenu";
import usePeriodMenu from "./PeriodMenu";

const Home = () => {
  const { assets } = useSelector(state => state.app);
  const [curTimeframe, setCurTimeframe] = useState("This year");
  const { theme, walletAddress } = useSelector(state => state.config);

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLinks = async (asa_id, range = activePeriod) => {
    if (
      !walletAddress ||
      !localStorage.getItem("linkedStatus") ||
      isNaN(asa_id)
    )
      return;

    setError(false);
    setIsLoading(true);

    try {
      await axiosGet(
        `/daily-revenue?asa_id=${asa_id}&date_range=${range}'`
      ).then(response => setData(response?.data?.data));
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  };

  const [AppMenu, activeAsset] = useAppMenu(assets || [], fetchLinks);

  const refetch = () => {
    fetchLinks(activeAsset?.asa_id, activePeriod);
  };
  const [PeriodMenu, activePeriod] = usePeriodMenu(refetch);

  return (
    <>
      <ProfileBar />

      <div className="home_container">
        <TopBar main={`Welcome Human,`} />

        <div className="page_content">
          {!!walletAddress && !error ? (
            <div className="account_stats">
              <div className="stats_filters">
                <AppMenu>
                  <div className="asset_revenue">
                    <p>{activeAsset?.short_name} revenue</p>
                    <i className="ph-caret-down-bold"></i>
                  </div>
                </AppMenu>

                <PeriodMenu>
                  <div className="asset_revenue">
                    <p>
                      {activePeriod === "30d"
                        ? "Last 30 days"
                        : activePeriod === "6m"
                        ? "Last 6 months"
                        : activePeriod === "year"
                        ? "This year"
                        : ""}
                    </p>
                    <i className="ph-caret-down-bold"></i>
                  </div>
                </PeriodMenu>
              </div>

              {isLoading ? (
                <div
                  style={{
                    flex: 1,
                    gap: "12px",
                    width: "100%",
                    wordSpacing: "2px",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <SpinnerCircular
                    size={50}
                    color="#e5fff6"
                    secondaryColor="#1c7989"
                  />
                  <p style={{ fontSize: "16px" }}>
                    Fetching{" "}
                    <span style={{ fontSize: "15px" }}>
                      {activeAsset?.short_name}
                    </span>{" "}
                    revenue
                  </p>
                </div>
              ) : (
                <div className="chart_container">
                  <AccountChart data={data} />
                </div>
              )}
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
