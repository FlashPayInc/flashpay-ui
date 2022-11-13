import React, { useEffect, useState } from "react";
import TopBar from "../../../common/TopBar";
import { AppIcons, Assets } from "../../../svg";
import ProfileBar from "../../../common/ProfileBar";
import EmptyStateContainer from "../../../common/EmptyStateContainer";
import PaginationTab from "../../../common/PaginationTab";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { SpinnerCircular } from "spinners-react";
import millify from "millify";
import {
  constrictAddr,
  timeAgo,
  getAlgoExplorerUrl,
} from "../../../utils/helpers";
import { axiosGet } from "../../../axios";
import Vectors from "../../../svg/Vectors";
import {
  filteredTxnState,
  txnDataState,
  txnFilterState,
} from "../../../atoms/appState";
import { useRecoilState, useRecoilValue } from "recoil";

const Transactions = () => {
  const [page, setPage] = useState(1);
  const { network } = useSelector(state => state.app);
  const [txnData, setTxnData] = useRecoilState(txnDataState);
  const { theme, linkedStatus, walletAddress } = useSelector(
    state => state.config
  );

  const txnsFilter = useRecoilValue(txnFilterState);
  const filteredTxns = useRecoilValue(filteredTxnState);

  const fetchTxns = (pageNum = 1) => {
    if (!walletAddress || !localStorage.getItem("access_token")) return;
    return axiosGet(`/transactions?page=` + pageNum).then(response =>
      setTxnData(response?.data?.data)
    );
  };

  const { isLoading, isRefetching, error, refetch } = useQuery(
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
        {txnData?.results && txnData?.results?.length >= 1 ? (
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
          ) : txnData?.results && txnData?.results?.length >= 1 ? (
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

                {filteredTxns?.length !== 0 ? (
                  filteredTxns?.map((txn, index) => {
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
                              href={getAlgoExplorerUrl(network, txn?.txn_hash)}
                              rel="noopener noreferrer"
                            >
                              <AppIcons type="export" />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="filtered_list-empty">
                    <Vectors.search dark={theme === "dark"} />
                    <p>No {txnsFilter} transactions on current page</p>
                  </div>
                )}
              </div>

              <PaginationTab
                pageNum={Math.ceil(txnData?.count / 5)}
                active={page}
                setActive={setPage}
              />
            </>
          ) : (
            <EmptyStateContainer
              vector="handshake"
              link={{ path: "/payment-links", text: "payment links" }}
              text={
                !error
                  ? `When transactions are performed, you will see them here. Share <p id="navlink">payment links</p> now.`
                  : "An error occurred while fetching transactions. <br/> Please try again"
              }
            >
              {!error && <Vectors.social dark={theme === "dark"} />}
            </EmptyStateContainer>
          )}
        </div>
      </div>
    </>
  );
};

export default Transactions;
