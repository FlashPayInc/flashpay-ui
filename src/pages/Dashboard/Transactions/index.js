import React, { useEffect } from "react";
import TopBar from "../../../common/TopBar";
import { AppIcons, Assets } from "../../../svg";
import ProfileBar from "../../../common/ProfileBar";
import EmptyStateContainer from "../../../common/EmptyStateContainer";
import PaginationTab from "../../../common/PaginationTab";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";
import millify from "millify";
import { constrictAddr, timeAgo } from "../../../utils/helpers";

const Transactions = () => {
  const { network } = useSelector(state => state.app);
  const { linkedStatus, walletAddress } = useSelector(state => state.config);

  const [page, setPage] = React.useState(1);

  const fetchTxns = (pageNum = 1) => {
    if (!walletAddress || !localStorage.getItem("access_token")) return;
    return axios
      .get(`/transactions?page=` + pageNum, {
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? `Bearer ${localStorage.getItem("access_token")}`
            : "",
        },
      })
      .then(response => response?.data?.data);
  };

  const { isLoading, isRefetching, error, data, refetch } = useQuery(
    ["transactions", page],
    () => fetchTxns(page),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (linkedStatus && localStorage.getItem("access_token")) refetch();
  }, [linkedStatus, network]);

  return (
    <>
      <ProfileBar />

      <div className="home_container">
        {data?.results && data?.results?.length >= 1 ? (
          <TopBar data="transactions" main="Transactions" filter="filter" />
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
              <p style={{ fontSize: "18px" }}>Fetching transactions</p>
            </div>
          ) : data?.results && data?.results?.length >= 1 ? (
            <>
              <div className="transactions_table base-animation--fade-left">
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

                {data?.results?.map((txn, index) => {
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
                          <div className="status_block successful">
                            Succesful
                          </div>
                        ) : txn?.status === "pending" ? (
                          <div className="status_block pending">Pending</div>
                        ) : null}
                      </div>

                      <div className="row_member date">
                        <p>
                          {txn?.created_at ? timeAgo(txn?.created_at) : null}
                        </p>
                      </div>

                      <div className="row_member preview">
                        {!!txn?.txn_hash ? (
                          <a
                            target="_blank"
                            href={`https://${
                              network === "testnet" ? "testnet" : ""
                            }.algoexplorer.io/tx/${txn?.txn_hash}`}
                          >
                            <AppIcons type="export" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>

              <PaginationTab
                pageNum={Math.ceil(data?.count / 5)}
                active={page}
                setActive={setPage}
              />
            </>
          ) : (
            <EmptyStateContainer
              vector="handshake"
              link={{ path: "/payment-links", text: "payment links" }}
              text={`When a transaction has been performed, you will see them here. Share <p id="navlink">payment links</p> now.`}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Transactions;
