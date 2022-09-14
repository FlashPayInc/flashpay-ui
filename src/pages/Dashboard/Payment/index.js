import React from "react";
import { Assets } from "../../../svg";
import TopBar from "../../../common/TopBar";
import { useNavigate } from "react-router-dom";
import ProfileBar from "../../../common/ProfileBar";
import PaginationTab from "../../../common/PaginationTab";
import EmptyStateContainer from "../../../common/EmptyStateContainer";
import { useSelector } from "react-redux";

const PaymentLinks = () => {
  const notEmpty = true;
  let navigate = useNavigate();

  const { paymentLinks } = useSelector(state => state.app);

  console.log(paymentLinks);

  return (
    <>
      <ProfileBar />

      <div className="home_container">
        {notEmpty ? (
          <TopBar
            filter="filter"
            data="payment-links"
            generate="generate"
            main={`${notEmpty ? "Payment links" : ""}`}
          />
        ) : null}

        <div className="page_content">
          {notEmpty ? (
            <>
              <div className="payment_table base-animation--fade-left">
                <div className="table_header">
                  <div className="row_member name">Name</div>
                  <div className="row_member amt">Amount</div>
                  <div className="row_member asset">Asset</div>
                  <div className="row_member interval">Interval</div>
                  <div className="row_member status">Status</div>
                  <div className="row_member rev">Total revenue</div>
                  <div className="row_member link">Link</div>
                </div>

                {paymentLinks?.map((link, index) => {
                  return (
                    <div className="table_row" key={index}>
                      <div
                        className="row_member name"
                        onClick={() => {
                          navigate("./details", { replace: true });
                        }}
                      >
                        <p>{link?.name}</p>
                      </div>

                      <div
                        className="row_member amt"
                        onClick={() => {
                          navigate("./details", { replace: true });
                        }}
                      >
                        <p>{link?.amount}</p>
                      </div>

                      <div
                        className="row_member asset"
                        onClick={() => {
                          navigate("./details", { replace: true });
                        }}
                      >
                        {index % 3 === 0 ? (
                          <>
                            <Assets asset="usdt" />
                            <p>Tether</p>
                          </>
                        ) : index % 2 === 0 ? (
                          <>
                            <Assets asset="algo" />
                            <p>Algo</p>
                          </>
                        ) : (
                          <>
                            <Assets asset="usdc" />
                            <p>USDC</p>
                          </>
                        )}
                      </div>

                      <div
                        className="row_member interval"
                        onClick={() => {
                          navigate("./details", { replace: true });
                        }}
                      >
                        {!link?.is_one_time ? (
                          <div className="status_block continual">
                            Continual
                          </div>
                        ) : (
                          <div className="status_block onetime">One-time</div>
                        )}
                      </div>

                      <div className="row_member status">
                        {false ? (
                          <div className="status_block failed">Failed</div>
                        ) : (
                          <div className="status_block successful">
                            Succesful
                          </div>
                        )}
                      </div>

                      <div className="row_member rev">
                        <p>{link?.slug}</p>
                      </div>

                      <a
                        target="blank"
                        href="https://app.flashpay.finance/payment-portal/29747mfl"
                        className="row_member link"
                      >
                        <p>Preview</p>
                      </a>
                    </div>
                  );
                })}
              </div>
              <PaginationTab />
            </>
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
