import React from "react";
import TopBar from "../../common/TopBar";
import ProfileBar from "../../common/ProfileBar";
import EmptyStateContainer from "../../common/EmptyStateContainer";
import { AppIcons, Assets } from "../../svg";

const PaymentLinks = () => {
  const notEmpty = true;

  return (
    <>
      <ProfileBar />

      <div className="home_container">
        <TopBar
          main={`${notEmpty ? "Payment links" : ""}`}
          button1="filter"
          button2="generate"
        />

        <div className="page_content">
          {notEmpty ? (
            <div className="payment_table">
              <div className="table_header">
                <div className="row_member name">Name</div>
                <div className="row_member amt">Amount</div>
                <div className="row_member asset">Asset</div>
                <div className="row_member interval">Interval</div>
                <div className="row_member status">Status</div>
                <div className="row_member rev">Total revenue</div>
                <div className="row_member link">Link</div>
              </div>

              {[1, 2, 3, 4, 5].map((txn, index) => {
                return (
                  <div className="table_row" key={index}>
                    <div className="row_member name">
                      <p>Heels page</p>
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

                    <div className="row_member interval">
                      {index % 2 === 0 ? (
                        <div className="status_block continual">Continual</div>
                      ) : (
                        <div className="status_block onetime">One-time</div>
                      )}
                    </div>

                    <div className="row_member status">
                      {index % 2 === 0 ? (
                        <div className="status_block failed">Failed</div>
                      ) : (
                        <div className="status_block successful">Succesful</div>
                      )}
                    </div>

                    <div className="row_member rev">
                      <p>fp_927494_297</p>
                    </div>

                    <div className="row_member link">
                      <p>Preview</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyStateContainer
              vector="generatelinks"
              text={`When you create a Payment link, it would so show here.`}
              buttonText={"Generative Link"}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentLinks;
