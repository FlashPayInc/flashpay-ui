import TopBar from "../../../common/TopBar";
import { useNavigate } from "react-router-dom";
import ProfileBar from "../../../common/ProfileBar";
import PaginationTab from "../../../common/PaginationTab";
import EmptyStateContainer from "../../../common/EmptyStateContainer";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";
import { useEffect, useState } from "react";
import millify from "millify";
import Vectors from "../../../svg/Vectors";
import {
  filteredLinkState,
  linkDataState,
  linkFilterState,
} from "../../../atoms/appState";
import { useRecoilState, useRecoilValue } from "recoil";

const PaymentLinks = () => {
  let navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [linkData, setLinkData] = useRecoilState(linkDataState);

  const { network } = useSelector(state => state.app);
  const { theme, reload, linkedStatus, walletAddress } = useSelector(
    state => state.config
  );
  const linksFilter = useRecoilValue(linkFilterState);
  const filteredLinks = useRecoilValue(filteredLinkState);

  const fetchLinks = (pageNum = 1) => {
    if (!walletAddress || !localStorage.getItem("access_token")) return;

    return axios
      .get(`/payment-links?page=` + pageNum, {
        headers: {
          Authorization: !!localStorage.getItem("access_token")
            ? `Bearer ${localStorage.getItem("access_token")}`
            : "",
        },
      })
      .then(response => setLinkData(response?.data?.data));
  };

  const { isLoading, isRefetching, error, refetch } = useQuery(
    ["payment-links", page],
    () => fetchLinks(page),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (linkedStatus && !!localStorage.getItem("walletAddress")) refetch();
  }, [linkedStatus, reload, network]);

  const navigateToLink = slug => navigate(`./${slug}`);

  console.log(linkData?.results?.length >= 1);

  return (
    <>
      <ProfileBar />

      <div className="home_container">
        {linkData?.results && linkData?.results?.length >= 1 ? (
          <TopBar
            filter="filter"
            data="payment-links"
            generate="generate"
            main="Payment links"
          />
        ) : null}

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
              <p style={{ fontSize: "18px" }}>Fetching payment links</p>
            </div>
          ) : linkData?.results && linkData?.results?.length >= 1 ? (
            <>
              <div className="payment_table base-animation--fade-left">
                <div className="table_header">
                  <div className="row_member name">Name</div>
                  <div className="row_member amt">Amount</div>
                  <div className="row_member asset">Asset</div>
                  <div className="row_member interval">Interval</div>{" "}
                  <div className="row_member rev">Total revenue</div>
                  <div className="row_member status">Status</div>
                  <div className="row_member link">Link</div>
                </div>

                {filteredLinks?.length !== 0 ? (
                  filteredLinks?.map((link, index) => {
                    return (
                      <div className="table_row" key={index}>
                        <div
                          className="row_member name"
                          onClick={() => navigateToLink(link?.slug)}
                        >
                          <p>{link?.name}</p>
                        </div>

                        <div
                          className="row_member amt"
                          onClick={() => navigateToLink(link?.slug)}
                        >
                          <p>
                            {!isNaN(link?.amount)
                              ? millify(link?.amount, { precision: 3 })
                              : 0}
                          </p>
                        </div>

                        <div
                          className="row_member asset"
                          onClick={() => navigateToLink(link?.slug)}
                        >
                          <img src={link?.asset?.image_url} alt="" />
                          <p>{link.asset?.short_name}</p>
                        </div>

                        <div
                          className="row_member interval"
                          onClick={() => navigateToLink(link?.slug)}
                        >
                          {!link?.is_one_time ? (
                            <div className="status_block continual">
                              Continual
                            </div>
                          ) : (
                            <div className="status_block onetime">One-time</div>
                          )}
                        </div>

                        <div
                          className="row_member rev"
                          onClick={() => navigateToLink(link?.slug)}
                        >
                          <p>
                            {!isNaN(link?.total_revenue)
                              ? millify(link?.total_revenue, { precision: 3 })
                              : 0}
                          </p>
                        </div>

                        <div
                          className="row_member status"
                          onClick={() => navigateToLink(link?.slug)}
                        >
                          {link?.is_active ? (
                            <div className="status_block successful">
                              Active
                            </div>
                          ) : (
                            <div className="status_block failed">Inactive</div>
                          )}
                        </div>

                        <a
                          target="_blank"
                          href={`./payment-portal/${link?.slug}`}
                          className="row_member link"
                        >
                          <p>Preview</p>
                        </a>
                      </div>
                    );
                  })
                ) : (
                  <div className="filtered_list-empty">
                    <Vectors.search dark={theme === "dark"} />
                    <p>No {linksFilter} payment links on current page</p>
                  </div>
                )}
              </div>
              <PaginationTab
                pageNum={Math.ceil(linkData?.count / 5)}
                active={page}
                setActive={setPage}
              />
            </>
          ) : (
            <EmptyStateContainer
              vector="generatelinks"
              text={
                !error
                  ? `When you create a Payment link, it would show here.`
                  : "An error occurred while fetching payment links. <br/> Please try again"
              }
              buttonText={"Generate Link"}
            >
              {!error && <Vectors.connectivity dark={theme === "dark"} />}
            </EmptyStateContainer>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentLinks;
