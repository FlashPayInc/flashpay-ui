import React from "react";
import { Assets } from "../../../svg";
import TopBar from "../../../common/TopBar";
import { useNavigate } from "react-router-dom";
import ProfileBar from "../../../common/ProfileBar";
import PaginationTab from "../../../common/PaginationTab";
import EmptyStateContainer from "../../../common/EmptyStateContainer";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";
import { useEffect } from "react";
import millify from "millify";

const PaymentLinks = () => {
  let navigate = useNavigate();
  const { network } = useSelector(state => state.app);
  const { reload, linkedStatus } = useSelector(state => state.config);

  const { isLoading, isRefetching, error, data, refetch } = useQuery(
    "payment-links",
    () =>
      axios
        .get(`/payment-links`, {
          headers: {
            Authorization: !!localStorage.getItem("access_token")
              ? `Bearer ${localStorage.getItem("access_token")}`
              : "",
          },
        })
        .then(response => response?.data?.data?.results),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (linkedStatus && !!localStorage.getItem("walletAddress")) refetch();
  }, [linkedStatus, reload, network]);

  const navigateToLink = slug => navigate(`./${slug}`);

  return (
    <>
      <ProfileBar />

      <div className="home_container">
        {data && data?.length >= 1 ? (
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
          ) : data && data?.length >= 1 ? (
            <>
              <div className="payment_table base-animation--fade-left">
                <div className="table_header">
                  <div className="row_member name">Name</div>
                  <div className="row_member amt">Amount</div>
                  <div className="row_member asset">Asset</div>
                  <div className="row_member interval">Interval</div>{" "}
                  <div className="row_member rev">Total revenue</div>
                  <div className="row_member status">Status</div>
                  <div className="row_member link">Preview</div>
                </div>

                {data?.map((link, index) => {
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
                        {false ? (
                          <div className="status_block failed">Failed</div>
                        ) : (
                          <div className="status_block successful">
                            Succesful
                          </div>
                        )}
                      </div>

                      <a
                        href={`./payment-portal/${link?.slug}`}
                        className="row_member link"
                      >
                        <p>{link?.slug}</p>
                      </a>
                    </div>
                  );
                })}
              </div>
              <PaginationTab pageNum={Math.ceil(data?.length / 6)} />
            </>
          ) : (
            <EmptyStateContainer
              vector="generatelinks"
              text={`When you create a Payment link, it would so show here.`}
              buttonText={"Generate Link"}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentLinks;
