import React from "react";
import TopBar from "../../common/TopBar";
import ProfileBar from "../../common/ProfileBar";
import EmptyStateContainer from "../../common/EmptyStateContainer";
import { AppIcons, Assets } from "../../svg";

const Transactions = () => {
  const notEmpty = true;

  return (
    <>
      <ProfileBar />

      <div className="home_container">
        <TopBar main={`${notEmpty ? "Transactions" : ""}`} button1="filter" />

        <div className="page_content">
          {notEmpty ? (
            <div className="transactions_table">
              <div className="table_header">
                <div className="row_member ref">Reference</div>
                <div className="row_member amt">Amount</div>
                <div className="row_member asset">Asset</div>
                <div className="row_member status">Status</div>
                <div className="row_member date">Date paid</div>
                <div className="row_member time">Time paid</div>
                <div className="row_member action">Action</div>
              </div>

              {[1, 2, 3, 4, 5].map((txn, index) => {
                return (
                  <div className="table_row" key={index}>
                    <div className="row_member ref">
                      <p>fp_927494_297</p>
                    </div>
                    <div className="row_member amt">
                      <p>2.2749</p>
                    </div>

                    <div className="row_member asset">
                      {index % 4 === 0 ? (
                        <>
                          <Assets asset="usdt" />
                          <p>Tether</p>
                        </>
                      ) : index % 3 === 0 ? (
                        <>
                          <Assets asset="tron" />
                          <p>Tron</p>
                        </>
                      ) : index % 2 === 0 ? (
                        <>
                          <Assets asset="dogecoin" />
                          <p>Dogecoin</p>
                        </>
                      ) : (
                        <>
                          <Assets asset="cardano" />
                          <p>Cardano</p>
                        </>
                      )}
                    </div>
                    <div className="row_member status">
                      {index % 2 === 0 ? (
                        <div className="status_block failed">Failed</div>
                      ) : (
                        <div className="status_block successful">Succesful</div>
                      )}
                    </div>
                    <div className="row_member date">
                      <p>06/05/2022</p>
                    </div>
                    <div className="row_member time">
                      <p>12:49 AM</p>
                    </div>
                    <div className="row_member action">
                      <p>View on Algoexplorer</p>
                      <AppIcons type="export" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyStateContainer
              vector="handshake"
              link={{ path: "/payment-portal", text: "payment links" }}
              text={`When a transaction has been performed, you will see them here. Share <p id="navlink">payment links</p> now.`}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Transactions;
