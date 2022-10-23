import React, { useEffect, useState } from "react";
import ProfileBar from "../../../common/ProfileBar";
import EmptyStateContainer from "../../../common/EmptyStateContainer";
import { AppIcons, Assets } from "../../../svg";
import { useWindowSize } from "@react-hook/window-size/throttled";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import millify from "millify";
import { axiosGet, constrictAddr, timeAgo } from "../../../utils/helpers";
import PaymentDetailsBar from "./PaymentDetailsBar";
import Vectors from "../../../svg/Vectors";

const Details = () => {
  let { slug } = useParams();
  const [width] = useWindowSize();
  const { network } = useSelector(state => state.app);
  const { theme, linkedStatus } = useSelector(state => state.config);

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const FetchTxns = async () => {
    if (!linkedStatus || !localStorage.getItem("access_token")) return;
    setIsLoading(true);
    try {
      const result = await axiosGet(`/transactions?slug=${slug}`).then(
        response => response?.data?.data?.results
      );

      if (!!result) setData(result);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    FetchTxns();
  }, [linkedStatus, network]);

  return (
    <>
      <ProfileBar />

      <div className="home_container">
        <PaymentDetailsBar slug={slug} />

        {width <= 930 && data?.length >= 1 ? (
          <div className="header-sm">
            <p>Transactions</p>
          </div>
        ) : null}

        <div className="page_content">
          {!slug ? (
            <EmptyStateContainer
              vector="not-found"
              text={`No payment link slug was provided`}
            >
              <Vectors.search dark={theme === "dark"} />
            </EmptyStateContainer>
          ) : isLoading ? (
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
          ) : error ? (
            <EmptyStateContainer
              vector="not-found"
              text={`The payment link was not found`}
            />
          ) : data && data?.length >= 1 ? (
            <div className="transactions_table">
              <div className="table_header">
                <div className="row_member ref">Reference</div>
                <div className="row_member amt">Amount</div>
                <div className="row_member asset">Asset</div>
                <div className="row_member walletAddr">Sender</div>
                <div className="row_member walletAddr">Recipient</div>
                <div className="row_member status">Status</div>
                <div className="row_member date">Created On</div>
                <div className="row_member preview">view</div>
              </div>

              {data?.map((txn, index) => {
                return (
                  <div className="table_row" key={index}>
                    <div className="row_member ref">
                      <p>{txn?.txn_reference}</p>
                    </div>

                    <div className="row_member amt">
                      <p>
                        {!isNaN(txn?.amount)
                          ? millify(txn?.amount, { precision: 3 })
                          : 0}
                      </p>
                    </div>

                    <div className="row_member asset">
                      <img src={txn?.asset?.image_url} alt="" />
                      <p>{txn.asset?.short_name}</p>
                    </div>

                    <div className="row_member walletAddr">
                      <p>{constrictAddr(txn?.sender, 6, 4)}</p>
                    </div>

                    <div className="row_member walletAddr">
                      <p>{constrictAddr(txn?.recipient, 6, 4)}</p>
                    </div>

                    <div className="row_member status">
                      {txn?.status === "failed" ? (
                        <div className="status_block failed">Failed</div>
                      ) : txn?.status === "success" ? (
                        <div className="status_block successful">Succesful</div>
                      ) : txn?.status === "pending" ? (
                        <div className="status_block pending">Pending</div>
                      ) : null}
                    </div>

                    <div className="row_member date">
                      <p>{txn?.created_at ? timeAgo(txn?.created_at) : null}</p>
                    </div>

                    <div className="row_member preview">
                      {!!txn?.txn_hash ? (
                        <a
                          target="_blank"
                          href={`https://${
                            network === "testnet" ? "testnet." : ""
                          }algoexplorer.io/tx/${txn?.txn_hash}`}
                        >
                          <AppIcons type="export" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyStateContainer
              vector="no-transaction"
              text={`No transactions on this payment link yet`}
            >
              <Vectors.wallets dark={theme === "dark"} />
            </EmptyStateContainer>
          )}
        </div>
      </div>
    </>
  );
};

export default Details;
