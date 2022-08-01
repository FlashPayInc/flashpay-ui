import React from "react";
import TopBar from "../../../common/TopBar";
import ProfileBar from "../../../common/ProfileBar";
import EmptyStateContainer from "../../../common/EmptyStateContainer";
import { AppIcons, Assets } from "../../../svg";
import { useWindowSize } from "@react-hook/window-size/throttled";

const Details = () => {
  const [width] = useWindowSize();

  const notEmpty = true;

  return (
    <>
      <ProfileBar />

      <div className="home_container">
        <TopBar
          type="payment-details"
          data="payment-links"
          main={`${notEmpty ? "Payment links" : ""}`}
          button3="copy-link"
          detailsPage={true}
        />

        {width <= 930 ? (
          <div className="header-sm">
            <p>Transactions</p>
          </div>
        ) : null}

        <div className="page_content">
          {notEmpty ? (
            <div className="transactions_table">
              <div className="table_header">
                <div className="row_member ref">Reference</div>
                <div className="row_member amt">Amount</div>
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

                    <div className="row_member status">
                      {true ? (
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

export default Details;
