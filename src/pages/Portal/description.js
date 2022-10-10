import axios from "axios";
import millify from "millify";
import Connect from "./connect";
import { useState } from "react";
import Lottie from "react-lottie";
import { AppIcons } from "../../svg";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import loadingTxns from "../../lotties/Loading.json";
import brokenData from "../../lotties/Broken-Link.json";
import { LazyLoadImage } from "react-lazy-load-image-component";

const brokenLink = {
  loop: false,
  autoplay: true,
  animationData: brokenData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const fetchingTxns = {
  loop: true,
  autoplay: true,
  animationData: loadingTxns,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Description = () => {
  let { id } = useParams();
  const [amount, setAmount] = useState(1);
  const [loggedIn, setLoggedIn] = useState(true);
  const [failedImg, setFailedImg] = useState(false);
  const { isLoading, error, data } = useQuery(
    "payment-portal",
    () =>
      axios
        .get(`payment-links/${id}`, {
          headers: {
            Authorization: "",
          },
        })
        .then(response => response.data.data),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  );

  const LinkNotFound = () => (
    <>
      <div className="payment_illustration">
        <Lottie options={brokenLink} speed={0.7} />
      </div>

      <div className="description_text">
        <p className="main">Payment link not found</p>
        <p className="sub">{error?.response?.data?.message}</p>
      </div>

      <NavLink to="/" className="continue_to_pay">
        Go to Flashpay’s homepage
      </NavLink>

      <div className="powered_by_block">
        <p>Powered by</p>
        <AppIcons type="flashpay-main" />
      </div>
    </>
  );

  return (
    <div className="description_container">
      {!id ? (
        <LinkNotFound />
      ) : !loggedIn ? (
        <Connect
          data={data}
          amount={data?.has_fixed_amount ? data?.amount : amount}
        />
      ) : isLoading ? (
        <>
          <div className="payment_illustration">
            <Lottie options={fetchingTxns} speed={0.7} />
          </div>

          <div className="description_text">
            <p className="main">Fetching payment link</p>
            <p className="sub">Please wait while we fetch the payment link</p>
          </div>
        </>
      ) : !!data && !error ? (
        <>
          <div className="logo_img">
            {data?.image_url && !failedImg ? (
              <LazyLoadImage
                effect="blur"
                alt="payment-image"
                src={data?.image_url}
                onError={e => setFailedImg(true)}
                placeholder={<AppIcons type="flashpay" />}
              />
            ) : (
              <AppIcons type="flashpay" />
            )}
          </div>
          <div className="description_text">
            <p className="main">{data?.name}</p>
            <p className="sub">{data?.description}</p>
          </div>

          {data?.has_fixed_amount ? (
            <button
              className="continue_to_pay"
              onClick={() => setLoggedIn(false)}
            >
              {`Pay ${millify(Number(data?.amount), {
                precision: 3,
              })} ${data?.asset?.short_name}`}
            </button>
          ) : (
            <>
              <div className="input-block">
                <div className="asset_select">
                  <div className="asset_info">
                    {data?.asset?.image_url ? (
                      <img src={data.asset.image_url} alt="" />
                    ) : null}
                    <p>{data?.asset?.short_name}</p>
                  </div>
                </div>

                <input
                  type="number"
                  min={0}
                  value={amount}
                  onChange={e => {
                    console.log(e);
                    setAmount(e.target.value);
                  }}
                  // onKeyUp={e => {
                  //   if (isNaN(e.key)) return;
                  //   setAmount(e.key);
                  // }}
                  placeholder="Amount"
                />
              </div>
              <button
                className="continue_to_pay"
                onClick={() => {
                  if (amount <= 0) return;
                  setLoggedIn(false);
                }}
              >
                Pay
              </button>
            </>
          )}

          <div className="powered_by_block">
            <p>Powered by</p>
            <AppIcons type="flashpay-main" />
          </div>
        </>
      ) : (
        <LinkNotFound />
      )}
    </div>
  );
};

export default Description;
